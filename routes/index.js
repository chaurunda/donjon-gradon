/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Donjon & Gradon', ip: 'ip' });
};
