import { useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import IconButton from "../components/ui/IconButton";
import { GlobalStyles } from "../constants/styles";
import {
  addNewExpense,
  removeExpense,
  updateExpense,
} from "../store/redux/expenseReducer";
import { storeExpense, updateExpenseServer, deleteExpenseServer } from "../util/http";

function ManageExpense({ route, navigation }) {
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const defaultExpenses = useSelector((state) => state.expenseReducer.expenses.find(expense => expense.id === editedExpenseId));
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    await deleteExpenseServer(editedExpenseId);
    dispatch(removeExpense({ id: editedExpenseId }));
    navigation.goBack();
  }
  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData ) {
    if (isEditing) {
      await updateExpenseServer(editedExpenseId,expenseData);
      dispatch(
        updateExpense({
          id: editedExpenseId,
          expenseData,
        })
      );
    } else {
      const id = await storeExpense(expenseData);
      dispatch(
        addNewExpense({
          ...expenseData,id:id
        })
      );
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultExpensesValue={defaultExpenses}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
