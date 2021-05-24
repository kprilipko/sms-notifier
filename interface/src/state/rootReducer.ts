import * as actionTypes from "./actionTypes";

const initialState: SMSState = {
  smsList: [
  ]
};

const rootReducer = (
    state: SMSState = initialState,
    action: SMSAction
  ): SMSState => {
    switch (action.type) {
      case actionTypes.ADD_SMS:
        const newSMS: ISMS = {
          id: Math.random(),
          tel: action.sms.tel,
          body: action.sms.body,
        }
        return {
          ...state,
          smsList: state.smsList.concat(newSMS),
        }
      case actionTypes.REMOVE_SMS:
        const updatedSmsBox: ISMS[] = state.smsList.filter(
          sms => sms.id !== action.sms.id
        )
        return {
          ...state,
          smsList: updatedSmsBox,
        }
    }
    return state
  }
  
  export default rootReducer