const intialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

export default function reducerAccount(state = intialStateAccount, action) {
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

export function Deposit(amount) {
  return {
    type: "account/deposit",
    payload: amount,
  };
}

export function Withdraw(amount) {
  return {
    type: "account/withdraw",
    payload: amount,
  };
}

export function RequestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}

export function PayLoan() {
  return {
    type: "account/payLoan",
  };
}
