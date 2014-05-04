var utils    = require( '../utils' );
var db = require('../db').db;
var format = require('util').format;

exports.list = function ( req, res, next ){
  var user_id = req.params.user_id;
  var queryStr = 'SELECT * FROM `To_Do_List` WHERE `user_id` = '+user_id;
  db.query(queryStr, function(err, rows) {
    if(err) return next(err);
    res.json(rows);
  });
};

exports.signup = function(req, res){
  var username = req.body.username,
      password = req.body.password,
      queryStr ='SELECT *'+
                'FROM `User`'+
                'WHERE `username` = "'+username+'"'+
                'AND `password` = "' + password +'"';
  db.query(queryStr, function(err, result){
    if (result.length > 0) {
            res.end('fail');
    }
    else
    {
      queryStr = 'INSERT INTO `User` (`username`, `password`) VALUES("'+username+'",'+password+')';
      db.query(queryStr, function(err, user){
        res.json({'user_id' : user.insertId});
      });
    }
  });
};

exports.login = function(req, res){
  var username = req.body.username,
      password = req.body.password,
      queryStr ='SELECT *'+
                'FROM `User`'+
                'WHERE `username` = "'+username+'"'+
                'AND `password` = "' + password +'"';
  db.query(queryStr, function(err, result){
    if (result.length > 0) {
      res.json( { 'user_id' : result[0].id });
    }
    else
      res.end('fail');
  });
};

exports.search = function(req, res) {
  var queryStr = 'SELECT *FROM `To_Do_List` WHERE(`content` LIKE "%'+req.params.key+'%" AND `user_id`='+req.params.user_id+')';
  db.query(queryStr, function(err, rows){
    res.json(rows);
  });
};

exports.create = function ( req, res, next ){
  var content = req.body.content,
      priority = req.body.priority,
      tag = req.body.tag;
  var user_id = req.params.user_id;
  var queryStr = format('INSERT INTO `To_Do_List` (`content`, `user_id`, `priority`, `tag`, `date`) VALUES("%s",%d,"%s", "%s", now())', content, user_id, tag);
  db.query(queryStr, function(err, todo) {
    if(err) return next(err, todo);
    res.json({'todo_id':todo.insertId});
  });
};

exports.destroy = function ( req, res, next ){
  var queryStr = 'DELETE FROM `To_Do_List` WHERE `id` = '+req.params.id;
  db.query(queryStr, function(err) {
    if(err) res.end('fail');
    res.end('done');
  });
};

exports.update = function( req, res, next ){
  var content = req.body.content;
  var tag = req.body.tag;
  var id = req.params.id;
  var queryStr = format('UPDATE `To_Do_List` SET `content`="%s", `tag`="%s" WHERE `id` ="%d"',content, tag,id);
  db.query(queryStr, function(err){
    if (err) res.end('fail');
    res.end('done');
  });
};
