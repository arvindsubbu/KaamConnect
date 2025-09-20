const workRouter = require("express").Router();
const { getOrders } = require("../Controller/workController");

workRouter.get('/orders',getOrders);

module.exports = workRouter;
