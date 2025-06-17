import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul style={{ display: 'flex', gap: 16, listStyle: 'none', padding: 0 }}>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/bonds">Bond</Link></li>
        <li><Link to="/interfaces">Interfaces</Link></li>
        <li><Link to="/vlans">VLAN</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
