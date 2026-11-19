import type { Metadata } from "next";
import ExpenseEntryForm from "./expense-entry-form";

export const metadata: Metadata = {
  title: "Add Expense | Your Company Name",
  description: "Record a business expense.",
};

export default function ExpensePage() {
  return <ExpenseEntryForm />;
}
