// questionController.js
// Import question model
Question = require('../models/questionModel');
Topic = require('../models/topicModel');

// get all questions
exports.index = function (req, res) {
    Question.get(function (err, questions) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Topic retrieved successfully",
            data: questions
        });
    });
};

// Handle create topic actions
exports.new = async function (req, res) {
    console.log("questionController, new :: ", req.body);
    var question = await new Question({
        question : req.body.question
    }).save();
    // save the topic and check for errors
    question.save(function (err) {
        // Check for validation error
        if (err)
            res.json(err);
        else
            res.json({
                message: 'New question created!',
                data: question
            });
    });
};

exports.addToTopic = async function(req, res) {
    var topicId = req.body.topic_id;
    var questionId = req.body.question_id;

    if(!topicId && !isNaN(topicId)) {
        return res.status(401).json({
            message: 'Missing topic id or topic id is not a number'
        });
    }
    if(!questionId) {
        return res.status(401).json({
            message: 'Missing question id'
        });
    }
    await addQuestionToTopic(parseInt(topicId), questionId);
    await addTopicToQuestion(questionId, topicId);
    return res.json({
        message: 'Topic added successfully',
        data: req.body
    });
}

const addTopicToQuestion = function(questionId, topicId) {
    return Question.findOneAndUpdate(
        {"_id": questionId },
        { $push: { topics: parseInt(topicId) } },
        { new: true, useFindAndModify: false }
    );
  };
  
  const addQuestionToTopic = function(topicId, question) {
    return Topic.findOneAndUpdate(
      { "topicId": parseInt(topicId) },
      { $push: { questions: question } },
      { new: true, useFindAndModify: false }
    );
  };