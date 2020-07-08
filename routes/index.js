const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  const currentUser = req.session.currentUser;
  res.render('index', {currentUser});
});

router.get('/about', (req,res) => {
  res.render('about')
})

module.exports = router;
