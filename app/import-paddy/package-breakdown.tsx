"use client";

import { useRef, useState } from "react";

type PackageLine = {
  id: number;
  category: string;
  quantity: string;
};

export default function PackageBreakdown() {
  const nextId = useRef(1);
  const [packages, setPackages] = useState<PackageLine[]>([
    { id: 0, category: "", quantity: "" },
  ]);

  const updatePackage = (id: number, field: "category" | "quantity", value: string) => {
    setPackages((currentPackages) =>
      currentPackages.map((packageLine) =>
        packageLine.id === id ? { ...packageLine, [field]: value } : packageLine,
      ),
    );
  };

  const addPackage = () => {
    const id = nextId.current;
    nextId.current += 1;
    setPackages((currentPackages) => [
      ...currentPackages,
      { id, category: "", quantity: "" },
    ]);
  };

  const removePackage = (id: number) => {
    setPackages((currentPackages) =>
      currentPackages.filter((packageLine) => packageLine.id !== id),
    );
  };

  return (
    <div className="package-breakdown import-field-full">
      <div className="package-breakdown-heading">
        <div>
          <h3>Package category &amp; quantity</h3>
          <p>Choose a package category to enter its quantity.</p>
        </div>
      </div>

      <div className="package-lines">
        {packages.map((packageLine, index) => (
          <div className="package-line" key={packageLine.id}>
            <div className="package-line-fields">
              <label className="import-field">
                <span>Package category <span className="required-mark">*</span></span>
                <select
                  name={`packages[${index}][category]`}
                  onChange={(event) => updatePackage(packageLine.id, "category", event.target.value)}
                  required
                  value={packageLine.category}
                >
                  <option disabled value="">Select package category</option>
                  <option value="bag">Bag</option>
                  <option value="sack">Sack</option>
                  <option value="loose">Loose</option>
                </select>
              </label>
              {packageLine.category && (
                <label className="import-field">
                  <span>Package quantity <span className="required-mark">*</span></span>
                  <input
                    min="0"
                    name={`packages[${index}][quantity]`}
                    onChange={(event) => updatePackage(packageLine.id, "quantity", event.target.value)}
                    placeholder="Enter quantity"
                    required
                    step="1"
                    type="number"
                    value={packageLine.quantity}
                  />
                </label>
              )}
            </div>

            {packages.length > 1 && (
              <button
                aria-label={`Remove package category ${index + 1}`}
                className="package-remove-button"
                onClick={() => removePackage(packageLine.id)}
                type="button"
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>

      <button className="package-add-button" onClick={addPackage} type="button">
        <span aria-hidden="true">+</span>
        Add more category with quantity
      </button>
    </div>
  );
}
