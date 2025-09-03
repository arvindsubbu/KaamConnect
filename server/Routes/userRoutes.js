const userRouter = require('express').Router();
const authMiddleware = require('../Middleware/authMiddleware')
const {addUser,loginUser,getCurrentUser} = require('../Controller/userController');

userRouter.post('/signup', addUser);
userRouter.post('/login',loginUser);
userRouter.get('/get-current-user',authMiddleware,getCurrentUser);

module.exports = userRouter;