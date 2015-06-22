var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/eventlist', function(req, res, next) {
	
	var db = req.db;
    var collection = db.get('events');
    collection.find({},{},function(e,docs){
        res.render('eventlist', {
            "eventlist" : docs
        });
    });
	
}

module.exports = router;
