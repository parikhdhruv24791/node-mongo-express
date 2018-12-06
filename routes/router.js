const router = require('express').Router();
const userController = require('../controllers/userController');
const auth = require('./auth');



//POST new user route (optional, everyone has access)
router.post('/api/users', auth.optional, userController.createUser);

//POST login route (optional, everyone has access)
router.post('/api/users/login', auth.optional, userController.loginUser);

//GET current route (required, only authenticated users have access)
router.get('/api/users/current', auth.required, userController.getCurrentUser);


// router.post('/api/user', (req, res, next) => {
//     console.log("POST");
//     console.log(req.body);
//     res.send({});
// });

module.exports = router;