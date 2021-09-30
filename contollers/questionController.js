// questionController.js
// Import question model
Question = require('../models/questionModel');
Topic = require('../models/topicModel');

// Handle create topic actions
exports.new = async function (req, res) {
    console.log("questionController, new :: ", req.body);
    var question = await new Question({
        question : req.body.question
    }).save();
    var topicId = parseInt(req.body.topic_id);
    await addQuestionToTopic(topicId, question);
    console.log("questionController, new :: topicId", topicId);
    await addTopicToQuestion(question, topicId);
    console.log(question);
    return res.json({
        message: 'New question created!',
        data: req.body
    });
};

const addTopicToQuestion = function(question, topicId) {
    return question.update(
        { $push: { topics: parseInt(topicId) } },
        { new: true, useFindAndModify: false }
    );
  };
  
  const addQuestionToTopic = function(topicId, question) {
    return Topic.findOneAndUpdate(
      { "topicId": parseInt(topicId) },
      { $push: { questions: question._id } },
      { new: true, useFindAndModify: false }
    );
  };