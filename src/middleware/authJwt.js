const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/user');
const Rol = require('../models/rol');

async function verifyToken(req, res, next) {
    try{
        const token = req.headers.token;
    
        if (!token) return res.status(404).json({ message: 'Not user found' });
    
        const decoded = jwt.verify(token, config.SECRET_TOKEN)
        console.log(decoded);
        req.userId = decoded.id;
    
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json('User not Found');
    
        next()

    } catch (err) {
        console.error(err)
    }
};


async function authAdmin (req,res,next) {
    const user = await User.findById(req.userId);
    const roles = await Rol.find({_id: {$in: user.rol}});

    for(let i = 0; i < roles.length; i++) {
        if(roles[i].name === "admin") {
            next();
            return;
        }
    }
    return res.status(403).json('Not allowed');
}


module.exports = { verifyToken, authAdmin };