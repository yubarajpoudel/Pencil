// questionModel.js
var mongoose = require('mongoose');
// Setup schema
var questionSchema = mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    topics: [
        {
          type: String,
          ref: "Topic"
        }
      ],
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export Question model
var Question = module.exports = mongoose.model('questions', questionSchema);
module.exports.get = function (callback, limit) {
    Question.find(callback).limit(limit);
}