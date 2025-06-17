const API_URL = "http://192.168.248.4:8080/vpp/bonds";
const API_KEY = "AexDQ4RyPi3jYETDHYFIxfFeQztzxBFoH3zZXGTTk0cI0RZqpzbqXM3epOeIOHik"; // Ganti dengan API key/token Anda jika perlu

export async function fetchBonds() {
  const res = await fetch(API_URL, {
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
    },
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}

export async function editBond({ swIfIndex, mode, lb }) {
  const res = await fetch(`${API_URL}/${swIfIndex}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({ mode, lb }),
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}

export async function addBondMember({ swIfIndex, memberIndex }) {
  const res = await fetch(`${API_URL}/${swIfIndex}/member`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({ member_index: memberIndex }),
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}
