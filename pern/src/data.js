const express = require("express");
const { Client } = require("pg");
const cors = require("cors");

const app = express();
const port = 3000;

// PostgreSQL database connection configuration
const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "Pavan123",
  database: "project"
});
client.connect();

// Middleware
app.use(express.json());
app.use(cors());

// Endpoint to fetch customer data from PostgreSQL
app.get("/", async (req, res) => {
  try {
    const query = "SELECT * FROM customer";
    const result = await client.query(query);
    const customers = result.rows;
    // console.log(customers);
    res.json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});