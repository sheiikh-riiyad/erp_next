"use client";

import Link from "next/link";
import { useState } from "react";
import TodayDateInput from "../import-paddy/today-date-input";

const expenseCategories = [
  { value: "inventory", label: "Inventory & supplies" },
  { value: "transport", label: "Transport" },
  { value: "utilities", label: "Utilities" },
  { value: "wages", label: "Wages & labor" },
  { value: "maintenance", label: "Maintenance" },
  { value: "other", label: "Other" },
] as const;

type ExpenseCategory = typeof expenseCategories[number]["value"];

const expenseReasons: Record<ExpenseCategory, string[]> = {
  inventory: ["Packaging materials", "Cleaning supplies", "Other inventory"],
  transport: ["Fuel", "Vehicle maintenance", "Delivery charge", "Other transport"],
  utilities: ["Electricity", "Water", "Internet or phone", "Other utility"],
  wages: ["Staff wages", "Temporary labor", "Overtime"],
  maintenance: ["Equipment repair", "Building repair", "Other maintenance"],
  other: ["General business expense", "Other"],
};

const money = (amount: number) => `৳ ${amount.toLocaleString("en-BD", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})}`;

export default function ExpenseEntryForm() {
  const [category, setCategory] = useState<ExpenseCategory | "">("");
  const [reason, setReason] = useState("");
  const [cost, setCost] = useState("");

  const parsedCost = Number(cost);
  const totalCost = cost !== "" && Number.isFinite(parsedCost) && parsedCost >= 0
    ? parsedCost
    : 0;

  return (
    <div className="import-shell">
      <main className="import-content">
        <nav className="import-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Dashboard</Link>
          <span aria-hidden="true">/</span>
          <span>Add Expense</span>
        </nav>

        <div className="import-page-heading">
          <div className="import-title-group">
            <span className="import-title-icon" aria-hidden="true">−</span>
            <div>
              <p className="import-eyebrow">EXPENSES</p>
              <h1>Add Expense</h1>
              <p className="import-subtitle">Record a business expense and how it was paid.</p>
            </div>
          </div>
          <span className="entry-status"><span /> New expense</span>
        </div>

        <form className="expense-form-layout">
          <div className="expense-form-main">
            <section className="import-form-card" aria-labelledby="expense-details-heading">
              <div className="form-section-heading">
                <span className="section-number">01</span>
                <div>
                  <h2 id="expense-details-heading">Expense details</h2>
                  <p>Select a category and reason, then enter the cost and payment method.</p>
                </div>
              </div>

              <div className="import-fields-grid">
                <label className="import-field">
                  <span>Expense category <span className="required-mark">*</span></span>
                  <select
                    name="category"
                    onChange={(event) => {
                      const value = event.target.value;
                      const selectedCategory = expenseCategories.find(
                        (option) => option.value === value,
                      )?.value ?? "";
                      setCategory(selectedCategory);
                      setReason("");
                    }}
                    required
                    value={category}
                  >
                    <option value="">Select a category</option>
                    {expenseCategories.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </label>

                <label className="import-field">
                  <span>Reason for expense <span className="required-mark">*</span></span>
                  <select
                    disabled={!category}
                    name="reason"
                    onChange={(event) => setReason(event.target.value)}
                    required
                    value={reason}
                  >
                    <option value="">
                      {category ? "Select a reason" : "Select a category first"}
                    </option>
                    {category && expenseReasons[category].map((expenseReason) => (
                      <option key={expenseReason} value={expenseReason}>{expenseReason}</option>
                    ))}
                  </select>
                </label>

                <label className="import-field">
                  <span>Cost <span className="required-mark">*</span></span>
                  <div className="input-with-prefix">
                    <span>৳</span>
                    <input
                      min="0"
                      name="cost"
                      onChange={(event) => setCost(event.target.value)}
                      placeholder="0.00"
                      required
                      step="0.01"
                      type="number"
                      value={cost}
                    />
                  </div>
                </label>

                <label className="import-field">
                  <span>Payment method <span className="required-mark">*</span></span>
                  <select defaultValue="" name="paymentMethod" required>
                    <option value="">Select method</option>
                    <option value="cash">Cash</option>
                    <option value="bank">Bank transfer</option>
                    <option value="mobile">Mobile banking</option>
                    <option value="credit">Credit / unpaid</option>
                  </select>
                </label>

                <label className="import-field">
                  <span>Expense date <span className="required-mark">*</span></span>
                  <TodayDateInput name="expenseDate" />
                </label>

                <label className="import-field">
                  <span>Reference number <span className="optional-label">Optional</span></span>
                  <input name="reference" placeholder="e.g. receipt number" />
                </label>

                <label className="import-field import-field-full">
                  <span>Notes <span className="optional-label">Optional</span></span>
                  <textarea name="notes" placeholder="Add any useful details about this expense" rows={3} />
                </label>
              </div>
            </section>

            <div className="import-form-actions">
              <Link className="secondary-button" href="/">Cancel</Link>
              <div className="save-action-group">
                <div className="save-action-buttons">
                  <button className="primary-button" disabled type="button">Save expense</button>
                  <button className="secondary-button save-more-button" disabled type="button">
                    Save Expense and Add More
                  </button>
                </div>
                <span>Saving will be connected in the next step.</span>
              </div>
            </div>
          </div>

          <aside className="import-summary expense-summary" aria-labelledby="expense-summary-heading">
            <div className="summary-card-heading">
              <span className="summary-heading-icon" aria-hidden="true">৳</span>
              <div>
                <h2 id="expense-summary-heading">Expense summary</h2>
                <p>Review the expense before recording it.</p>
              </div>
            </div>
            <div className="expense-total">
              <span>Total cost</span>
              <strong>{money(totalCost)}</strong>
            </div>
            <div className="expense-summary-detail">
              <span>Category</span>
              <strong>
                {expenseCategories.find((option) => option.value === category)?.label ?? "Not selected"}
              </strong>
            </div>
            <div className="expense-summary-detail">
              <span>Reason</span>
              <strong>{reason || "Not selected"}</strong>
            </div>
          </aside>
        </form>
      </main>
    </div>
  );
}
