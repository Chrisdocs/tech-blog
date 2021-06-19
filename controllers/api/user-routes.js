const router = require('express').Router();
const { User } = require('../../models');

// Get Users /api/users
router.get('/', (req, res) => {
    User.findAll({
        attributes: {
            exclude: ['password']
        }
    })
    .then(userDbData => res.json(userDbData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

//Get single User /api/users/id
router.get('/:id', (req, res) => {
    User.findAll({
        attributes: {
            exclude: ['password']
        },
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
    .then(userDbData => {
        req.session.save(() => {
            req.session.user_id = userDbData.id;
            req.session.username = userDbData.username;
            req.session.loggedIn = true;

            res.json(userDbData)
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(userDbData => {
        if (!userDbData) {
            res.status(400).json({ message: 'No user found with that email.' })
            return;
        }
        const validPassword = userDbData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }
        req.session.save(() => {
            req.session.user_id = userDbData.id;
            req.session.username = userDbData.username;
            req.session.loggedIn = true;

            res.json({ user: userDbData, message: 'You are now logged in!' });
        })
    }) 
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
})


// Put user /api/user/id
router.put('/:id', (req, res) => {
    User.update(req.body, {
        individualHooks: true,
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