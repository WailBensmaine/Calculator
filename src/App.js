import { useReducer } from 'react';
import DigitButton from './DigitButton';
import { DigitButtonM } from './DigitButton';
import OperationButton from './OperationButton';
import './AppCss.css'


export const ACTIONS = {
  ADD_DIGIT: 'add_digit',
  CHOOSE_OPERATION: 'choose_operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete_digit',
  EVALUATE: 'evaluate',
} 

function reducer(state, {type, payload} ) {
  switch(type) {
    case ACTIONS.ADD_DIGIT:

      if (state.overwrite === true) {
        state.currentOperand = null;
        state.overwrite = false;
      }
      
      if (payload.digit === "0" &&  state.currentOperand === "0") return state;  //The condition (state.currentOperand === "") was made to not add zeros in the begining, but it doesn't work, i don't know why


      if (payload.digit === "." && (state.currentOperand?.includes("."))) return state;
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}` // this the line where the problem occure
      };

    case ACTIONS.CLEAR:
      return {};
    case ACTIONS.DELETE_DIGIT:
      if (state.currentOperand==null && state.operation==null &&state.previousOperand==null) return state;
      if (state.currentOperand==null && state.operation!==null) {
        return {
          ...state,
          operation: null,
        }
      }
      if (state.currentOperand==null && state.operation==null){
        return{
          ...state,
          previousOperand: state.previousOperand.slice(0,-1)
        }
      }
      return {
        ...state,
        currentOperand:state.currentOperand.slice(0,-1)
      };
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand==null && state.previousOperand==null) return state;
      if (state.currentOperand==null) {
        return {
          ...state,
          operation: payload.operation
        }
      }
      if (state.previousOperand==null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null
        };
      };
      return {
        ...state,
        previousOperand:evaluate(state.previousOperand, state.currentOperand, state.operation),
        operation: payload.operation,
        currentOperand: null
      };
    case ACTIONS.EVALUATE:
      if (state.currentOperand==null || state.previousOperand==null || state.operation==null ) return state;
      return {
        ...state,
        currentOperand:evaluate(state.previousOperand, state.currentOperand, state.operation),
        previousOperand: null,
        operation: null,
        overwrite: true,
      };
    
    default: return state
  }

}
function evaluate(firstOperand, secondOperand, operation) {
  const first = parseFloat(firstOperand)
  const second = parseFloat(secondOperand)
  if (isNaN(first) || isNaN(second)){
    return "Invalid operation"
  }
  let result = ''
  switch(operation){
    case "+" :
      result =  first+second;
      break;
    case "-" :
      result =  first-second;
      break
    case "*" :
      result =  first*second;
      break
    case "÷" :
      result =  first/second;
      break
    default:
      result = "";
  }
  return result.toString()
}

function App() {
  const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {})

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous">{previousOperand} {operation} </div>
        <div className="result">{currentOperand} </div>
      </div>
      <button className="span-two" onClick ={() =>  dispatch({ type: ACTIONS.CLEAR, payload: {} })}>AC</button>  {/* Here we can avoid to pass the pass the payload because wa don't need it  */}
      <button onClick={() => dispatch( {type: ACTIONS.DELETE_DIGIT})} >DEL</button>
      <OperationButton dispatch={dispatch} operation="÷" />
      <DigitButton digit ="1" dispatch={dispatch}/>

      <DigitButtonM digit = "2" dispatch={dispatch} />
      <DigitButtonM digit = "3" dispatch={dispatch} />
      <OperationButton dispatch={dispatch} operation="*" />
      <DigitButtonM digit = "4" dispatch={dispatch} />
      <DigitButtonM digit = "5" dispatch={dispatch} />
      <DigitButtonM digit = "6" dispatch={dispatch} />
      <OperationButton dispatch={dispatch} operation="+" />
      <DigitButtonM digit = "7" dispatch={dispatch} />
      <DigitButtonM digit = "8" dispatch={dispatch} />
      <DigitButtonM digit = "9" dispatch={dispatch} />
      <OperationButton dispatch={dispatch} operation="-" />
      <DigitButtonM digit = "." dispatch={dispatch} />
      <DigitButtonM digit = "0" dispatch={dispatch} />

      <button className="span-two" onClick={() => dispatch ({ type: ACTIONS.EVALUATE})}>=</button>
    </div>
  );
}

export default App;