import React, { useState, useEffect } from "react";
import { editBond, addBondMember } from "../api/bonds";

// Modal untuk edit bond dan tambah member
function EditBondModal({ bond, onClose, onSuccess }) {
  const [mode, setMode] = useState(bond.mode.toLowerCase());
  const [lb, setLb] = useState(bond.lb_algo.toLowerCase());
  const [memberToAdd, setMemberToAdd] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEdit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await editBond({ swIfIndex: bond.index, mode, lb });
      onSuccess && onSuccess();
      onClose();
    } catch (e) {
      alert("Gagal update bond: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!memberToAdd) return;
    setLoading(true);
    try {
      await addBondMember({ swIfIndex: bond.index, memberIndex: Number(memberToAdd) });
      onSuccess && onSuccess();
      setMemberToAdd("");
    } catch (e) {
      alert("Gagal tambah member: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleEdit}>
        <h3>Edit Bond {bond.name}</h3>
        <label>
          Mode:
          <select value={mode} onChange={e => setMode(e.target.value)}>
            <option value="lacp">LACP</option>
            <option value="round-robin">Round Robin</option>
            <option value="xor">XOR</option>
            <option value="active-backup">Active Backup</option>
            <option value="broadcast">Broadcast</option>
          </select>
        </label>
        <label>
          Load-balance:
          <select value={lb} onChange={e => setLb(e.target.value)}>
            <option value="l2">L2</option>
            <option value="l34">L34</option>
            <option value="l23">L23</option>
            <option value="rr">RR</option>
            <option value="bc">BC</option>
            <option value="ab">AB</option>
          </select>
        </label>
        <button type="submit" disabled={loading}>Simpan</button>
      </form>
      <form onSubmit={handleAddMember}>
        <label>
          Tambah Member (sw_if_index):
          <input
            value={memberToAdd}
            type="number"
            onChange={e => setMemberToAdd(e.target.value)}
            placeholder="sw_if_index"
          />
        </label>
        <button type="submit" disabled={loading || !memberToAdd}>Tambah Member</button>
      </form>
      <button onClick={onClose}>Tutup</button>
    </div>
  );
}

// Komponen utama Bonds
function Bonds() {
  const [bonds, setBonds] = useState([]);
  const [selectedBond, setSelectedBond] = useState(null);

  // Ambil daftar bonds dari backend
  const fetchBonds = async () => {
    const res = await fetch("http://192.168.248.4:8080/vpp/bonds");
    const data = await res.json();
    setBonds(data.bonds || []);
  };

  useEffect(() => {
    fetchBonds();
  }, []);

  return (
    <div>
      <h2>Daftar Bonds</h2>
      <table border="1" cellPadding={4}>
        <thead>
          <tr>
            <th>Index</th>
            <th>Nama</th>
            <th>Mode</th>
            <th>LB Algo</th>
            <th>Members</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {bonds.map((bond) => (
            <tr key={bond.index}>
              <td>{bond.index}</td>
              <td>{bond.name}</td>
              <td>{bond.mode}</td>
              <td>{bond.lb_algo}</td>
              <td>{bond.members}</td>
              <td>
                <button onClick={() => setSelectedBond(bond)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedBond && (
        <EditBondModal
          bond={selectedBond}
          onClose={() => setSelectedBond(null)}
          onSuccess={fetchBonds}
        />
      )}
    </div>
  );
}

export default Bonds;
