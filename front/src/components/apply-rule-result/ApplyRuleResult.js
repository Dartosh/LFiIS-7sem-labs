export const ApplyRuleResult = (props) => {
    return(
        <div>
            <h3>Result:</h3>
            <h4>{props.applyRuleResult.header}</h4>
            <h4>{props.applyRuleResult.entered}</h4>
            <h4>{props.applyRuleResult.conclusion}</h4>
        </div>
    );
}