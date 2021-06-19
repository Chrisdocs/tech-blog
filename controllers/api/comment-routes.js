const router = require('express').Router();
const { Comment } = require('../../models');

// Get all comments /api/comments
router.get('/', (req, res) => {
    Comment.findAll({})
    .then(commentDbData => res.json(commentDbData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

// Get one comment /api/comments/:id

// Create a comment /api/comments
router.post('/', (req, res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.body.user_id,
        post_id: req.body.post_id
    })
    .then(commentDbData => res.json(commentDbData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    })
})

// Update a comment /api/comments/:id

// Delete a comment /api/comments/:id

module.exports = router;