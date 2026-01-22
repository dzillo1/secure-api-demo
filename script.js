const API_URL = "https://secure-api-demo.onrender.com";

const output = document.getElementById("output");
const btn = document.getElementById("checkStatus");

btn.addEventListener("click", async () => {
  output.textContent = "Loading...";

  try {
    const res = await fetch(`${API_URL}/public/status`);
    const data = await res.json();
    output.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    output.textContent = "Error connecting to API";
  }
});
