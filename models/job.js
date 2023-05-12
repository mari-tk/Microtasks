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
  //job state: active, inactive, inProgress
  state: { 
    type: String,
    enum : ['active', 'inactive', 'inProgress'],
    default: 'active'
  },  
  chosenApplicationId: { 
    type: Schema.Types.ObjectId,
    ref: 'JobApplication',
    default: null
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Job', jobSchema);