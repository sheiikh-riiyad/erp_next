import { menuItems } from "./navigation-items";

const summaryCards = [
  { label: "Total sales", value: "৳ 0.00", detail: "All-time sales" },
  { label: "Today's total sales", value: "৳ 0.00", detail: "Sales recorded today" },
  { label: "Net cash", value: "৳ 0.00", detail: "Current cash balance" },
  { label: "Season cash", value: "৳ 0.00", detail: "Cash this season" },
];

export default function Home() {
  return (
    <main className="erp-shell">
      <div className="dashboard">
        <section className="main-column" aria-label="Business overview">
          <div className="page-heading">
            <div>
              <p className="eyebrow">OVERVIEW</p>
              <h1>Good morning</h1>
              <p className="page-subtitle">Here&apos;s how your business is doing today.</p>
            </div>
            <div className="date-chip">This month</div>
          </div>

          <section className="summary-grid" aria-label="Sales and cash summaries">
            {summaryCards.map((card, index) => (
              <article className="summary-card" key={card.label}>
                <div className="card-topline">
                  <span>{card.label}</span>
                  <span className={`metric-icon metric-icon-${index + 1}`} aria-hidden="true">
                    {["↗", "◷", "৳", "▤"][index]}
                  </span>
                </div>
                <p className="metric-value">{card.value}</p>
                <p className="metric-detail">{card.detail}</p>
              </article>
            ))}
          </section>

          <section className="panel sales-panel" aria-labelledby="sales-heading">
            <div className="panel-heading">
              <div>
                <h2 id="sales-heading">Sales overview</h2>
                <p>Track sales by day throughout the month.</p>
              </div>
              <span className="period-select">This month <span aria-hidden="true">⌄</span></span>
            </div>
            <div className="chart" role="img" aria-label="Monthly sales chart, no sales data recorded yet">
              <div className="chart-y-labels" aria-hidden="true">
                <span>৳ 4k</span><span>৳ 3k</span><span>৳ 2k</span><span>৳ 1k</span><span>৳ 0</span>
              </div>
              <div className="chart-plot">
                <div className="chart-gridline" /><div className="chart-gridline" />
                <div className="chart-gridline" /><div className="chart-gridline" />
                <div className="chart-gridline" />
                <div className="chart-empty">
                  <span className="empty-chart-icon" aria-hidden="true">⌁</span>
                  <span>Sales data will appear here</span>
                  <span className="chart-empty-subtitle">Add a sale to start tracking your month</span>
                </div>
                <div className="chart-x-labels" aria-hidden="true">
                  <span>1</span><span>5</span><span>10</span><span>15</span><span>20</span><span>25</span><span>30</span>
                </div>
              </div>
            </div>
            <div className="chart-legend"><span /> Sales</div>
          </section>
        </section>

        <aside className="right-column" aria-label="Quick access and activity">
          <section className="panel quick-panel" aria-labelledby="quick-heading">
            <div className="panel-heading compact-heading">
              <div>
                <h2 id="quick-heading">Quick actions</h2>
                <p>Common tasks, all in one place.</p>
              </div>
              <span className="quick-heading-icon" aria-hidden="true">✦</span>
            </div>
            <div className="quick-actions">
              {menuItems.filter((item) => item.target !== "profile" && item.target !== "dashboard").map((item, index) => (
                <a
                  className="quick-action"
                  href={item.target === "import-paddy"
                    ? "/import-paddy"
                    : item.target === "add-sales"
                      ? "/sales"
                      : item.target === "add-purchase"
                        ? "/purchase"
                        : item.target === "add-expense"
                          ? "/expense"
                      : `#${item.target}`}
                  id={item.target}
                  key={item.target}
                >
                  <span className={`quick-icon quick-icon-${index + 1}`} aria-hidden="true">{item.icon}</span>
                  <span>{item.label}</span>
                  <span className="action-arrow" aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </section>

          <section className="panel activity-panel" aria-labelledby="activity-heading">
            <div className="panel-heading compact-heading">
              <div>
                <h2 id="activity-heading">Recent activity</h2>
                <p>Your latest business updates.</p>
              </div>
              <span className="activity-dots" aria-hidden="true">•••</span>
            </div>
            <div className="activity-empty">
              <span className="activity-empty-icon" aria-hidden="true">↻</span>
              <strong>Nothing to show yet</strong>
              <span>Your recent sales and purchases will show up here.</span>
            </div>
          </section>

          <section className="profile-card" id="profile">
            <div className="profile-avatar">Y</div>
            <div>
              <strong>Your profile</strong>
              <span>Business owner</span>
            </div>
            <span className="profile-more" aria-hidden="true">···</span>
          </section>
        </aside>
      </div>
    </main>
  );
}
