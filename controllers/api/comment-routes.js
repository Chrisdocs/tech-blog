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

router.post('/', (req, res) => {
    // check the session
    if (req.session) {
        Comment.create({
                comment_text: req.body.comment_text,
                post_id: req.body.post_id,
                // use the id from the session
                user_id: req.session.user_id
            })
            .then(dbCommentData => res.json(dbCommentData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
});

// Update a comment /api/comments/:id

// Delete a comment /api/comments/:id

module.exports = router;