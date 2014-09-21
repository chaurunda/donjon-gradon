/*
 * GET home page.
 */
// Set the connexion to your mongo database.
var dbconnection = "mongodb://127.0.0.1:27017/donjongradon";
exports.index = function(ip, db){
    return function(req, res){
        // connect into your mongo database
        db.connect(dbconnection, function(err, db) {
            if(err) throw err;
            // Choose your table
            res.render('home/index', { title: 'Donjon & Gradon', ip: ip });
        });
    }
};

exports.newGame = function(ip, db){
    return function(req, res){
        console.log(req.body.test);
        if(req.body.test) {
            db.connect(dbconnection, function(err, db){
                if(err) throw err;
                var collection = db.collection('player');
                //req.body return all the field
            });
            socket.hero.test = req.body.test;
            console.log(socket.hero);
        } else {
            res.render('home/new', {title : 'Donjon & Gradon - New', ip : ip});
        }
    }
};
