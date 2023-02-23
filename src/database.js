const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

/*
A partir de la versión 12.x de Node, apuntar a localhost en cualquier recurso de red, 
realiza la conversión a IPv6 si esta está disponible en tu adaptador. Cambia la URI por 
mongodb://127.0.0.1:27017
*/

mongoose.connect('mongodb://127.0.0.1:27017/angular-auth', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('Database is Connected'))
    .catch(err => console.log('Error connecting to database:', err));

