"use client";

import { useState } from "react";

const units = [
  { value: "kg", label: "Kilograms (kg)", shortLabel: "kg" },
  { value: "maund", label: "Maund", shortLabel: "maund" },
  { value: "bag", label: "Bags", shortLabel: "bag" },
];

export default function PaddyQuantityFields() {
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [rate, setRate] = useState("");

  const amount =
    quantity !== "" && unit !== "" && rate !== ""
      ? Number(quantity) * Number(rate)
      : null;
  const totalAmount =
    amount !== null && Number.isFinite(amount) ? amount.toFixed(2) : "";
  const selectedUnit = units.find((option) => option.value === unit);
  const calculationHint = selectedUnit
    ? `Quantity × rate per ${selectedUnit.shortLabel}.`
    : "Select a unit and enter quantity and rate to calculate the total.";

  return (
    <>
      <label className="import-field">
        <span>Quantity <span className="required-mark">*</span></span>
        <input
          min="0"
          name="quantity"
          onChange={(event) => setQuantity(event.target.value)}
          placeholder="0.00"
          required
          step="0.01"
          type="number"
          value={quantity}
        />
      </label>
      <label className="import-field">
        <span>Unit <span className="required-mark">*</span></span>
        <select
          name="unit"
          onChange={(event) => setUnit(event.target.value)}
          required
          value={unit}
        >
          <option value="">Select unit</option>
          {units.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </label>
      <label className="import-field import-field-full">
        <span>Rate per unit <span className="required-mark">*</span></span>
        <div className="input-with-prefix">
          <span>৳</span>
          <input
            min="0"
            name="rate"
            onChange={(event) => setRate(event.target.value)}
            placeholder="0.00"
            required
            step="0.01"
            type="number"
            value={rate}
          />
        </div>
      </label>
      <label className="import-field import-field-full">
        <span>Total amount</span>
        <div className="input-with-prefix">
          <span>৳</span>
          <input
            aria-describedby="total-amount-hint"
            name="totalAmount"
            placeholder="Calculated automatically"
            readOnly
            type="text"
            value={totalAmount}
          />
        </div>
        <span className="calculation-hint" id="total-amount-hint">{calculationHint}</span>
      </label>
    </>
  );
}
