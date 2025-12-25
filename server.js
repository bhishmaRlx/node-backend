require('dotenv').config(); // MUST be first

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

require('./config/db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/customers', require('./routes/customer.routes'));
app.use('/api/auth', require('./routes/auth.routes'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(
    'Server running..'+PORT
  );

});
