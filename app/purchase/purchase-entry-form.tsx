"use client";

import Link from "next/link";
import { useState } from "react";
import TodayDateInput from "../import-paddy/today-date-input";

type PurchaseLine = {
  id: number;
  product: string;
  unitCost: string;
  quantity: string;
  description: string;
};

const money = (amount: number) => `৳ ${amount.toLocaleString("en-BD", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})}`;

export default function PurchaseEntryForm() {
  const [lines, setLines] = useState<PurchaseLine[]>([
    { id: 0, product: "", unitCost: "", quantity: "1", description: "" },
  ]);
  const [nextId, setNextId] = useState(1);

  const updateLine = (id: number, patch: Partial<PurchaseLine>) => {
    setLines((currentLines) =>
      currentLines.map((line) => (line.id === id ? { ...line, ...patch } : line)),
    );
  };

  const addLine = () => {
    setLines((currentLines) => [
      ...currentLines,
      { id: nextId, product: "", unitCost: "", quantity: "1", description: "" },
    ]);
    setNextId((currentId) => currentId + 1);
  };

  const removeLine = (id: number) => {
    setLines((currentLines) => currentLines.filter((line) => line.id !== id));
  };

  const calculatedLines = lines.map((line) => {
    const quantity = Number(line.quantity);
    const unitCost = Number(line.unitCost);
    const total = Number.isFinite(quantity) && quantity > 0
      && Number.isFinite(unitCost) && unitCost >= 0
      ? unitCost * quantity
      : 0;

    return { ...line, total };
  });
  const grandTotal = calculatedLines.reduce((sum, line) => sum + line.total, 0);

  return (
    <div className="import-shell">
      <main className="import-content">
        <nav className="import-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Dashboard</Link>
          <span aria-hidden="true">/</span>
          <span>Add Purchase</span>
        </nav>

        <div className="import-page-heading">
          <div className="import-title-group">
            <span className="import-title-icon" aria-hidden="true">↙</span>
            <div>
              <p className="import-eyebrow">PURCHASES</p>
              <h1>Add Purchase</h1>
              <p className="import-subtitle">Record purchased products and their costs.</p>
            </div>
          </div>
          <span className="entry-status"><span /> New purchase</span>
        </div>

        <form className="sales-form-layout">
          <div className="sales-form-main">
            <section className="import-form-card" aria-labelledby="purchase-supplier-heading">
              <div className="form-section-heading">
                <span className="section-number">01</span>
                <div>
                  <h2 id="purchase-supplier-heading">Supplier &amp; reference</h2>
                  <p>Enter the supplier and purchase details.</p>
                </div>
              </div>
              <div className="import-fields-grid">
                <label className="import-field">
                  <span>Purchase category <span className="required-mark">*</span></span>
                  <select defaultValue="" name="purchaseCategory" required>
                    <option disabled value="">Select a category</option>
                    <option value="paddy">Paddy</option>
                    <option value="rice">Rice</option>
                    <option value="packaging">Packaging</option>
                    <option value="equipment">Equipment</option>
                    <option value="other">Other</option>
                  </select>
                </label>
                <label className="import-field">
                  <span>Supplier name <span className="required-mark">*</span></span>
                  <select defaultValue="" name="supplier" required>
                    <option disabled value="">Select a supplier</option>
                    <option value="temporary-supplier-1">Temporary Supplier 1</option>
                    <option value="temporary-supplier-2">Temporary Supplier 2</option>
                    <option value="temporary-supplier-3">Temporary Supplier 3</option>
                  </select>
                </label>
                <label className="import-field">
                  <span>Purchase date <span className="required-mark">*</span></span>
                  <TodayDateInput name="purchaseDate" />
                </label>
                <label className="import-field import-field-full">
                  <span>Invoice / reference number <span className="optional-label">Optional</span></span>
                  <input name="reference" placeholder="e.g. invoice or delivery number" />
                </label>
              </div>
            </section>

            <section className="import-form-card sales-items-card" aria-labelledby="purchase-items-heading">
              <div className="form-section-heading">
                <span className="section-number">02</span>
                <div>
                  <h2 id="purchase-items-heading">Products</h2>
                  <p>Enter the product name, unit cost, and quantity.</p>
                </div>
              </div>

              <div className="sale-lines">
                {calculatedLines.map((line, index) => (
                  <div className="sale-line" key={line.id}>
                    <div className="sale-line-heading">
                      <strong>Product {index + 1}</strong>
                      {lines.length > 1 && (
                        <button
                          aria-label={`Remove purchase item ${index + 1}`}
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
                        <span>Product <span className="required-mark">*</span></span>
                        <input
                          name={`items[${index}][product]`}
                          onChange={(event) => updateLine(line.id, { product: event.target.value })}
                          placeholder="Enter product name"
                          required
                          value={line.product}
                        />
                      </label>
                      <label className="import-field">
                        <span>Unit cost <span className="required-mark">*</span></span>
                        <div className="input-with-prefix">
                          <span>৳</span>
                          <input
                            aria-label={`Unit cost for purchase item ${index + 1}`}
                            name={`items[${index}][unitCost]`}
                            min="0"
                            onChange={(event) => updateLine(line.id, { unitCost: event.target.value })}
                            placeholder="0.00"
                            required
                            step="0.01"
                            type="number"
                            value={line.unitCost}
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
                      </div>
                    </div>
                    <div className="purchase-item-extra-fields">
                      <label className="import-field">
                        <span>Additional description <span className="optional-label">Optional</span></span>
                        <textarea
                          name={`items[${index}][description]`}
                          onChange={(event) => updateLine(line.id, { description: event.target.value })}
                          placeholder="Add product details"
                          rows={2}
                          value={line.description}
                        />
                      </label>
                      <label className="import-field">
                        <span>Media upload <span className="optional-label">Optional</span></span>
                        <input
                          accept="image/*,video/*,.pdf"
                          className="purchase-media-input"
                          multiple
                          name={`items[${index}][media]`}
                          type="file"
                        />
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <button className="package-add-button" onClick={addLine} type="button">
                <span aria-hidden="true">+</span>
                Add another product
              </button>
            </section>

            <section className="import-form-card" aria-labelledby="purchase-payment-heading">
              <div className="form-section-heading">
                <span className="section-number">03</span>
                <div>
                  <h2 id="purchase-payment-heading">Payment &amp; notes</h2>
                  <p>Record the payment or add a note.</p>
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
                  <span>Amount paid <span className="optional-label">Optional</span></span>
                  <div className="input-with-prefix">
                    <span>৳</span>
                    <input min="0" name="amountPaid" placeholder="0.00" step="0.01" type="number" />
                  </div>
                </label>
                <label className="import-field import-field-full">
                  <span>Notes <span className="optional-label">Optional</span></span>
                  <textarea name="notes" placeholder="Add any useful details about this purchase" rows={3} />
                </label>
              </div>
            </section>

            <div className="import-form-actions">
              <Link className="secondary-button" href="/">Cancel</Link>
              <div className="save-action-group">
                <div className="save-action-buttons">
                  <button className="primary-button" disabled type="button">Save purchase</button>
                  <button className="secondary-button save-more-button" disabled type="button">
                    Save Purchase and Add More
                  </button>
                </div>
                <span>Saving will be connected in the next step.</span>
              </div>
            </div>
          </div>

          <aside className="import-summary sale-summary" aria-labelledby="purchase-summary-heading">
            <div className="summary-card-heading">
              <span className="summary-heading-icon" aria-hidden="true">৳</span>
              <div>
                <h2 id="purchase-summary-heading">Purchase summary</h2>
                <p>Calculated from selected items.</p>
              </div>
            </div>
            <div className="sale-summary-lines">
              {calculatedLines.map((line, index) => (
                <div className="sale-summary-line" key={line.id}>
                  <span>{line.product.trim() || `Product ${index + 1}`}</span>
                  <strong>{money(line.total)}</strong>
                </div>
              ))}
            </div>
            <div className="sale-grand-total">
              <span>Total purchase</span>
              <strong>{money(grandTotal)}</strong>
            </div>
            <div className="summary-help">
              <span aria-hidden="true">✓</span>
              <p>Each line total is calculated from its unit cost and quantity.</p>
            </div>
          </aside>
        </form>
      </main>
    </div>
  );
}
