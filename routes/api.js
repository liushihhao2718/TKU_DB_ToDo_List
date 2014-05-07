var utils    = require( '../utils' );
var db = require('../db').db;
var format = require('util').format;
var async = require('node-async');
var waterfall = require('async').waterfall;

exports.list = function ( req, res, next ){
  var user_id = req.params.user_id;
  var queryStr = 'SELECT * FROM `To_Do_List` WHERE `user_id` = '+user_id,
      tagQuery = 'SELECT `tag` FROM `User` WHERE `id` = '+user_id;

  async([
  {
    name:'To_Do_List',
    task:function(params, callback) {
               db.query(queryStr, function(err, rows) {
                  callback(null, rows);
                });
          }
  },
  {
    name:'tag',
    task:function(params, callback) {
               db.query(tagQuery, function(err, rows) {
                console.log(rows);
                  callback(null, JSON.parse(rows[0].tag));
                });
          }

  }
  ], function(results){
    res.header("Content-Type", "application/json; charset=utf-8");
    res.json({ title : 'TKU To_Do_List',todos : results.To_Do_List.value, tag:results.tag.value});
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
                console.log(queryStr);
  db.query(queryStr, function(err, result){
    console.log(err+JSON.stringify(result));
    if (err) {console.log(err);}
    else if (result.length > 0) {
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
      newTag = req.body.tag,
      done = req.body.done;
  var user_id = req.params.user_id;
  var queryStr = format('INSERT INTO `To_Do_List` (`content`, `user_id`, `priority`, `tag`, `date`, `done`) VALUES("%s",%d,"%s", "%s", now(), "%s")', content, user_id, priority,newTag, done);
  waterfall([function(callback){
     db.query('SELECT `tag` FROM `User` WHERE `id` = '+user_id, function(err, rows){
      var tags = JSON.parse(rows[0].tag);
      var hasTag = tags.indexOf(newTag);
      console.log(tags, hasTag);
      if (hasTag === -1) {
        tags.push(newTag);
        var updateStr ='UPDATE `User` SET `tag`=\''+JSON.stringify(tags)+'\' WHERE `id`='+user_id;
        console.log(updateStr);
        db.query(updateStr, function(err, todo) {        });
      }
      callback(null, hasTag);
    });
  }, function(hasTag){
    db.query(queryStr, function(err, todo) {
            if(err) return next(err, todo);
            res.json({'todo_id':todo.insertId});
    });
  }], function(err, results){});
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
  var down = req.body.down;
  var id = req.params.id;
  var queryStr = format('UPDATE `To_Do_List` SET `content`="%s", `tag`="%s",`done`="%s"  WHERE `id` ="%d"',content,tag,down,id);
  db.query(queryStr, function(err){
    if (err) res.end('fail');
    res.end('done');
  });
};
