var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/index', function(req, res, next) {
  console.log(req.body);
    res.send({
      data:req.query
    })
});
router.post('/base/post',(req,res,next) => {
  console.log(req.body);
  res.send({
    data:434
  });
})
module.exports = router;
