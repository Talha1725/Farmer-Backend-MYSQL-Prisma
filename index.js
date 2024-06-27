const app = require('./src/app');
require('dotenv').config();

const PORT = process.env.PORT || 3002;
app.listen(PORT, '0.0.0.0', () => {
	console.log(`Server is running on port ${PORT}`);
});