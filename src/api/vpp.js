import axios from "axios";
import { API_BASE_URL, API_TOKEN } from "./config";

const headers = { Authorization: `Bearer ${API_TOKEN}` };

export const fetchBonds = () => axios.get(`${API_BASE_URL}/bonds`, { headers });
export const createBond = (data) => axios.post(`${API_BASE_URL}/bonds`, data, { headers });
// Tambahkan endpoint lain sesuai kebutuhan
