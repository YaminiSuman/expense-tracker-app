import { createSlice } from "@reduxjs/toolkit";

// const DUMMY_EXPENSES = [
//   {
//     id: "e1",
//     description: "A pair of shoes",
//     amount: 59.99,
//     date: new Date("2022-10-19"),
//   },
//   {
//     id: "e2",
//     description: "A pair of trousers",
//     amount: 89.29,
//     date: new Date("2022-01-05"),
//   },
//   {
//     id: "e3",
//     description: "Some bananas",
//     amount: 5.99,
//     date: new Date("2021-12-01"),
//   },
//   {
//     id: "e4",
//     description: "A book",
//     amount: 14.99,
//     date: new Date("2022-02-19"),
//   },
//   {
//     id: "e5",
//     description: "Another book",
//     amount: 18.59,
//     date: new Date("2022-02-18"),
//   },
//   {
//     id: "e6",
//     description: "A pair of trousers",
//     amount: 89.29,
//     date: new Date("2022-01-05"),
//   },
//   {
//     id: "e7",
//     description: "Some bananas",
//     amount: 5.99,
//     date: new Date("2021-12-01"),
//   },
//   {
//     id: "e8",
//     description: "A book",
//     amount: 14.99,
//     date: new Date("2022-02-19"),
//   },
//   {
//     id: "e9",
//     description: "Another book",
//     amount: 18.59,
//     date: new Date("2022-02-18"),
//   },
// ];

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    expenses: [],
  },
  reducers: {
    addNewExpense: (state, action) => {
      state.expenses.unshift({ ...action.payload });
    },
    removeExpense: (state, action) => {
      const indexOfItemToBeDeleted = state.expenses.findIndex(
        (exp) => exp.id === action.payload.id
      );
      state.expenses.splice(indexOfItemToBeDeleted, 1);
    },
    updateExpense: (state, action) => {
      const itemToBeUpdated = { ...action.payload.expenseData, id: action.payload.id }
      const indexOfItemToBeUpdated = state.expenses.findIndex(
        (exp) => exp.id === action.payload.id
      );

      state.expenses.splice(
        indexOfItemToBeUpdated,
        1,
        itemToBeUpdated
      );
    },
    setExpenseFromBackend: (state, action) => {
      const expDataFromBackend = action.payload.expenses.reverse();
      state.expenses.push(...expDataFromBackend);
    }
  },
});

export const addNewExpense = expenseSlice.actions.addNewExpense;
export const removeExpense = expenseSlice.actions.removeExpense;
export const updateExpense = expenseSlice.actions.updateExpense;
export const setExpenseFromBackend = expenseSlice.actions.setExpenseFromBackend;
export default expenseSlice.reducer;
