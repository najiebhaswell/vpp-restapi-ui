import React, { useEffect, useState } from "react";
import { fetchBonds } from "../api/vpp";

function Bonds() {
  const [bonds, setBonds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBonds()
      .then(res => {
        // Log response untuk debugging
        console.log("Bond API response:", res.data);
        setBonds(res.data?.bonds ?? []);
      })
      .catch(err => {
        setError("Failed to fetch bonds: " + err.message);
        setBonds([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div>
      <h2>Bond Interfaces</h2>
      <div>Loading...</div>
    </div>
  );

  if (error) return (
    <div>
      <h2>Bond Interfaces</h2>
      <div style={{color: "red"}}>{error}</div>
    </div>
  );

  return (
    <div>
      <h2>Bond Interfaces</h2>
      {bonds.length === 0 ? (
        <div>Tidak ada bond ditemukan.</div>
      ) : (
        <table border="1" cellPadding="6">
          <thead>
            <tr>
              <th>Index</th>
              <th>Name</th>
              <th>Mode</th>
              <th>LB Algo</th>
              <th>Members</th>
            </tr>
          </thead>
          <tbody>
            {bonds.map((bond, idx) => (
              <tr key={bond.index || idx}>
                <td>{bond.index}</td>
                <td>{bond.name}</td>
                <td>{bond.mode}</td>
                <td>{bond.lb_algo}</td>
                <td>{bond.members}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Bonds;
