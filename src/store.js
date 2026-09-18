import { createStore } from "redux";

const intialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

function reducer(state = intialState, action) {
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

const store = createStore(reducer);

// store.dispatch({ type: "account/deposit", payload: 500 });
// console.log(store.getState());

// store.dispatch({ type: "account/withdraw", payload: 200 });
// console.log(store.getState());

// store.dispatch({
//   type: "account/requestLoan",
//   payload: { amount: 1000, purpose: "buy a car" },
// });
// console.log(store.getState());

// store.dispatch({ type: "account/payLoan" });
// console.log(store.getState());

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

//in old base they use const ACCOOUNT_DEPOSITE=accoutn/deposite and replace the
// string with the constant in the reducer and action creator. This is a good
// practice to avoid typos and make it easier to manage action types.
