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


## sample outputs as below
-Register as a user
<img width="1428" height="724" alt="Screenshot 2025-11-04 235818" src="https://github.com/user-attachments/assets/26010759-4e5a-452f-9261-e855455195ee" />


-Log in to the user account
<img width="1437" height="643" alt="Screenshot 2025-11-04 235937" src="https://github.com/user-attachments/assets/1ecabfb3-a01d-46e9-8450-0dc373e85396" />

-Open the browser and go to the login.html endpoint, and login to the created account
<img width="1835" height="882" alt="Screenshot 2025-11-05 000010" src="https://github.com/user-attachments/assets/d3eee1de-0054-4c39-b348-ae1517171d6b" />

-After login, enter the token you got from the login in Postman
<img width="1510" height="476" alt="Screenshot 2025-11-05 000021" src="https://github.com/user-attachments/assets/02ebab84-0af0-41f3-a288-b72cbd3b8c19" />

-Analyze the metric in Postman
<img width="1407" height="875" alt="Screenshot 2025-11-04 235909" src="https://github.com/user-attachments/assets/454f764c-7f08-42b1-b82f-7137a1a9e8f4" />

-Dashboard after successful login looks as follows
<img width="1079" height="871" alt="Screenshot 2025-11-05 000040" src="https://github.com/user-attachments/assets/144d4b1a-a657-4b18-a8d8-317ba2321f05" />
<img width="961" height="875" alt="Screenshot 2025-11-05 000054" src="https://github.com/user-attachments/assets/c6a72c07-1981-48c9-8861-d97b333eb3aa" />



