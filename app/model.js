// MySQL Setup
const mysql = require("mysql2");
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  //   host: "127.0.0.1",
  //   port: "33306",
  //   user: "root",
  //   password: "password!",
  //   database: "APP",

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
const promisePool = pool.promise();

const updateOrder = async (id, status) => {
  const orders = await promisePool.query(
    "UPDATE `ORDER` SET status = ? WHERE id = ? AND status = 'UNASSIGNED'",
    [status, id]
  );

  return orders;
};

const getOrdersByPageAndLimit = async (page, limit) => {
  const offset = (page - 1) * limit;
  const orders = await promisePool.query(
    "SELECT * FROM `ORDER` ORDER BY id ASC LIMIT ?, ?",
    [offset, limit]
  );

  return orders;
};

const createOrder = async (distance) => {
  const orders = await promisePool.query(
    "INSERT INTO `ORDER` (distance) VALUES (?)",
    [distance]
  );

  return orders;
};

const getOrderById = async (id) => {
  const orders = await promisePool.query(
    "SELECT * FROM `ORDER` WHERE id = ?",
    [id]
);

  return orders;
};

module.exports = {
  updateOrder,
  getOrdersByPageAndLimit,
  createOrder,
  getOrderById,
};
