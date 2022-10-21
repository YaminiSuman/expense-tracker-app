import { createSlice } from "@reduxjs/toolkit";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2022-10-19"),
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 89.29,
    date: new Date("2022-01-05"),
  },
  {
    id: "e3",
    description: "Some bananas",
    amount: 5.99,
    date: new Date("2021-12-01"),
  },
  {
    id: "e4",
    description: "A book",
    amount: 14.99,
    date: new Date("2022-02-19"),
  },
  {
    id: "e5",
    description: "Another book",
    amount: 18.59,
    date: new Date("2022-02-18"),
  },
  {
    id: "e6",
    description: "A pair of trousers",
    amount: 89.29,
    date: new Date("2022-01-05"),
  },
  {
    id: "e7",
    description: "Some bananas",
    amount: 5.99,
    date: new Date("2021-12-01"),
  },
  {
    id: "e8",
    description: "A book",
    amount: 14.99,
    date: new Date("2022-02-19"),
  },
  {
    id: "e9",
    description: "Another book",
    amount: 18.59,
    date: new Date("2022-02-18"),
  },
];

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    expenses: DUMMY_EXPENSES,
  },
  reducers: {
    addNewExpense: (state, action) => {
      const id = new Date().toString() + Math.random().toString();
      state.expenses.push({ ...action.payload, id: id });
    },
    removeExpense: (state, action) => {
      const expenseIdToBeUpdated = state.expenses.indexOf(action.payload.id);
      state.expenses.splice(state.expenses.indexOf(action.payload.id), 1);
     
    },
    updateExpense: (state, action) => {
      state.expenses.splice(state.expenses.indexOf(action.payload.id), 0,action.payload);
    },
  },
});

export const addNewExpense = expenseSlice.actions.addNewExpense;
export const removeExpense = expenseSlice.actions.removeExpense;
export const updateExpense = expenseSlice.actions.updateExpense;
export default expenseSlice.reducer;
