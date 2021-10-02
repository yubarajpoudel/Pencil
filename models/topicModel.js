// topicModel.js
var mongoose = require('mongoose');
// Setup schema
var topicsSchema = mongoose.Schema({
    name: {
        type: String,
        index:true,
        unique:true,
        required: true
    },
    parentEntity: {
        type: String,
        required: false
    },
    active: {
        type:Boolean,
        default: true
    },
    questions: [
        {
          type: String,
          ref: "Question"
        }
      ],
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export Topic model
var Topic = module.exports = mongoose.model('topics', topicsSchema);
module.exports.get = function (callback, limit) {
    Topic.find(callback).limit(limit);
}