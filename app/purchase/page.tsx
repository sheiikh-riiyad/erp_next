import type { Metadata } from "next";
import PurchaseEntryForm from "./purchase-entry-form";

export const metadata: Metadata = {
  title: "Add Purchase | Your Company Name",
  description: "Record a purchase of products.",
};

export default function PurchasePage() {
  return <PurchaseEntryForm />;
}
