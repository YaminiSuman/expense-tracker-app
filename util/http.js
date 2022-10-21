import axios from "axios";

export function storeExpense(expenseData) {
  axios.post(
    "https://native-expense-app-default-rtdb.firebaseio.com//exenses.json",
    expenseData
  );
}
