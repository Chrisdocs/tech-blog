const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

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

router.post('/', withAuth, (req, res) => {
    // check the session
    if (req.session) {
        Comment.create({
                comment_text: req.body.comment_text,
                post_id: req.body.post_id,
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
router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData => res.json(dbCommentData))
})

module.exports = router;