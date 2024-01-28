const express = require("express");
const morgan = require("morgan");
const path = require("path");

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(__dirname + '/public'));

app.use('/', require('./routes/welcome'))
app.use('/panzonas/jamie', require('./routes/jamie'))
app.use('/panzonas/luciana', require('./routes/luciana'))

app.use((req, res) => {
    res.status(404).send('Página no encontrada');
});

app.listen(app.get('port'), () => {
    console.log(`Servidor en línea en http://localhost:${app.get('port')}`);
}).on('error', (err) => {
    console.error("Error al iniciar el servidor:", err);
});
