// ====== Chart Setup ======
const cpuChartCtx = document.getElementById("cpuChart").getContext("2d");
const memChartCtx = document.getElementById("memChart").getContext("2d");
const diskChartCtx = document.getElementById("diskChart").getContext("2d");
const alertCountElem = document.getElementById("alertCount");

const createChart = (ctx, label, color) => {
  return new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Used", "Free"],
      datasets: [
        {
          label,
          data: [0, 100],
          backgroundColor: [color, "rgba(255,255,255,0.1)"],
        },
      ],
    },
    options: { plugins: { legend: { labels: { color: "#fff" } } } },
  });
};

const cpuChart = createChart(cpuChartCtx, "CPU Usage", "rgba(255,99,132,0.8)");
const memChart = createChart(memChartCtx, "Memory Usage", "rgba(54,162,235,0.8)");
const diskChart = createChart(diskChartCtx, "Disk Usage", "rgba(255,206,86,0.8)");

// ====== Token Handling ======
const token = localStorage.getItem("sessionToken");

if (!token) {
  // 🔒 If user not logged in, redirect to login page
  window.location.href = "login.html";
}

// ====== Fetch Summary + Metrics ======
async function fetchData() {
  try {
    const res = await fetch("http://localhost:5000/api/reports/summary", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 401 || res.status === 403) {
      alert("Session expired or invalid. Please log in again.");
      localStorage.removeItem("sessionToken");
      window.location.href = "login.html";
      return;
    }

    const data = await res.json();

    if (data.averages) {
      const { cpuLoad, usedMemPercent } = data.averages;
      const diskUsage = parseFloat(data.averages.diskUsageGB);

      cpuChart.data.datasets[0].data = [cpuLoad, 100 - cpuLoad];
      memChart.data.datasets[0].data = [usedMemPercent, 100 - usedMemPercent];
      diskChart.data.datasets[0].data = [diskUsage, 100 - diskUsage];
      cpuChart.update();
      memChart.update();
      diskChart.update();

      alertCountElem.textContent = `${data.alerts.total} alerts`;
    } else {
      alertCountElem.textContent = "No data available.";
    }
  } catch (err) {
    console.error("Error fetching metrics:", err);
    alertCountElem.textContent = "Error fetching data!";
  }
}

// Refresh every 5 seconds
setInterval(fetchData, 5000);
fetchData();
