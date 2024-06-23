const express = require('express');
const farmerBookRoutes = require('./routes/farmerBookRoutes');
const fieldBookRoutes = require('./routes/fieldBookRoutes');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/farmer-book', farmerBookRoutes);
app.use('/field-book', fieldBookRoutes);

module.exports = app;
