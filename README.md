# SYMBOLIX ERP FRONTEND

## Overview

The Symbolix ERP is a web application that allows users to manage their business operations.

## Prerequisites

Before starting development or deployment, ensure you have the following:

1. Requirements:

- Node.JS Already Installed
- NPM Already Installed
- Git Already Installed
- .env file

2. Create .env file in the root directory of the project and add the following:

```bash
NEXT_PUBLIC_UAM_SERVICES="ENDPOINT OF THIS SERVICES"
NEXT_PUBLIC_CORE_SERVICES="ENDPOINT OF THIS SERVICES"
NEXT_PUBLIC_INVENTORY_SERVICES="ENDPOINT OF THIS SERVICES"

NEXTAUTH_SECRET="ENCRYPTION KEY FOR ENCRYPT USER SESSION"
NEXTAUTH_URL="ENDPOINT TO THIS SERVICES"

```

3. NEXTAUTH_SECRET: A secret key for NextAuth.

- To generate a secret key, run the following command in the terminal:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

- Copy the generated key and paste it in the .env file as the value for NEXTAUTH_SECRET.

4. NEXTAUTH_URL: The URL where the application is deployed.

- If you are running the application locally, set the value to `http://localhost:3000`.
- If you are deploying the application, set the value to the deployed URL.

To deploy the application,

1. Clone the repository.

```bash
git clone https://github.com/Deepsymbolics-Indonesia/symbolix-erp-fe.git
```

2. run the following command to install the dependencies:

```bash
npm install
```

3. run the following command to build the application:

```bash
npm build
```

5. Development:

- run the following command to start the development server:

```bash
npm dev
```

6. Production:

- run the following command to start the production server:

```bash
npm build
npm start
```
