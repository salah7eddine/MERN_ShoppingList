const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const items = require('./routes/api/items');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MOngo
mongoose.connect(db, {
  useNewUrlParser: true
})
  .then(() => console.log('MongoDB Connected ...'))
  .catch(err => console.log(err));

  
  const port = process.env.PORT || 5000;
  
  // Cors Middleware
  // app.use(cors());
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accespt, Authorization');
    if(req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }
    next();
  });

  // Use Routes
  app.use('/api/items', items);

  // Serve static assets if in production
  if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
      res.sendStatus(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

  

app.listen(port, () => console.log(`Server started on port ${port}.`));

// npm cache clean --force

