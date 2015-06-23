var express = require('express');
var router = express.Router();
//var events = require('./events')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/events', function(req, res, next) {
	
	var db = req.db;
    var collection = db.get('events');
    collection.find({},{},function(e,item){
        res.send(item);
    });
	
});

router.get('/events/:id', function(req, res) {
	var db = req.db;
    var id = req.params.id;
    var collection = db.get('events');
    console.log('Retrieving event: ' + id);
    collection.findOne({'_id':id}, function(err, item) {
        res.send(item);
    });
});

router.get('/newevent', function(req, res) {
    res.render('newevent', { title: 'Add New Event' });
});

router.get('/searcheventspartial/:keyword', function(req, res) {
	var db = req.db;
    var keyword = req.params.keyword;
    var collection = db.get('events');
    console.log('Searching events with keyword: ' + keyword);
	collection.find({'title': new RegExp("^"+keyword, 'i')}, {}, function(err, item) {
		res.send(item);
    });

});

router.get('/searchevents/:keyword', function(req, res) {
    var db = req.db;
    var keyword = req.params.keyword;
    var collection = db.get('events');
    console.log('Searching events with keyword: ' + keyword);
    collection.find({'title': new RegExp(keyword, 'i')}, {}, function(err, item) {
        res.send(item);
    });

});


router.post('/newevent', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    

	collection.insert(req.body, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("events");
        }
    });


});

router.put('/events/:id', function(req, res) {
	var db = req.db;
    var id = req.params.id;
    console.log('Updating event: ' + id);
    console.log(JSON.stringify(req.body));
    var collection = db.get('events');
        
    collection.update({'_id':id}, req.body, function(err, result) {
        if (err) {
            console.log('Error updating event: ' + err);
            res.send({'error':'An error has occurred'});
        } else {
            console.log('' + result + ' document(s) updated');
            res.send(req.body);
        }
    });
});



router.delete('/events/:id', function(req, res) {
	var db = req.db;
    var id = req.params.id;
    console.log('Deleting event: ' + id);
    var collection = db.get('events');

    collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
        if (err) {
            res.send({'error':'An error has occurred - ' + err});
        } else {
            console.log('' + result + ' document(s) deleted');
            res.send(req.body);
        }
    });
});



module.exports = router;