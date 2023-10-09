const express = require('express');
const router = express.Router(); // object to handle requests

router.get('/', (req,res) => {
    res.render('index'); // renders the index ejs file
});

module.exports = router;