const Navbar = () => {
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(2, 6, 23, 0.75)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            fontWeight: 700,
            background: "linear-gradient(90deg, #38bdf8, #2563eb)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          GroupTravel
        </h2>

        <button className="btn-primary">Create Group</button>
      </div>
    </nav>
  );
};

export default Navbar;
