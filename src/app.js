const express = require('express');
const farmerBookRoutes = require('./routes/farmerBookRoutes');
const fieldBookRoutes = require('./routes/fieldBookRoutes');
const analysisRoutes = require('./routes/analysisRoutes');

const app = express();

app.use(express.json());

app.use('/farmer-book', farmerBookRoutes);
app.use('/field-book', fieldBookRoutes);
app.use('/analysis', analysisRoutes);

module.exports = app;
