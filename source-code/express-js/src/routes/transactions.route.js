const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth/authJWT.js");
const getAllTransactions = require('../controllers/transactionController/getAllTransactions.js');
const getUserTransaction = require('../controllers/transactionController/getUserTransaction.js');
const getUserTransactionId = require('../controllers/transactionController/getUserTransactionId.js');
const getSingleTransaction = require('../controllers/transactionController/getSingleTransaction.js');
const createTransaction = require('../controllers/transactionController/createTransaction.js');
const updateTransaction = require('../controllers/transactionController/updateTransaction.js');
const deleteTransaction = require('../controllers/transactionController/deleteTransaction.js');

router.get("/user-transactions", verifyToken, getUserTransaction);
router.get("/user-transactions/:userId", verifyToken, getUserTransactionId);
router.get("/", verifyToken, getAllTransactions);
router.get("/:transactionId", verifyToken, getSingleTransaction);
router.post("/", verifyToken, createTransaction);
router.put("/:transactionId", verifyToken, updateTransaction);
router.delete("/:transactionId", verifyToken, deleteTransaction);

module.exports = router;