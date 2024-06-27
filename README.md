# Farmer Backend with MySQL and Prisma

Welcome to the Farmer Backend repository. This backend system is designed to manage and process data for farmers collected from our offline application. The system uses MySQL for the database and Prisma as the ORM (Object-Relational Mapping) tool.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This backend system is developed to manage the data of farmers collected through our offline application. The backend is built using Node.js with Prisma as the ORM for MySQL. The server runs on port 3002.

## Features

- Manage farmer data efficiently
- Seamless integration with MySQL database using Prisma
- Robust and scalable architecture
- Easy to configure and deploy

## Installation

To get started with this project, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Talha1725/Farmer-Backend-MYSQL-Prisma.git
   cd Farmer-Backend-MYSQL-Prisma
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Setup the environment variables:**

   Create a `.env` file in the root directory and add your MySQL database credentials:

   ```env
   DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
   ```

4. **Run the Prisma migrations:**

   ```bash
   npx prisma migrate dev
   ```

## Configuration

Ensure your `.env` file is properly configured with your MySQL database credentials.

Example:

```env
DATABASE_URL="mysql://username:password@localhost:3306/farmerdb"
```

## Usage

To start the server, run:

```bash
npm start
```

The server will run on port 3002.

## API Endpoints

Here are the key API endpoints available:

- **Field Book**
  - `GET /field-book` - Retrieve all field book data
  - `POST /field-book` - Add new field book data

- **Farmer Book**
  - `GET /farmer-book` - Retrieve all farmer book data
  - `POST /farmer-book` - Add new farmer book data

- **Analysis**
  - `POST /analysis` - Submit analysis data

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License.

---

Thank you for using the Farmer Backend. If you have any questions or need further assistance, feel free to open an issue or contact the repository owner.
