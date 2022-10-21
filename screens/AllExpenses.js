import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput"
import { useSelector } from "react-redux";

function AllExpenses() {
  const expenses = useSelector((state) => state.expenseReducer.expenses);
  return (
    <ExpensesOutput
      expenses={expenses}
      expensesPeriod="Total"
      fallbackText="No registered expenses found!"
    />
  );
}

export default AllExpenses;
