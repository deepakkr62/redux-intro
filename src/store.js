import { createStore, combineReducers } from "redux";

const intialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const intialStateCustomer = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

function reducerAccount(state = intialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case "account/withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
        loanPurpose: "",
      };
    default:
      return state;
  }
}

const reducerCustomer = (state = intialStateCustomer, action) => {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalId: action.payload.nationalId,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateCustomerName":
      return {
        ...state,
        fullName: action.payload,
      };
    default:
      return state;
  }
};
const rootReducer = combineReducers({
  account: reducerAccount,
  customer: reducerCustomer,
});

const store = createStore(rootReducer);

function Deposit(amount) {
  return {
    type: "account/deposit",
    payload: amount,
  };
}

function Withdraw(amount) {
  return {
    type: "account/withdraw",
    payload: amount,
  };
}

function RequestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}

function PayLoan() {
  return {
    type: "account/payLoan",
  };
}

store.dispatch(Deposit(500));
console.log(store.getState());

store.dispatch(Withdraw(200));
console.log(store.getState());

store.dispatch(RequestLoan(1000, "buy a car"));
console.log(store.getState());

store.dispatch(PayLoan());
console.log(store.getState());

function createCustomer(fullName, nationalId) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalId, createdAt: new Date().toISOString() },
  };
}

function updateCustomerName(fullName) {
  return {
    type: "customer/updateCustomerName",
    payload: fullName,
  };
}

store.dispatch(createCustomer("Deepak Kumar", "34656789"));
console.log(store.getState());

store.dispatch(updateCustomerName("Deepak Kumar keshari"));
console.log(store.getState());

store.dispatch(Deposit(503));
console.log(store.getState());
