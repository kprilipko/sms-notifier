const reducer = (
    state: SMSState = initialState,
    action: SMSAction
  ): SMSState => {
    switch (action.type) {
      case actionTypes.ADD_SMS:
        const newArticle: ISMS = {
          id: Math.random(), // not really unique
          tel: action.sms.title,
          body: action.sms.body,
        }
        return {
          ...state,
          smsBox: state.smsBox.concat(newSms),
        }
      case actionTypes.REMOVE_ARTICLE:
        const updatedSmsBox: ISMS[] = state.smsBox.filter(
          sms => sms.id !== action.sms.id
        )
        return {
          ...state,
          smsBox: updatedSmsBox,
        }
    }
    return state
  }
  
  export default reducer