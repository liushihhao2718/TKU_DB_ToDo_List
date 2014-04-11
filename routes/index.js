var utils    = require( '../utils' );
var db = require('../db').db;

exports.index = function ( req, res, next ){
  var user_id = req.cookies ?
    req.cookies.user_id : undefined;

var queryStr = 'SELECT * FROM `To_Do_List` WHERE `user_id` = '+1;
db.query(queryStr, function(err, rows) {
  if(err) return next(err);
  res.render( 'index', {
          title : 'TKU To_Do_List',
          todos : rows
      });
});
};

exports.create = function ( req, res, next ){
  var content = req.body.content;
  var user_id = req.cookies.user_id;
  var queryStr = 'INSERT INTO `To_Do_List` (`content`, `user_id`) VALUES("'+content+'",'+1+')';
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

exports.edit = function( req, res, next ){
  var user_id = req.cookies ?
      req.cookies.user_id : undefined;

  Todo.
    find({ user_id : user_id }).
    sort( '-updated_at' ).
    exec( function ( err, todos ){
      if( err ) return next( err );

      res.render( 'edit', {
        title   : 'Express Todo Example',
        todos   : todos,
        current : req.params.id
      });
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
  var user_id = req.cookies ?
      req.cookies.user_id : undefined;

  if( !user_id ){
    res.cookie( 'user_id', utils.uid( 32 ));
  }

  next();
};
