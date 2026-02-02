import React from "react";

const Reports = () => {

  const exportExcel = () => {
    alert("Excel Export Triggered (Demo)");
  };

  const exportPDF = () => {
    alert("PDF Export Triggered (Demo)");
  };

  return (
    <div style={{ background: "#050c1f", minHeight: "100vh", color: "#fff" }}>
      <style>{`
        body{margin:0;font-family:Segoe UI,Arial}
        header{
          padding:20px 40px;
          background:rgba(0,0,0,.6);
          display:flex;justify-content:space-between;align-items:center
        }
        .logo{font-size:24px;font-weight:700;color:#4fd1ff}
        .container{padding:30px 40px}

        .grid{
          display:grid;
          grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
          gap:20px;margin-bottom:30px
        }
        .card{
          background:rgba(255,255,255,.08);
          border-radius:14px;
          padding:20px;
          box-shadow:0 0 20px rgba(79,209,255,.1);
          transition:.3s
        }
        .card:hover{transform:translateY(-6px);background:rgba(255,255,255,.15)}
        h2{margin-bottom:10px}
        .metric{font-size:28px;font-weight:700;color:#4fd1ff}

        .section{margin-top:40px}
        .chart{
          height:200px;
          background:linear-gradient(120deg,#4fd1ff33,#6a5cff33);
          border-radius:12px;
          display:flex;align-items:flex-end;padding:10px
        }
        .bar{
          width:20%;
          margin:0 5px;
          background:#4fd1ff;
          border-radius:6px 6px 0 0;
          animation:grow 1s ease forwards;
        }
        @keyframes grow{from{height:0}to{height:var(--h)}}

        .table{width:100%;border-collapse:collapse;margin-top:10px}
        .table th,.table td{
          padding:10px;border-bottom:1px solid #2a3566
        }
        button{
          padding:10px 16px;border:none;border-radius:8px;
          background:linear-gradient(45deg,#4fd1ff,#6a5cff);
          color:#fff;cursor:pointer
        }
      `}</style>

      <header>
        <div className="logo">DGTE Reports</div>
        <div>
          <button onClick={exportExcel}>Export Excel</button>
          <button onClick={exportPDF}>Export PDF</button>
        </div>
      </header>

      <div className="container">

        <div className="grid">
          <div className="card"><h2>Revenue</h2><div className="metric">₹12.4L</div></div>
          <div className="card"><h2>Cost</h2><div className="metric">₹9.1L</div></div>
          <div className="card"><h2>Margin</h2><div className="metric">₹3.3L</div></div>
          <div className="card"><h2>Utilization</h2><div className="metric">87%</div></div>
          <div className="card"><h2>Guest Score</h2><div className="metric">4.6 ★</div></div>
          <div className="card"><h2>Supplier Index</h2><div className="metric">92%</div></div>
        </div>

        <div className="section">
          <h2>Booking Trends</h2>
          <div className="chart">
            <div className="bar" style={{ "--h": "40%" }}></div>
            <div className="bar" style={{ "--h": "70%" }}></div>
            <div className="bar" style={{ "--h": "90%" }}></div>
            <div className="bar" style={{ "--h": "60%" }}></div>
            <div className="bar" style={{ "--h": "80%" }}></div>
          </div>
        </div>

        <div className="section">
          <h2>Inventory Utilization</h2>
          <table className="table">
            <thead>
              <tr><th>Hotel</th><th>Allotted</th><th>Used</th><th>%</th></tr>
            </thead>
            <tbody>
              <tr><td>Grand Palace</td><td>100</td><td>92</td><td>92%</td></tr>
              <tr><td>Sunrise Resort</td><td>80</td><td>65</td><td>81%</td></tr>
            </tbody>
          </table>
        </div>

        <div className="section">
          <h2>Supplier Performance</h2>
          <table className="table">
            <thead>
              <tr><th>Supplier</th><th>Rating</th><th>Complaints</th></tr>
            </thead>
            <tbody>
              <tr><td>Grand Palace</td><td>4.8</td><td>1</td></tr>
              <tr><td>Sunrise Resort</td><td>4.3</td><td>3</td></tr>
            </tbody>
          </table>
        </div>

        <div className="section">
          <h2>Financial Reconciliation</h2>
          <table className="table">
            <thead>
              <tr><th>Total Collected</th><th>Supplier Paid</th><th>Pending</th></tr>
            </thead>
            <tbody>
              <tr><td>₹12.4L</td><td>₹8.6L</td><td>₹80K</td></tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default Reports;
