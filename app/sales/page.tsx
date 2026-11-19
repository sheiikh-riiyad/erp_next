import type { Metadata } from "next";
import SalesEntryForm from "./sales-entry-form";

export const metadata: Metadata = {
  title: "Add Sale | Your Company Name",
  description: "Record a sale of products and services.",
};

export default function SalesPage() {
  return <SalesEntryForm />;
}
