const express = require('express');
const getFieldBookByIDs = require('./routes/getFieldBookByIDs');
const farmerBookRoutes = require('./routes/farmerBookRoutes');
const fieldBookRoutes = require('./routes/fieldBookRoutes');
const analysisRoutes = require('./routes/analysisRoutes');
const FarmerIDs = require('./routes/farmer_savi_ids');
const getBookByID = require('./routes/getBookByIDs');
const AddField = require('./routes/addField');


const app = express();

app.use(express.json());

app.use('/add-field', AddField);
app.use('/analysis', analysisRoutes);
app.use('/get-all-books', getBookByID);
app.use('/field-book', fieldBookRoutes);
app.use('/get-all-farmer-id', FarmerIDs);
app.use('/farmer-book', farmerBookRoutes);
app.use('/get-field-book-id', getFieldBookByIDs);


module.exports = app;
