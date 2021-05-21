import * as actionTypes from "./actionTypes"

export function addArticle(item: ISMS) {
  const action: SMSAction = {
    type: actionTypes.ADD_SMS,
    sms,
  }
  return action
}

export function removeArticle(item: ISMS) {
  const action: SMSAction = {
    type: actionTypes.REMOVE_SMS,
    sms,
  }
  return action
}