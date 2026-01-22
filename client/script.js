// Base URL of your deployed Render API
const API_BASE = "https://secure-api-demo.onrender.com";

let jwtToken = null; // store JWT in memory

const output = document.getElementById("output");

// Utility to display messages
function show(message) {
  output.textContent = JSON.stringify(message, null, 2);
}

// Check public status
document.getElementById("checkStatus").addEventListener("click", async () => {
  try {
    const res = await fetch(`${API_BASE}/public/status`);
    const data = await res.json();
    show(data);
  } catch (err) {
    show({ error: "Failed to fetch status", details: err.message });
  }
});

// Login to get JWT
document.getElementById("login").addEventListener("click", async () => {
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "demo", password: "password" }),
    });
    const data = await res.json();
    jwtToken = data.token;
    show({ message: "JWT received and stored in memory", token: jwtToken });
  } catch (err) {
    show({ error: "Login failed", details: err.message });
  }
});

// Fetch protected profile
document.getElementById("profile").addEventListener("click", async () => {
  if (!jwtToken) {
    show({ error: "Please login first" });
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/private/profile`, {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const data = await res.json();
    show(data);
  } catch (err) {
    show({ error: "Unauthorized or server error", details: err.message });
  }
});
