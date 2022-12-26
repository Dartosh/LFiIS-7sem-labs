// Лабораторная работа 4 по дисциплине ЛОИС
// Выполнена студентами группы 921702 БГУИР
// Клинцов А.О., Нестеров Е.В., Кирилушкин А.Г., Гетманская В.Е .
// Вариант 22 - Реализовать прямой нечеткий логический вывод, используея импликацию Гогена
// 10.10.2022
// Использованные материалы:
// "Прикладные нечеткие системы" Т.Тэрано, К.Асаи, М.Сугэно
// Методическое пособие по курсу "Логические основы интеллектуальных систем"

import { useState } from 'react';
import axios from 'axios';

import { Rules } from './components/rules/Rules'
import { RuleInput } from './components/rule-input/RuleInput';
import { ApplyRuleResult } from './components/apply-rule-result/ApplyRuleResult';
import './App.css';

export const lab1DefaultInput =
    'A={(x1,0.1),(x2,0.2),(x3,0.3),(x4,0.4)}\nB={(y1,0.5),(y2,0.6),(y3,0.7),(y4,0.8)}\nC={(x1,0.7),(x2,0.5),(x3,0.9)}\nD={(y1,0.1),(y2,1.0)}';

const http = axios.create({
  baseURL: 'http://127.0.0.1:8080/',
})


const endpoints = {
  submitRules: '/lab-1/create-rules',
  applyRule: '/lab-1/apply-rule',
}

function App() {
  const [error, setError] = useState('');
  const [applyRuleError, setApplyRuleError] = useState('');
  const [text, setText] = useState(lab1DefaultInput);
  const [rules, setRules] = useState([]);
  const [applyRuleResult, setApplyRuleResult] = useState(null)
  const [selectedRule, setSelectedRule] = useState(null);
  const [currentLab, setCurrentLab] = useState(1);

  const setCurrentLabWork = (number) => {
    setCurrentLab(number);
  }

  const onSubmit = async () => {
    try {
      const response = await http.post(
        endpoints.submitRules,
        {
          text,
        },
      );
  
      setSelectedRule(null);
      setApplyRuleResult(null);
      setError('');
      setRules(response.data.rules);
    } catch (error) {
      setError(error?.response?.data?.error);
    }
  }

  const applyRule = async () => {
    try {
      const response = await http.post(
        endpoints.applyRule,
        selectedRule,
      );
  
      setApplyRuleResult(response.data);
      
    } catch (error) {
      setError(error?.response?.data?.error);
    }
  }

  const onRuleInputChange = (index, value) => {
    if (isNaN(+value) || value < 0 || value > 1) {
      return;
    }


    const newValue = { ...selectedRule };

    newValue.values[index] = value;

    setTimeout(() => {
      console.log(newValue.values);
    }, 1000)

    setSelectedRule(newValue);
  }

  return (
    <div className="app">
      <header>
        <nav>
          <ul>
            <li onClick={() => setCurrentLabWork(1)}>Лабораторная работа 1</li>
            <li onClick={() => setCurrentLabWork(2)}>Лабораторная работа 2</li>
          </ul>
        </nav>
      </header>
      <main>
        {
          currentLab === 1 ?
          <>
            <h1>Laboratory work 1</h1>
            <textarea type='text' value={text} onChange={(e) => setText(e.target.value)}/>
            { error !== '' && <p>{error}</p> }
            <button className='submit-button' onClick={onSubmit}>
              Submit
            </button>
            { rules?.length !== 0 && <Rules rules={rules} setSelectedRule={setSelectedRule} /> }
            { selectedRule && <RuleInput applyRule={applyRule} applyRuleError={applyRuleError} selectedRule={selectedRule} onRuleInputChange={onRuleInputChange}/> }
            { applyRuleResult && <ApplyRuleResult applyRuleResult={applyRuleResult} /> }
          </> :
          <></>
        }
      </main>
    </div>
  );
}

export default App;
