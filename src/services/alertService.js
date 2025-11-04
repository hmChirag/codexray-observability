let alerts = [];

export function saveAlert(type, value, timestamp) {
  const alert = { id: alerts.length + 1, type, value, timestamp };
  alerts.push(alert);
  console.log(`🚨 ALERT: ${type} usage ${value}% at ${timestamp}`);
}

export function getAlerts() {
  return alerts;
}

export function getAlertsByType(type) {
  return alerts.filter((a) => a.type === type);
}

export function getRecentAlerts(n = 5) {
  return alerts.slice(-n);
}

export function getTotalAlerts() {
  return alerts.length;
}
