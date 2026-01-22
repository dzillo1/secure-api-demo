const API_URL = "https://secure-api-demo.onrender.com";

const output = document.getElementById("output");
const statusBtn = document.getElementById("checkStatus");
const loginBtn = document.getElementById("login");
const profileBtn = document.getElementById("profile");

let jwtToken = null;

// ------------------------
// Public status endpoint
// ------------------------
statusBtn.addEventListener("click", async () => {
  output.textContent = "Checking API status...";

  try {
    const res = await fetch(`${API_URL}/public/status`);
    const data = await res.json();
    output.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    output.textContent = "❌ Error calling public status API";
    console.error(err);
  }
});

// ------------------------
// Login (JWT)
// ------------------------
loginBtn.addEventListener("click", async () => {
  output.textContent = "Logging in...";

  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "demo",
        password: "password"
      })
    });

    const data = await res.json();
    jwtToken = data.token;

    if (!jwtToken) {
      throw new Error("No token returned");
    }

    output.textContent = "✅ JWT received and stored in memory";
    console.log("JWT:", jwtToken);
  } catch (err) {
    output.textContent = "❌ Login failed";
    console.error(err);
  }
});

// ------------------------
// Protected profile
// ------------------------
profileBtn.addEventListener("click", async () => {
  if (!jwtToken) {
    output.textContent = "❌ Please login first";
    return;
  }

  output.textContent = "Fetching protected profile...";

  try {
    const res = await fetch(`${API_URL}/private/profile`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    });

    if (!res.ok) {
      throw new Error(`Status ${res.status}`);
    }

    const data = await res.json();
    output.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    output.textContent = "❌ Unauthorized or server error";
    console.error(err);
  }
});
