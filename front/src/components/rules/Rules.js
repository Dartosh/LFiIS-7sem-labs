export const Rules = (props) => {
    const handleSelectRule = (index, rule) => {
        props.setSelectedRule({ index, names: rule?.names, values: rule?.names.map(name => '') })
    }
    return(
        <div className="rule-container">
            <h3>Rules</h3>
            {
                props.rules?.map((rule, index) =>
                (
                    <div onClick={() => handleSelectRule(index, rule)} className='rule' key={`rule-${index}`}>
                        <h3>Rule {index + 1}</h3>
                        <p>Premise: {rule.premise.name}</p>
                        <p>Conlusion: {rule.conclusion.name}</p>
                    </div>
                ))
            }
        </div>
    );
}
