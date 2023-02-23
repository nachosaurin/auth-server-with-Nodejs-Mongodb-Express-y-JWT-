const { Router } = require('express');
const router = Router();

const User = require('../models/User');

const jwt = require('jsonwebtoken');
//const e = require('express');

router.get('/', (req, res) => res.send('Hello World'))

router.post('/signup', async (req, res)=>{
    const { email, password } = req.body;
    const newUser = new User ({email, password});
    await newUser.save();
    
    const token = jwt.sign({ _id: newUser._id }, 'secretkey')
    res.status(200).json({token})

})


router.post('/signin', async (req, res) => {
   const {email, password} = req.body;
   
   const user = await User.findOne({email})
   if (!user) return res.status(401).send("The email doesn't exist!");
   if (user.password !== password) return res.status(401).send("Wrong Password!");

   const token = jwt.sign({ _id: user._id}, 'secretkey');
   return res.status(200).json({token});
})

router.get('/tasks', (req, res) => {
    res.json ([
        {
        _id: 1,
        name:'Task one',
        description: "Hola como estas. Tarea 1",
        date: "12/12/2003"
    },
    {
        _id: 2,
        name:'Task two',
        description: "Hola como estas. Tarea 1",
        date: "12/12/2003"
    },
    {

        _id: 3,
        name:'Task three',
        description: "Hola como estas. Tarea 1",
        date: "12/12/2003"
    }
])
})

router.get('/private-tasks', verifyToken, (req, res) =>{
    res.json ([
        {
        _id: 1,
        name:'Task one',
        description: "Hola como estas. Tarea 1",
        date: "12/12/2003"
    },
    {
        _id: 2,
        name:'Task two',
        description: "Hola como estas. Tarea 1",
        date: "12/12/2003"
    },
    {

        _id: 3,
        name:'Task three',
        description: "Hola como estas. Tarea 1",
        date: "12/12/2003"
    }
])
})

router.get('/profile', verifyToken, (req, res) => {
    res.send(req.userId);
})

module.exports = router;

function verifyToken (req, res, next){
    if (!req.headers.authorization){
        return res.status(401).send('Unauthorize Request');
    }
    const token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unauthorize Request');
    }

    const payload = jwt.verify(token, 'secretkey')
    req.userId = payload._id;
    next();
    
}
