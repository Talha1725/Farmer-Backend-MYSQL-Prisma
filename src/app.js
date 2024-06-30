const express = require('express');
const farmerBookRoutes = require('./routes/farmerBookRoutes');
const fieldBookRoutes = require('./routes/fieldBookRoutes');
const analysisRoutes = require('./routes/analysisRoutes');
const getBookByID = require('./routes/getBookByIDs');
const AddField = require('./routes/addField');


const app = express();

app.use(express.json());

app.use('/farmer-book', farmerBookRoutes);
app.use('/field-book', fieldBookRoutes);
app.use('/analysis', analysisRoutes);
app.use('/get-all-books', getBookByID);
app.use('/add-field', AddField);


module.exports = app;
