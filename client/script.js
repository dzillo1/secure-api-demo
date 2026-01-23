const API_BASE = "https://secure-api-demo.onrender.com";
const TOKEN_KEY = "secure_api_jwt";

let jwtToken = localStorage.getItem(TOKEN_KEY);
const output = document.getElementById("output");
const authStatus = document.getElementById("authStatus");

// ui
function show(message, type = "success") {
  output.textContent =
    typeof message === "string"
      ? message
      : JSON.stringify(message, null, 2);
  output.className = type;
}

function updateAuthUI() {
  if (jwtToken) {
    authStatus.textContent = "✅ Logged in (JWT stored)";
  } else {
    authStatus.textContent = "🔒 Not logged in";
  }
}

// fetch
async function fetchJSON(url, options = {}) {
  const res = await fetch(url, options);

  if (!res.ok) {
    let errorData = {};
    try {
      errorData = await res.json();
    } catch (_) {}

    if (res.status === 401) {
      logout("Session expired. Please login again.");
    }

    throw new Error(
      `${res.status} ${res.statusText} ${JSON.stringify(errorData)}`
    );
  }

  return res.json();
}

// actions
document.getElementById("checkStatus").addEventListener("click", async () => {
  show("Checking API status...");
  try {
    const data = await fetchJSON(`${API_BASE}/public/status`);
    show(data);
  } catch (err) {
    show(err.message, "error");
  }
});

document.getElementById("login").addEventListener("click", async () => {
  show("Logging in...");
  try {
    const data = await fetchJSON(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "demo", password: "password" }),
    });

    jwtToken = data.token;
    localStorage.setItem(TOKEN_KEY, jwtToken);
    updateAuthUI();

    show("✅ Logged in successfully");
  } catch (err) {
    show("❌ Login failed\n" + err.message, "error");
  }
});

document.getElementById("profile").addEventListener("click", async () => {
  if (!jwtToken) {
    show("Please login first", "error");
    return;
  }

  show("Fetching protected profile...");
  try {
    const data = await fetchJSON(`${API_BASE}/private/profile`, {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });
    show(data);
  } catch (err) {
    show("❌ Unauthorized or server error\n" + err.message, "error");
  }
});

document.getElementById("logout").addEventListener("click", () => {
  logout("Logged out");
});

// logout
function logout(message) {
  jwtToken = null;
  localStorage.removeItem(TOKEN_KEY);
  updateAuthUI();
  show(message, "success");
}

// Initialize ui on load
updateAuthUI();
