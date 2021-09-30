// api-routes.js
// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Pencil Backend system',
    });
});

// Import topic controller
var topicController = require('./contollers/topicController');
var questionController = require('./contollers/questionController');

// Topic routes
router.route('/topics')
    .get(topicController.index)
    .post(topicController.new);

router.route('/topics/:topic_id')
    .get(topicController.view)
    .patch(topicController.update)
    .put(topicController.update)
    .delete(topicController.delete);

// Question routes
router.route('/questions')
    .post(questionController.new);


// Export API routes
module.exports = router;