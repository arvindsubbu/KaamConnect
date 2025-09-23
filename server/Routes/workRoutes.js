const workRouter = require("express").Router();
const { getOrders } = require("../Controller/workController");

workRouter.get('/',getOrders);

module.exports = workRouter;
