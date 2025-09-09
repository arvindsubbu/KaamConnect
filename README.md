# KaamConnect

**KaamConnect** is a platform that connects service providers with consumers.  
It provides role-based access for **Consumers, Providers, and Admins** to manage services, bookings, and interactions.

---

## 🚀 Key Features
- **Role-based Signup/Login** – Separate dashboards for Consumers, Providers, and Admins  
- **Provider Dashboard** – Add services, set pricing, update availability  
- **Consumer Dashboard** – Search, filter, and book providers  
- **Admin Dashboard** – Monitor users and providers  

---

## 🛠 Tech Stack
- **Frontend:** React.js, Tailwind CSS, Ant Design (AntD)  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose)  
- **State Management:** Redux  

---

## ⚙️ Setup Instructions

```bash
# Clone repo
git clone https://github.com/arvindsubbu/KaamConnect
cd KaamConnect

# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install

# Run the app
# Terminal 1: Frontend
cd ../client
npm run dev

# Terminal 2: Backend
cd ../server
npm start

👉 Frontend runs on http://localhost:5173
👉 Backend runs on http://localhost:5000
