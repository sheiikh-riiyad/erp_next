"use client";

import Link from "next/link";
import { useState } from "react";
import TodayDateInput from "../import-paddy/today-date-input";

type SaleType = "product" | "service";

type SaleOption = {
  id: string;
  name: string;
  unit: string;
  price: number;
};

type SaleLine = {
  id: number;
  type: SaleType | "";
  itemId: string;
  quantity: string;
};

const saleOptions: Record<SaleType, SaleOption[]> = {
  product: [
    { id: "sample-rice-25kg", name: "Sample Rice (25 kg bag)", unit: "bag", price: 1800 },
    { id: "sample-rice-50kg", name: "Sample Rice (50 kg bag)", unit: "bag", price: 3450 },
    { id: "sample-bran", name: "Sample Rice Bran", unit: "kg", price: 42 },
  ],
  service: [
    { id: "sample-milling", name: "Sample Paddy Milling", unit: "maund", price: 120 },
    { id: "sample-delivery", name: "Sample Local Delivery", unit: "service", price: 250 },
    { id: "sample-storage", name: "Sample Storage", unit: "day", price: 50 },
  ],
};

const money = (amount: number) => `৳ ${amount.toLocaleString("en-BD", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})}`;

export default function SalesEntryForm() {
  const [lines, setLines] = useState<SaleLine[]>([
    { id: 0, type: "", itemId: "", quantity: "1" },
  ]);
  const [nextId, setNextId] = useState(1);

  const updateLine = (id: number, patch: Partial<SaleLine>) => {
    setLines((currentLines) =>
      currentLines.map((line) => (line.id === id ? { ...line, ...patch } : line)),
    );
  };

  const addLine = () => {
    setLines((currentLines) => [
      ...currentLines,
      { id: nextId, type: "", itemId: "", quantity: "1" },
    ]);
    setNextId((currentId) => currentId + 1);
  };

  const removeLine = (id: number) => {
    setLines((currentLines) => currentLines.filter((line) => line.id !== id));
  };

  const calculatedLines = lines.map((line) => {
    const option = line.type
      ? saleOptions[line.type].find((item) => item.id === line.itemId)
      : undefined;
    const quantity = Number(line.quantity);
    const total = option && Number.isFinite(quantity) && quantity > 0
      ? option.price * quantity
      : 0;

    return { ...line, option, total };
  });
  const grandTotal = calculatedLines.reduce((sum, line) => sum + line.total, 0);

  return (
    <div className="import-shell">
      <main className="import-content">
        <nav className="import-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Dashboard</Link>
          <span aria-hidden="true">/</span>
          <span>Add Sale</span>
        </nav>

        <div className="import-page-heading">
          <div className="import-title-group">
            <span className="import-title-icon" aria-hidden="true">↗</span>
            <div>
              <p className="import-eyebrow">SALES</p>
              <h1>Add Sale</h1>
              <p className="import-subtitle">Create a sale with products, services, or both.</p>
            </div>
          </div>
          <span className="entry-status"><span /> New sale</span>
        </div>

        <form className="sales-form-layout">
          <div className="sales-form-main">
            <section className="import-form-card" aria-labelledby="sale-customer-heading">
              <div className="form-section-heading">
                <span className="section-number">01</span>
                <div>
                  <h2 id="sale-customer-heading">Customer &amp; reference</h2>
                  <p>Enter the customer and sale details.</p>
                </div>
              </div>
              <div className="import-fields-grid">
                <label className="import-field">
                  <span>Customer name</span>
                  <input autoComplete="name" name="customer" placeholder="Enter customer name" />
                </label>
                <label className="import-field">
                  <span>Sale date</span>
                  <TodayDateInput name="saleDate" />
                </label>
                <label className="import-field import-field-full">
                  <span>Reference number <span className="optional-label">Optional</span></span>
                  <input name="reference" placeholder="e.g. invoice or receipt number" />
                </label>
              </div>
            </section>

            <section className="import-form-card sales-items-card" aria-labelledby="sale-items-heading">
              <div className="form-section-heading">
                <span className="section-number">02</span>
                <div>
                  <h2 id="sale-items-heading">Products &amp; services</h2>
                  <p>Select an item to load its unit price, then enter the quantity.</p>
                </div>
              </div>

              <div className="sale-lines">
                {calculatedLines.map((line, index) => (
                  <div className="sale-line" key={line.id}>
                    <div className="sale-line-heading">
                      <strong>Sale item {index + 1}</strong>
                      {lines.length > 1 && (
                        <button
                          aria-label={`Remove sale item ${index + 1}`}
                          className="sale-remove-button"
                          onClick={() => removeLine(line.id)}
                          type="button"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="sale-line-fields">
                      <label className="import-field">
                        <span>Type <span className="required-mark">*</span></span>
                        <select
                          name={`items[${index}][type]`}
                          onChange={(event) => {
                            const type = event.target.value;
                            if (type === "" || type === "product" || type === "service") {
                              updateLine(line.id, { type, itemId: "" });
                            }
                          }}
                          required
                          value={line.type}
                        >
                          <option value="">Select type</option>
                          <option value="product">Product</option>
                          <option value="service">Service</option>
                        </select>
                      </label>
                      <label className="import-field">
                        <span>Product or service <span className="required-mark">*</span></span>
                        <select
                          disabled={!line.type}
                          name={`items[${index}][item]`}
                          onChange={(event) => updateLine(line.id, { itemId: event.target.value })}
                          required
                          value={line.itemId}
                        >
                          <option value="">Select an item</option>
                          {line.type && saleOptions[line.type].map((option) => (
                            <option key={option.id} value={option.id}>{option.name}</option>
                          ))}
                        </select>
                      </label>
                      <label className="import-field">
                        <span>Unit cost</span>
                        <div className="input-with-prefix">
                          <span>৳</span>
                          <input
                            aria-label={`Unit cost for sale item ${index + 1}`}
                            name={`items[${index}][unitCost]`}
                            placeholder="Select an item"
                            readOnly
                            value={line.option ? line.option.price.toFixed(2) : ""}
                          />
                        </div>
                      </label>
                      <label className="import-field">
                        <span>Quantity <span className="required-mark">*</span></span>
                        <input
                          min="0.01"
                          name={`items[${index}][quantity]`}
                          onChange={(event) => updateLine(line.id, { quantity: event.target.value })}
                          required
                          step="0.01"
                          type="number"
                          value={line.quantity}
                        />
                      </label>
                      <div className="sale-line-total">
                        <span>Line total</span>
                        <strong>{money(line.total)}</strong>
                        {line.option && <small>Per {line.option.unit}</small>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="package-add-button" onClick={addLine} type="button">
                <span aria-hidden="true">+</span>
                Add another product or service
              </button>
            </section>

            <section className="import-form-card" aria-labelledby="sale-payment-heading">
              <div className="form-section-heading">
                <span className="section-number">03</span>
                <div>
                  <h2 id="sale-payment-heading">Payment &amp; notes</h2>
                  <p>Record how the customer paid, or add a note.</p>
                </div>
              </div>
              <div className="import-fields-grid">
                <label className="import-field">
                  <span>Payment method</span>
                  <select defaultValue="" name="paymentMethod">
                    <option value="">Select method</option>
                    <option value="cash">Cash</option>
                    <option value="bank">Bank transfer</option>
                    <option value="mobile">Mobile banking</option>
                    <option value="credit">Credit / unpaid</option>
                  </select>
                </label>
                <label className="import-field">
                  <span>Amount received <span className="optional-label">Optional</span></span>
                  <div className="input-with-prefix">
                    <span>৳</span>
                    <input min="0" name="amountReceived" placeholder="0.00" step="0.01" type="number" />
                  </div>
                </label>
                <label className="import-field import-field-full">
                  <span>Notes <span className="optional-label">Optional</span></span>
                  <textarea name="notes" placeholder="Add any useful details about this sale" rows={3} />
                </label>
              </div>
            </section>

            <div className="import-form-actions">
              <Link className="secondary-button" href="/">Cancel</Link>
              <div className="save-action-group">
                <div className="save-action-buttons">
                  <button className="primary-button" disabled type="button">Save sale</button>
                  <button className="secondary-button save-more-button" disabled type="button">
                    Save Sale and Add More
                  </button>
                </div>
                <span>Saving will be connected in the next step.</span>
              </div>
            </div>
          </div>

          <aside className="import-summary sale-summary" aria-labelledby="sale-summary-heading">
            <div className="summary-card-heading">
              <span className="summary-heading-icon" aria-hidden="true">৳</span>
              <div>
                <h2 id="sale-summary-heading">Sale summary</h2>
                <p>Calculated from selected items.</p>
              </div>
            </div>
            <div className="sale-summary-lines">
              {calculatedLines.map((line, index) => (
                <div className="sale-summary-line" key={line.id}>
                  <span>{line.option?.name ?? `Sale item ${index + 1}`}</span>
                  <strong>{money(line.total)}</strong>
                </div>
              ))}
            </div>
            <div className="sale-grand-total">
              <span>Total sale</span>
              <strong>{money(grandTotal)}</strong>
            </div>
            <div className="summary-help">
              <span aria-hidden="true">✓</span>
              <p>Product and service prices are temporary examples and can be replaced with your actual items.</p>
            </div>
          </aside>
        </form>
      </main>
    </div>
  );
}
