# CodeXray Observability Dashboard

A real-time system monitoring and observability dashboard that tracks CPU, memory, and disk usage metrics with alert capabilities.

## 🚀 Features

- Real-time system metrics monitoring
- Interactive dashboard with Charts.js visualizations
- Authentication system with session management
- Metric collection and alerting system
- Log analysis capabilities
- RESTful API endpoints for metrics, alerts, and reports

## 🛠️ Tech Stack

- **Backend**: Node.js with Express.js
- **Frontend**: HTML, JavaScript, Chart.js, TailwindCSS
- **Database**: SQLite3
- **Authentication**: Custom session-based auth with bcrypt
- **Monitoring**: systeminformation library
- **Development**: Nodemon for hot-reloading

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/hmChirag/codexray-observability.git
cd codexray-observability
```

2. Install dependencies:
```bash
npm install
```

3. Start the application:
```bash
npm start
```

For development with hot-reloading:
```bash
npm run dev
```

## 🔑 Environment Variables

Create a `.env` file in the root directory:
```
PORT=5000
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/validate-session` - Validate session token

### System Metrics
- `GET /api/system/metrics` - Get current system metrics

### Reports
- `GET /api/reports/summary` - Get system metrics summary

### Alerts
- `GET /api/alerts` - Get all alerts
- `GET /api/alerts/recent` - Get recent alerts

### Logs
- `GET /api/logs/analyze` - Get log analysis

## 📊 Dashboard

The dashboard is accessible at:
- Main Dashboard: `http://localhost:5000/`
- Login Page: `http://localhost:5000/login.html`
- After login provide the token you got after login in the postman for getting access to the dashboard.

## 🔒 Security

- Password hashing using bcrypt
- Session-based authentication
- Protected API endpoints with middleware verification

## 📁 Project Structure

```
├── public/                 # Static files
├── src/
│   ├── controllers/       # Route controllers
│   ├── dashboard/        # Dashboard frontend
│   ├── data/            # Data storage
│   ├── middlewares/     # Express middlewares
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── utils/          # Utilities
│   └── app.js          # Application entry
```

## 🧪 Testing

Run tests using:
```bash
npm test
```

## 📝 License

ISC