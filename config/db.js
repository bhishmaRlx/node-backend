const mongoose = require('mongoose');

if(!process.env.MONGO_URI){
  console.error('MongoDB connection detail error');    
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
module.exports = mongoose;




/*
cloud.mongo.db credential

bhishmarlx_db_user
Y5T4Aw7n2dIXZivj

*/