/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('home/index', { title: 'Donjon & Gradon', ip: 'ip' });
};
