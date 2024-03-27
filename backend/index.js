require('dotenv').config();

const cors = require('cors');
const express = require('express');
const { default: mongoose } = require('mongoose');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user');

// Express app
const app = express();

// middleware
app.use(express.json());

app.use(cors());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Parse incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/user', userRoutes);

mongoose.set('strictQuery', false);

// connect to DB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    // Listen for request
    app.listen(process.env.PORT, () => {
      console.log('Connected to DB Listening on port ', process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

process.env;
