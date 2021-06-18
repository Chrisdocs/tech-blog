const router = require('express').Router();
const { Post, User } = require('../../models');

// get all posts /api/posts
router.get('/', (req, res) => {
    Post.findAll({
        include: {
            model: User,
            attributes: [ 'username' ]
        }
    })
    .then(postDbData => res.json(postDbData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

// get a single post /api/posts/id
router.get('/posts/:id', (req, res) => {
    Post.findAll({
        where: {
            id: req.params.id
        },
        include: {
            model: User,
            attributes: [
                'username'
            ]

        }
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
})

// create a post /api/posts
router.post('/', (req, res) => {
    Post.create({
        post_title: req.body.post_title,
        post_text: req.body.post_text,
        user_id: req.body.user_id
    })
    .then(postDbData => res.json(postDbData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

// update a post /api/posts/id
router.put('/posts/:id', (req, res) => {
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
router.delete('./posts/:id', (req, res) => {
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
