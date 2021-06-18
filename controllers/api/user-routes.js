const router = require('express').Router();
const { User } = require('../../models');

// Get Users /api/users
router.get('/', (req, res) => {
    User.findAll({})
    .then(userDbData => json(userDbData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

//Get single User /api/users/id
router.get('/:id', (req, res) => {
    User.findAll({
        where: {
            id: req.params.id
        }
    })
    .then(userDbData => {
        if (!userDbData) {
            res.status(404).json({ message: 'No user found with this id.'})
            return;
        }
        res.json(userDbData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});


// Post User /api/users
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(userDbData => res.json(userDbData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});


// Put user /api/user/id
router.put('/:id', (req, res) => {
    User.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(userDbData => {
        if (!userDbData) {
            res.status(404).json({ message: 'No user found with this id. '})
            return;
        }
        res.json(userDbData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});


// Delete user /api/users/id
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(userDbData => {
        if (!userDbData) {
            res.status(404).json({ message: 'No user found with this id.' })
            return;
        }
        res.json(userDbData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;