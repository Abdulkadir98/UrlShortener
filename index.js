const express = require('express');
const app = express();
const connectDB = require('./config/db');

app.use(express.json({extended: true}));

const PORT = 3000

// connect to database
connectDB();

// define routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));
app.listen(PORT, () => {

}); console.log(`Server running on port ${PORT}`);