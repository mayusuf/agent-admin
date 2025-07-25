# Agent Admin

A professional dashboard for managing and monitoring AI agents, built with React and TypeScript.

**Version:** 1.0.0

## 🌐 Live Demo

**[View Live Demo](https://agent-admin-ten.vercel.app)**

Experience the full functionality of the Agent Admin dashboard with the demo credentials below.

## Demo Credentials

- **Email:** demo@yafitechbd.com
- **Password:** demo

## Features

- 🔹 Agent Overview Panel
- 🔹 Prompt Management
- 🔹 Billing Panel
- 🔹 Performance Metrics
- 🔹 Logs & Interactions
- 🔹 Control Panel
- 🔹 Notification Center
- 🔹 Settings Panel
- 🔹 Language Support: English (EN), Bengali (BN), Spanish (ES), Russian (RU), German (DE), Portuguese (PT)
- 🔹 Sign In (with email/password and social login)
- 🔹 Sign Up (with email/password and social signup)
- 🔹 Forgot Password (password reset via email)

## Tech Stack

- React **18.x**
- TypeScript
- Tailwind CSS
- React Query
- React Router
- i18next
- Recharts
- Zod
- React Hook Form

## 🚀 Installation

### Prerequisites
- [Node.js](https://nodejs.org/) **v16.0.0 or higher** (recommended: v18.x or v20.x)
- [npm](https://www.npmjs.com/) **v8.0.0 or higher** (comes with Node.js)
- [React](https://react.dev/) **v18.x** (installed automatically with dependencies)

Check your versions:
```bash
node -v
npm -v
```

### Steps

1. **Download the source code**
   - If you purchased from a marketplace, extract the ZIP file to your desired location.
   - If using Git:
     ```bash
     git clone <your-repo-url>
     cd Dashboard-AI-Agent
     ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   - The app will be available at [http://localhost:5173](http://localhost:5173) (or another port if 5173 is in use).

4. **Build for production**
   ```bash
   npm run build
   ```
   - To preview the production build:
     ```bash
     npm run preview
     ```

### Troubleshooting

- **Port already in use:** If you see a message like "Port 5173 is in use," the app will start on the next available port (e.g., 5174). Check your terminal for the correct URL.
- **Dependencies not installing:** Make sure you are using a supported Node.js version (`node -v`).

## Project Structure

```
/src
  /components        → Shared UI components
  /features         → Feature-specific components
    /agents         → Agent management
    /prompts        → Prompt management
    /billing        → Billing and metrics
    /logs          → Logs and history
    /settings      → Configuration
    /notifications → Alert system
    /language      → i18n implementation
  /layouts         → Layout components
  /services        → API services
  /utils           → Helper functions
  /i18n            → Translations
  /pages           → Page components
  /hooks           → Custom React hooks
  /icons           → SVG icons
  /constants       → Constants and configs
```

## Development

- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper error handling
- Write unit tests for critical components
- Follow the established folder structure
- Document complex functions with JSDoc

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License 

## Copyright

© 2024 Yafi Tech. All rights reserved. 