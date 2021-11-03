const { Router } = require('express');
const router = Router();
const User = require('../models/user')
const { signUp, signIn} = require('../controllers/users')


router.post('/register', signUp);

router.post('/login', signIn);




module.exports = router;