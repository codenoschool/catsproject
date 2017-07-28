var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var promise = mongoose.connect('mongodb://127.0.0.1/catsproject', {
    useMongoClient: true
});

mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log('DB is: OK');
});


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json()) 


let Cat = require('./models/cats');

app.get('/', function(req, res){
    Cat.find(function(err, cats){
        if(err){
            console.log(err);
            return;
        } else{
            res.render('index', {
                cats: cats
            })
        }
    })
});

app.get('/cat/:id', function(req, res){
    Cat.findById(req.params.id, function(err, cat){
        if(err){
            console.log(err);
            return;
        } else{
            res.render('cat', {
                cat: cat
            });
        }
    });
});

app.get('/add/cat', function(req, res){
    res.render('add_cat');
});

app.post('/add/cat', function(req, res){
    let cat = new Cat();

    cat.name = req.body.name;
    cat.age = req.body.age;

    cat.save(function(err){
        if(err){
            console.log(err);
            return;
        } else{
            res.redirect('/');
        }
    });
});

app.get('/edit/:id', function(req, res){
    Cat.findById(req.params.id, function(err, cat){
        if(err){
            console.log(err);
        } else{
            res.render('edit_cat', {
                cat: cat
            });
        }
    });
});

app.post('/edit/:id', function(req, res){
    var cat = {};

    cat.name = req.body.name;
    cat.age = req.body.age;

    let query = {_id:req.params.id}

    Cat.update(query, cat, function(err){
        if(err){
            console.log(err);
            return;
        } else{
            res.redirect('/');
        }
    });
});

app.get('/delete/:id', function(req, res){
    let query = {_id:req.params.id}
    
    Cat.remove(query, function(err){
        if(err){
            console.log(err);
            return;
        } else{
            res.redirect('/');
        }
    });
});


app.get('/add/defaultcat', function(req, res){
    let defaultcat = new Cat({name:"Small Cat", age:3});

    defaultcat.save(function(err){
        if(err){
            console.log(err);
            return;
        } else{
            res.send('The default cat was created.');
        }
    });
});

app.listen(3000, function(){
    console.log('The server is running on http://127.0.0.1:3000/');
});