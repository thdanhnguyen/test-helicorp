const express = require('express');
const cors = require('cors');
require('dotenv').config();

const newsletterRoutes = require('./routes/newsletterRoutes');
const chatRoutes = require('./routes/chatRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', newsletterRoutes);
app.use('/api', chatRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
