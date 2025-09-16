const workRouter = require("express").Router();
const { getPastOrders } = require("../Controller/workController");

workRouter.get('/get-past-order',getPastOrders);

module.exports = workRouter;
