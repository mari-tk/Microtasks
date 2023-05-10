const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  name: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User',
    required: true  
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Job', jobSchema);