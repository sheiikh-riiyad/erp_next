"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { menuItems } from "../navigation-items";

export default function ErpNavigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="topbar">
        <button
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          className={`menu-toggle${menuOpen ? " is-open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>
        <Link className="brand" href="/" aria-label="Your Company Name home">
          Your Company Name
        </Link>
        <Link className="profile-button" href="/#profile" aria-label="Go to profile">
          <span className="profile-initial">Y</span>
        </Link>
      </header>

      {menuOpen && (
        <button
          aria-label="Close navigation menu"
          className="menu-backdrop"
          onClick={() => setMenuOpen(false)}
          type="button"
        />
      )}
      <nav className={`sidebar${menuOpen ? " sidebar-open" : ""}`} aria-label="Main navigation">
        <div className="sidebar-heading">WORKSPACE</div>
        {menuItems.map((item) => {
          const isDashboardPage = item.target === "dashboard" && pathname === "/";
          const isImportPage = item.target === "import-paddy" && pathname === "/import-paddy";
          const isSalesPage = item.target === "add-sales" && pathname === "/sales";
          const isPurchasePage = item.target === "add-purchase" && pathname === "/purchase";
          const isExpensePage = item.target === "add-expense" && pathname === "/expense";
          const href = item.target === "dashboard"
            ? "/"
            : item.target === "import-paddy"
              ? "/import-paddy"
              : item.target === "add-sales"
                ? "/sales"
                : item.target === "add-purchase"
                  ? "/purchase"
                  : item.target === "add-expense"
                    ? "/expense"
                    : item.target === "profile"
                      ? "/#profile"
                      : pathname === "/"
                        ? `#${item.target}`
                        : `/#${item.target}`;

          return (
            <Link
              aria-current={isDashboardPage || isImportPage || isSalesPage || isPurchasePage || isExpensePage ? "page" : undefined}
              className={`nav-item${isDashboardPage || isImportPage || isSalesPage || isPurchasePage || isExpensePage ? " nav-item-current" : ""}`}
              href={href}
              key={item.target}
              onClick={() => setMenuOpen(false)}
            >
              <span className="nav-icon" aria-hidden="true">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
        <div className="sidebar-footer">
          <span className="status-dot" />
          All changes saved
        </div>
      </nav>
    </>
  );
}
