const express = require('express');
const router = express.Router();
const axios = require('axios');
const { hidePublicRoutes } = require('./../common/authorization');

/* GET home page. */
router.get('/', hidePublicRoutes, (req, res) => {
    axios.get('http://localhost:8010/api/appointments')
        .then(appointments => {
            res.render('index', response = {
                title: 'Welcome | Old St. Bookings'
            });
        })
        .catch(err => {
            console.error(err);
        });
});

module.exports = router;