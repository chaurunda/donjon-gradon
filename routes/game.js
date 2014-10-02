exports.index = function(data){
    return function(req, res){
        // connect into your mongo database
        db.connect(dbconnection, function(err, db) {
            if(err) throw err;
            // Choose your table
            res.render('home/index', { title: 'Donjon & Gradon', ip: ip });
        });
    }
};
