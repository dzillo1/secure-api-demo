const API_BASE = "https://secure-api-demo.onrender.com";
let jwtToken = null;
const output = document.getElementById("output");

// Utility to display messages with optional type
function show(message, type = "success") {
  output.textContent = typeof message === "string" ? message : JSON.stringify(message, null, 2);
  output.className = type;
}

// Helper to handle fetch errors
async function fetchJSON(url, options = {}) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(`${res.status} ${res.statusText} ${JSON.stringify(errorData)}`);
    }
    return await res.json();
  } catch (err) {
    throw err;
  }
}

// Check API Status
document.getElementById("checkStatus").addEventListener("click", async () => {
  show("Checking API status...", "success");
  try {
    const data = await fetchJSON(`${API_BASE}/public/status`);
    show(data, "success");
  } catch (err) {
    show({ error: "Failed to fetch status", details: err.message }, "error");
  }
});

// Login
document.getElementById("login").addEventListener("click", async () => {
  show("Logging in...", "success");
  try {
    const data = await fetchJSON(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "demo", password: "password" }),
    });
    jwtToken = data.token;
    show({ message: "JWT received and stored in memory", token: jwtToken }, "success");
  } catch (err) {
    show({ error: "Login failed", details: err.message }, "error");
  }
});

// Get Protected Profile
document.getElementById("profile").addEventListener("click", async () => {
  if (!jwtToken) {
    show({ error: "Please login first" }, "error");
    return;
  }

  show("Fetching protected profile...", "success");

  try {
    const data = await fetchJSON(`${API_BASE}/private/profile`, {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });
    show(data, "success");
  } catch (err) {
    show({ error: "Unauthorized or server error", details: err.message }, "error");
  }
});
