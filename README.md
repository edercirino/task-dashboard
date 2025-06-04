# Task Dashboard 🧩

A modern and responsive **task and user dashboard** built with **React** and styled using **Tailwind CSS**.  
This frontend interfaces with a secure Ruby on Rails API to manage users, authentication, and task control, featuring clean UX and role-based UI behavior.

**This front-end application belongs to this [back-end project](https://github.com/edercirino/task-dashboard-api)**

## Table of Contents 📚

- [Features 🚀](#features-)
- [Tech Stack 💻](#tech-stack-)
- [Getting Started 🛠](#getting-started-)
- [Usage ⚙️](#usage-)
- [Environment Variables ⚙️](#environment-variables-)
- [Authentication Flow 🔐](#authentication-flow-)
- [Author 👤](#author-)

## Features 🚀

- JWT-based login and session handling 🔐
- Role-based dashboards (admin/user) 📋
- Admin dashboard:
  - View all users
  - Create, edit, and delete users
- User dashboard:
  - View and edit own profile
- Protected routes using client-side guards 🛡️
- Token auto-attach via Axios interceptor
- Responsive and elegant UI using Tailwind CSS 🌈

## Tech Stack 💻

<span href="tech-stack"></span>

- **React** – SPA framework
- **React Router** – Routing and navigation
- **Tailwind CSS** – Styling and design
- **JWT** – Auth strategy
- **Vite** – Development tooling
- **Vercel** – Deployment (optional)

## Getting Started 🛠

<span href="getting-started"></span>

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/task-dashboard.git
   cd task-dashboard
   ```

2. Install dependencies:

```
npm install
```

3. Create a `.env` file at the root with the following:

```
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

4. Run the development server:

```
npm run dev
```

5. Open your browser and visit `http://localhost:5173`

## Usage ⚙️

<span href="usage"></span>

### Admin Panel 👑

- View all registered users
- Create new users (admin or standard)
- Edit or delete existing users (except master admin)

### User Panel 👤

- View personal info
- Edit personal details
- No access to other users

### Navigation 🔄

The interface adapts to user roles dynamically after login. Admins have additional routes and controls.

## Environment Variables ⚙️

<span href="environment-variables"></span>

| Variable          | Description                        |
| ----------------- | ---------------------------------- |
| VITE_API_BASE_URL | Base URL for your Rails API server |

## Authentication Flow 🔐

<span href="authentication-flow"></span>

1. User logs in and receives a JWT token.
2. Token is saved in localStorage.
3. All API requests automatically include the token via Fetch interceptor.
4. On logout, token is cleared and routes are restricted again.

<a href="https://www.linkedin.com/in/edercirino/">
<img style="border-radius: 50%;" src="https://avatars3.githubusercontent.com/u/25642656" width="100px" alt=""/>
<br />

<span href="author"></span>

<sub><b>Éder Cirino</b></sub></a>

Made with ❤️ for Éder Cirino 👋 Get in touch

[![Linkedin Badge](https://img.shields.io/badge/-Éder-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/edercirino/)](https://www.linkedin.com/in/edercirino/)
