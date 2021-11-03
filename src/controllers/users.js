const User = require('../models/user');
const Rol = require('../models/rol')
const config = require('../config/config');

const jwt = require('jsonwebtoken')

async function signUp(req, res) {
    try {
        const { username, name, lastname, email, phone, adress, password, rol } = req.body;
        const user = new User({
            username, name, lastname, email, phone, adress, password
        });
        if (rol) {
            const foundRol = await Rol.find({ name: { $in: rol } })
            user.rol = foundRol.map(rol => rol._id)
        } else {
            const role = await Rol.findOne({ name: "user" })
            user.rol = [role._id]
        }
        const newUser = await user.save();
        console.log(newUser);

        const token = jwt.sign({ id: newUser._id }, config.SECRET_TOKEN, {
            expiresIn: 86400
        })
        res.json({userToken: token}).status(200);
    } catch (err) {
        console.error(err);
        res.json({ message: err });
    }
};

async function signIn(req, res) {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const userFound = await User.findOne({email:email, password: password}).populate('rol');
        const token = jwt.sign({ id: userFound._id }, config.SECRET_TOKEN, {
            expiresIn: 86400
        })

        if(userFound) {
            res.json({token})
        } else {
            res.send('Email or password are invalid!')
        };
    } catch (error) {
        console.log(error)
    }
};

module.exports = { signUp, signIn };
