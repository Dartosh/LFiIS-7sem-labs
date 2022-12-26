import './RuleInput.css'

export const RuleInput = (props) => {
    return(
        <div className="input-fuzzies">
            <h3>Input fuzzies:</h3>
            {
                props.selectedRule.names.map((name, index) =>
                    <div className="input-fuzzies__input" key={`value-${index}`}>
                        <label>{name}</label>
                        <input onChange={(e) => { props.onRuleInputChange(index, e.target.value) }} type='text' value={props.selectedRule.values[index]}/>
                    </div>
                )
            }
            <button className='submit-button' onClick={props.applyRule} disabled={props.selectedRule.values.some((value) => value?.length === 0)}>
                Submit
            </button>
        </div>
    );
}
