// topicController.js
// Import topic model
Topic = require('../models/topicModel');
// Handle index actions
exports.index = function (req, res) {
    Topic.find({"active": true}, function (err, topics) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Topic retrieved successfully",
            data: topics
        });
    });
};
// Handle create topic actions
exports.new = function (req, res) {
    console.log("topicController, new :: ", req.body);
    var topic = new Topic({
        active: req.body.active ? req.body.active : true,
        parentEntity : req.body.parent_entity ? req.body.parent_entity : "",
        name : req.body.name
    });
// save the topic and check for errors
    topic.save(function (err) {
        // Check for validation error
        if (err)
            res.json(err);
        else
            res.json({
                message: 'New Topic created!',
                data: topic
            });
    });
};
// Handle view topic info
exports.view = function (req, res) {
    console.log(req.params.topic_id);
    Topic.find({"topicId": parseInt(req.params.topic_id)}, function (err, topic) {
        if (err)
            res.send(err);
        res.json({
            message: 'Topic details loading..',
            data: topic
        });
    });
};
// Handle update topic info
exports.update = function (req, res) {
    Topic.findOne({"topicId" : parseInt(req.params.topic_id)}, function (err, topic) {
        if (err)
            res.send(err);
        topic.name = req.body.name ? req.body.name : topic.name;
        if(req.body.active) { 
            topic.active = req.body.active;
        }
        topic.parentEntity = req.body.parent_entity ? topic.body.parent_entity : topic.parentEntity;
// save the topic and check for errors
        topic.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'topic Info updated',
                data: topic
            });
        });
    });
};
// Handle delete topic
exports.delete = function (req, res) {
    Topic.remove({
        topicId: parseInt(req.params.topic_id)
    }, function (err, topic) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Topic deleted'
        });
    });
};

// handle subtopic
exports.addToTopic = async function(req, res) {
    var childTopicId = req.body.child_topic;
    var parentTopicId = req.body.parent_topic;
    if(childTopicId && parentTopicId) {
        var topic = await addSubTopicToTopic(childTopicId, parentTopicId);
        res.json({
            status: "success",
            "message": "subtopic added successfully"
        })
    } else {
        return res.status(401).json({"message": "parent id or child id is missing"});
    }

}

// add subtopic to topic
const addSubTopicToTopic = function(childTopicId, parentTopicId) {
    return Topic.findByIdAndUpdate(
        childTopicId,
      { parentEntity: parentTopicId },
      function (err, docs) {
        if (err){
          console.log(err)
        }
        else{
           console.log("Updated Topic : ", docs);
        }
    });
}
