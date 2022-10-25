import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import ErrorOverlay from "../components/ui/ErrorOverlay";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import { setExpenseFromBackend } from "../store/redux/expenseReducer";

function RecentExpense() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  const expenses = useSelector((state) => state.expenseReducer.expenses);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        dispatch(setExpenseFromBackend({ expenses }));
      } catch (error) {
        setError("Could not fetch expenses!");
      }
      setIsFetching(false);
    }
    getExpenses();
  }, []);

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

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
