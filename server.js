const express = require('express');
const connectDB = require('./config/db');
const app = express();
const cors = require('cors');

connectDB();
app.use(cors());
app.use(express.json());
app.use('/api/users',require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/note',require('./routes/api/note'));

const Port = process.env.Port || 5000;

app.listen(Port, () =>console.log(`Server started on port ${Port}`));
