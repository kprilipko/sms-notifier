import { createStore, applyMiddleware, Store } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";

const store: Store<SMSState, SMSAction> & {
  dispatch: DispatchType;
} = createStore(rootReducer, applyMiddleware(thunk));

export default store;
