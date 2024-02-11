const express = require("express");
const morgan = require("morgan");
const path = require("path");

const app = express();

app.set('port', process.env.PORT || 3001);

app.use(morgan('dev'));

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));


app.set('views', path.join(__dirname, 'views'));
app.use('/', require('./routes/welcome'))
app.use('/inicio', require('./routes/inicio'))
app.use('/support', require('./routes/support'))

app.use('/login', require('./routes/private/login'))
app.use('/register', require('./routes/private/register'))

app.use('/panzonas/jamie', require('./routes/panzonas/jamie'))
app.use('/panzonas/jamie/happy', require('./routes/panzonas/dev/happy-jijiji'))
app.use('/panzonas/jamie/comments', require('./routes/panzonas/dev/comments-jijiji'))
app.use('/panzonas/luciana', require('./routes/panzonas/luciana'))
app.use('/panzonas/luciana/happy', require('./routes/panzonas/dev/happy-lu'))
app.use('/panzonas/luciana/comments', require('./routes/panzonas/dev/comments-lu'))

app.use((req, res) => {
    res.status(404).send('Página no encontrada');
});

app.listen(app.get('port'), () => {
    console.log(`Servidor en línea en http://localhost:${app.get('port')}`);
}).on('error', (err) => {
    console.error("Error al iniciar el servidor:", err);
});
