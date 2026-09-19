import { configureStore } from "@reduxjs/toolkit";

import reducerAccount from "./features/accounts/accountSlice";
import reducerCustomer from "./features/customers/customerSlice";

//configureStore is combine all combineReducers, applyMiddleware(thunk), and
// composeWithDevTools(redux dev tools) into
// one function. It is a simplified version of createStore.
const store = configureStore({
  reducer: {
    account: reducerAccount,
    customer: reducerCustomer,
  },
});

export default store;
