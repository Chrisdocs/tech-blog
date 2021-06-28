const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const { sequelize } = require('../../models/comment-model');
const withAuth = require('../../utils/auth');

// get all posts /api/posts
router.get('/', (req, res) => {
    Post.findAll({
        order: [['created_at', 'DESC']],
        attributes: [
            'id',
            'post_title',
            'post_text',
            'user_id',
            'created_at',
            'updated_at'
        ],
        include: [
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment_text',
                    'user_id',
                    'post_id',
                    'created_at'
                ],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(postDbData => {
        res.json(postDbData);
        console.log('This is the post DATA=======>>>>>>>>', postDbData);
    } )
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

// get a single post /api/posts/id
router.get('/:id', (req, res) => {
    Post.findAll({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'post_title',
            'post_text',
            'user_id',
            'created_at',
            'updated_at'
        ],
        include: [
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment_text',
                    'user_id',
                    'post_id',
                    'created_at'
                ],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(postDbData => {
        if (!postDbData) {
            res.status(404).json({ message: 'No user found with this id.'})
            return;
        }
        res.json(postDbData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// create a post /api/posts
router.post('/', withAuth, (req, res) => {
    Post.create({
        post_title: req.body.post_title,
        post_text: req.body.post_text,
        user_id: req.session.user_id,
    })
    .then(postDbData => res.json(postDbData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

// update a post /api/posts/id
router.put('/:id', withAuth, (req, res) => {
    Post.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(postDbData => {
        if (!postDbData) {
            res.status(404).json({ message: 'No post found with this id.' })
            return;
        }
        res.json(postDbData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

// delete a post /api/posts/id
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(postDbData => {
        if (!postDbData) {
            res.status(404).json({ message: 'No post found with that id.' })
        }
        res.json(postDbData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;
