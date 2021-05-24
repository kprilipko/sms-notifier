import * as actionTypes from "./actionTypes"

export const addSMS= (sms: ISMS) => {
  const action: SMSAction = {
    type: actionTypes.ADD_SMS,
    sms,
  }
  return action
}

export const removeSMS = (sms: ISMS) => {
  const action: SMSAction = {
    type: actionTypes.REMOVE_SMS,
    sms,
  }
  return action
}