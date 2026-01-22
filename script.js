const API_URL = "https://secure-api-demo.onrender.com";
const output = document.getElementById("output");

let token = null;

document.getElementById("login").addEventListener("click", async () => {
  output.textContent = "Logging in...";

  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "demo",
      password: "password",
    }),
  });

  const data = await res.json();
  token = data.token;

  output.textContent = "JWT received and stored in memory";
});

document.getElementById("profile").addEventListener("click", async () => {
  if (!token) {
    output.textContent = "Please login first";
    return;
  }

  const res = await fetch(`${API_URL}/private/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  output.textContent = JSON.stringify(data, null, 2);
});
