# The Grind Diary (React Application)

## Overview

The Grind Diary is a React-based web application designed for users to document their personal and professional journeys in real-time. It allows users to create diary entries, track key metrics, and reflect on their progress. This application utilizes Vite for a fast development experience and React Router for navigation. Currently, user authentication and data persistence are mocked for development and demonstration purposes.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   **Node.js:** Ensure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/). This will also install npm (Node Package Manager).
*   **(Optional) Yarn:** If you prefer Yarn, ensure it's installed globally.

### Installation

1.  Clone the repository (if applicable) or navigate to the project directory.
2.  Install the dependencies:
    ```bash
    npm install
    ```
    or if you are using Yarn:
    ```bash
    yarn install
    ```

### Running the Development Server

1.  To start the development server, run:
    ```bash
    npm run dev
    ```
    or with Yarn:
    ```bash
    yarn dev
    ```
2.  Open your browser and navigate to the URL provided by Vite (typically `http://localhost:5173` or similar). The server supports Hot Module Replacement (HMR) for a smooth development workflow.

## Using the Application

### Authentication

*   The application features mock **Login** and **Signup** pages.
*   Navigate to `/login` or `/signup` to view these pages.
*   Currently, authentication is simulated and does not persist user data.

### Creating Entries

1.  From the Home Page, click on the "**Create New Diary Entry**" link in the navigation.
2.  This will take you to the `/create-entry` page.
3.  Fill in the "Content" and optional "Key Metrics" for your diary entry.
4.  Click "**Submit Entry**". The entry will be logged (currently to the console and in-memory mock service).

### Viewing Entries

*   **Home Page (`/`):** Displays a list of all diary entries created during the current session.
*   **Profile Page (`/profile`):** Also displays a list of all diary entries (in a real application, this would be specific to the logged-in user).
*   Entries are displayed using `DiaryCard` components, showing content, metrics, and the date logged.

## Available Scripts

In the project directory, you can run the following scripts:

*   `npm run dev`: Runs the app in development mode with HMR.
*   `npm run build`: Builds the app for production to the `dist` folder.
*   `npm run lint`: Lints the project files (if ESLint is configured and a lint script is present in `package.json`).
*   `npm run preview`: Serves the production build locally for preview.
*   `npm test`: Runs the test suite using Vitest (if tests are configured).

*(Note: Check `package.json` for the exact list of scripts and their definitions.)*

## Development Notes & Vite Platform Information

This project was bootstrapped with Vite and uses the React plugin.

### React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
---

Happy Grinding!
