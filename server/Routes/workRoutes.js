const workRouter = require("express").Router();
const authMiddleware = require('../Middleware/authMiddleware')
const { getOrders } = require("../Controller/workController");

workRouter.get('/',authMiddleware,getOrders);

module.exports = workRouter;
