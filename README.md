
# web-app-assignment

This project is a full-stack web application consisting of a **Vue.js** client and a **Node.js** backend. The client and server are separated into different subdirectories: `/client` and `/server`.

## Project Structure

```
/project-root
  ├── /client          # Frontend code (Vue.js)
  │   ├── /node_modules
  │   ├── /dist
  │   └── /public
  ├── /server          # Backend code (Node.js)
  │   ├── /node_modules
  │   ├── /dist
  │   ├── /logs
  │   └── /public
  ├── .gitignore
  ├── README.md
  ├── package.json
```

### `/client` - Vue.js App

- This folder contains the frontend code written using **Vue.js**.
- The app is built using the **Vue CLI**, and you can modify the source code in the `/src` directory.

### `/server` - Node.js Backend

- This folder contains the backend code written using **Node.js**.
- The backend listens for requests on port `8088` (or as specified in the backend code).
- The `/server` directory also contains any environment configuration files (`.env`), logs, and other necessary backend-related files.

### Prerequisites

Before getting started, ensure you have the following software installed:

- **Node.js** (version 14.x or later)
- **npm** (Node Package Manager, comes with Node.js)
- **Vue CLI** (for the frontend, if not installed already)

To check if you have Node.js installed, run:

```bash
node -v
```

To check if you have npm installed, run:

```bash
npm -v
```

To check if you have Vue CLI installed, run:

```bash
vue --version
```

If you don’t have Vue CLI installed, you can install it globally with:

```bash
npm install -g @vue/cli
```

## Installation

### Setting up the Client (Vue.js App)

1. Navigate to the `/client` directory:

   ```bash
   cd client
   ```

2. Install the dependencies for the client:

   ```bash
   npm install
   ```

3. Start the development server for the Vue.js app:

   ```bash
   npm run dev
   ```

   This will start the frontend development server, and you can view the app in your browser by navigating to `http://localhost:8080` (or whichever port is specified in the Vue app configuration).

### Setting up the Server (Node.js Backend)

1. Navigate to the `/server` directory:

   ```bash
   cd ../server
   ```

2. Install the dependencies for the backend:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   npm run start
   ```

   This will start the Node.js backend server, and the server will be available at `http://localhost:8088` (or whichever port is specified in the backend configuration).

## Development Workflow

### Running Both Client and Server

1. **In one terminal window**: Run the Vue.js development server from the `/client` directory:

   ```bash
   cd client
   npm run dev
   ```

2. **In another terminal window**: Run the Node.js server from the `/server` directory:

   ```bash
   cd server
   npm run start
   ```

Now, you should have both your frontend and backend running locally. The Vue.js app will communicate with the backend server via API requests (typically on `http://localhost:8088`).

## Deployment

When you're ready to deploy your app:

- For the **client** (Vue.js), you can build the production version of the app:

  ```bash
  cd client
  npm run build
  ```

  This will generate the production-ready files in the `/client/dist` folder.

- For the **server** (Node.js), you can deploy the server as a production app. If you're using a platform like **Heroku**, **DigitalOcean**, or **AWS**, you can follow their specific deployment documentation for Node.js apps.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
