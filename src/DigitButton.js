import { ACTIONS } from "./App";
function DigitButton (Props) {  //Always remember: React passes the special object 'Props' to any component, therefore if you want to use this bot=ring syntax, go ahead if you want to use the most cummon one use the second one just under : 
    return <button onClick={() =>  Props.dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit:Props.digit } })}>{Props.digit}</button>
}


function DigitButtonM ({digit, dispatch}) {
    return <button onClick={() =>  dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit }})}>{digit}</button>
}


export default DigitButton;
export { DigitButtonM};