import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import {setExpenseFromBackend} from "../store/redux/expenseReducer"
function RecentExpense() {
  const expenses = useSelector((state) => state.expenseReducer.expenses);
  const dispatch = useDispatch();
  
  useEffect(() => {
    async function getExpenses() {
      const expenses = await fetchExpenses();
      console.log("expenses",expenses)
      dispatch(setExpenseFromBackend({ expenses }));
    }

    getExpenses();
  }, []);

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No registered expenses in last 7 days!"
    />
  );
}

export default RecentExpense;
