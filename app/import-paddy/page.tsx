import Link from "next/link";
import type { Metadata } from "next";
import TodayDateInput from "./today-date-input";
import PackageBreakdown from "./package-breakdown";
import PaddyQuantityFields from "./paddy-quantity-fields";

export const metadata: Metadata = {
  title: "Import Paddy | Your Company Name",
  description: "Record an incoming paddy purchase.",
};

export default function ImportPaddyPage() {
  return (
    <div className="import-shell">
      <main className="import-content">
        <nav className="import-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Dashboard</Link>
          <span aria-hidden="true">/</span>
          <span>Import Paddy</span>
        </nav>

        <div className="import-page-heading">
          <div className="import-title-group">
            <span className="import-title-icon" aria-hidden="true">↓</span>
            <div>
              <p className="import-eyebrow">INVENTORY</p>
              <h1>Import Paddy</h1>
              <p className="import-subtitle">Record a new paddy purchase and its delivery details.</p>
            </div>
          </div>
          <span className="entry-status"><span /> New entry</span>
        </div>

        <form className="import-form-layout">
          <div className="import-form-main">
            <section className="import-form-card" aria-labelledby="supplier-heading">
              <div className="form-section-heading">
                <span className="section-number">01</span>
                <div>
                  <h2 id="supplier-heading">Supplier &amp; reference</h2>
                  <p>Who supplied this paddy?</p>
                </div>
              </div>
              <div className="import-fields-grid">
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
                  <TodayDateInput />
                </label>
                <label className="import-field import-field-full">
                  <span>Invoice / reference number <span className="optional-label">Optional</span></span>
                  <input name="reference" placeholder="e.g. invoice or delivery reference" />
                </label>
              </div>
            </section>

            <section className="import-form-card" aria-labelledby="paddy-heading">
              <div className="form-section-heading">
                <span className="section-number">02</span>
                <div>
                  <h2 id="paddy-heading">Paddy details</h2>
                  <p>Describe the delivery and quantity received.</p>
                </div>
              </div>
              <div className="import-fields-grid paddy-fields-grid">
                <label className="import-field import-field-full">
                  <span>Variety / grade <span className="required-mark">*</span></span>
                  <select defaultValue="" name="variety" required>
                    <option disabled value="">Select a variety or grade</option>
                    <option value="temporary-variety-a">Temporary Variety A</option>
                    <option value="temporary-variety-b">Temporary Variety B</option>
                    <option value="temporary-grade-a">Temporary Grade A</option>
                  </select>
                </label>
                <PackageBreakdown />
                <PaddyQuantityFields />
              </div>
            </section>

            <section className="import-form-card" aria-labelledby="payment-heading">
              <div className="form-section-heading">
                <span className="section-number">03</span>
                <div>
                  <h2 id="payment-heading">Payment &amp; notes</h2>
                  <p>Add payment information or an internal note.</p>
                </div>
              </div>
              <div className="import-fields-grid">
                <label className="import-field">
                  <span>Amount paid <span className="optional-label">Optional</span></span>
                  <div className="input-with-prefix">
                    <span>৳</span>
                    <input min="0" name="amountPaid" placeholder="0.00" step="0.01" type="number" />
                  </div>
                </label>
                <label className="import-field">
                  <span>Payment method</span>
                  <select defaultValue="" name="paymentMethod">
                    <option value="">Select method</option>
                    <option value="cash">Cash</option>
                    <option value="bank">Bank transfer</option>
                    <option value="mobile">Mobile banking</option>
                  </select>
                </label>
                <label className="import-field import-field-full">
                  <span>Notes <span className="optional-label">Optional</span></span>
                  <textarea name="notes" placeholder="Add any useful details about this delivery" rows={3} />
                </label>
              </div>
            </section>

            <div className="import-form-actions">
              <Link className="secondary-button" href="/">Cancel</Link>
              <div className="save-action-group">
                <div className="save-action-buttons">
                  <button className="primary-button" disabled type="button">Save import</button>
                  <button className="secondary-button save-more-button" disabled type="button">
                    Save Import and Add More
                  </button>
                </div>
                <span>Saving will be connected in the next step.</span>
              </div>
            </div>
          </div>

          <aside className="import-summary" aria-labelledby="summary-heading">
            <div className="summary-card-heading">
              <span className="summary-heading-icon" aria-hidden="true">▤</span>
              <div>
                <h2 id="summary-heading">Import summary</h2>
                <p>Review the key details.</p>
              </div>
            </div>
            <div className="summary-placeholder">
              <span className="summary-placeholder-icon" aria-hidden="true">＋</span>
              <strong>Details will appear here</strong>
              <span>Your quantity and payment summary will be available once the form is connected.</span>
            </div>
            <div className="summary-help">
              <span aria-hidden="true">✓</span>
              <p>Review supplier, quantity, and payment details before recording an import.</p>
            </div>
          </aside>
        </form>
      </main>
    </div>
  );
}
