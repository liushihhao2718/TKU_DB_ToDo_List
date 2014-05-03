var utils    = require( '../utils' );
var db = require('../db').db;
var async = require('node-async');

exports.index = function ( req, res, next ){
  var user_id = req.cookies ?
    req.cookies.user_id : undefined;

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
      res.render( 'index', { title : 'TKU To_Do_List',todos : results.To_Do_List.value, tag:results.tag.value});
  });
  
};

exports.login = function(req, res){
  console.log('login API IN');
  var user_id = req.body.user_id,
      password = req.body.password,
      queryStr ='SELECT *'+
                'FROM `User`'+
                'WHERE `username` = "'+user_id+'"'+
                'AND `password` = "' + password +'"';

  db.query(queryStr, function(err, result){
    if (result.length > 0) {
      console.log(result);
      res.cookie( 'user_id', result[0].id);
      res.redirect('/');
    }
    else
      res.render('login');
  });
};

exports.create = function ( req, res, next ){
  var content = req.body.content;
  var user_id = req.cookies.user_id;
  var queryStr = 'INSERT INTO `To_Do_List` (`content`, `user_id`) VALUES("'+content+'",'+user_id+')';
  db.query(queryStr, function(err) {
    if(err) return next(err);
    res.redirect( '/' );
  });
};

exports.destroy = function ( req, res, next ){
  var queryStr = 'DELETE FROM `To_Do_List` WHERE `id` = '+req.params.id;
  db.query(queryStr, function(err) {
    if(err) return next(err);
    res.redirect( '/' );
  });
};

exports.update = function( req, res, next ){
  Todo.findById( req.params.id, function ( err, todo ){
    var user_id = req.cookies ?
      req.cookies.user_id : undefined;

    if( todo.user_id !== user_id ){
      return utils.forbidden( res );
    }

    todo.content    = req.body.content;
    todo.updated_at = Date.now();
    todo.save( function ( err, todo, count ){
      if( err ) return next( err );

      res.redirect( '/' );
    });
  });
};

// ** express turns the cookie key to lowercase **
exports.current_user = function ( req, res, next ){
  console.log(req.cookies);
  var user_id = req.cookies ?
      req.cookies.user_id : undefined;
  if( !user_id ){
    // res.cookie( 'user_id', utils.uid( 32 ));
    res.render('login');
  }
else
  next();
};
