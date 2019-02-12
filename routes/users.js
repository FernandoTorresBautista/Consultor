var express = require('express');
var router = express.Router();
var UserModel = require('../public/javascripts/db');
var db2 = require('../public/javascripts/db.js');

/*********Usuario*********************************************************/
router.post('/usuario', function(req, res, next) {
  var rp = require('request-promise');
    var options = {
      method: 'POST',
      //uri: 'http://192.168.0.115:3000/login',
      uri: 'http://192.168.43.162:3000/login',
      body: {
        email: req.body.email,//'fernandot371@gmail.com',
        pass: req.body.pass,//portgas',
        service: 'consultorjs'
      },
      json: true // Automatically stringifies the body to JSON
  };
  rp(options)
    .then(function (parsedBody) {
        if(parsedBody!=null){
          console.log(parsedBody);
            res.render('usuario', { title: 'Sesion de usuario' });
        }
        else {/*no se autentifico*/ }
    })
    .catch(function (err) { /* POST failed...*/ });
});
/*************************************************************************/

/* GET Uis */
router.get('/oui', function(req, res, next) {
  UserModel.getUis(function(error, data){
    res.render('oui', { uis : data, title: 'Usuario'} );
  });
});
router.get('/oadd_ui', function(req, res, next) {
  res.render('oadd_ui', { title: 'Agregar uns ui'} );
});
router.post("/oadd_ui/agregar", function(req,res){
  //creamos un objeto con los datos a insertar del usuario
  var userData = {
    id: req.body.id,
    name : req.body.name,
    description : req.body.description,
    index_: req.body.index_,
    email: req.body.email,
    ekey: req.body.ekey,
    created_at: new Date().toLocaleString()
  };
  UserModel.insertUi(userData,function(error, data){
    //si el usuario se ha insertado correctamente modificarstramos su info
    if(data && data.msg){
      res.json(200, {"msg":"Creado correctamente"});
      //res.json(500,{"msg":"Creado correctamente"});
    }
    else{
      res.json(500,{"msg":"Error"});
    }
  });
});
router.get('/odel_ui', function(req, res, next) {
  res.render('odel_ui', { title: 'Eliminar uns ui'} );
});
router.post("/odel_ui/eliminar", function(req,res){
  UserModel.deleteUi(req.body.id,function(error, data){
    //si el usuario se ha insertado correctamente mostramos su info
    if(data && data.msg){
      //dar de retorno un html para que se muestre la info en una página
      res.json(data);
    }
    else{
      res.json(500,{"msg":"Error"});
    }
  });
});
/********************************************************************************************************************************/

/* GET Querys */
router.get('/oquery', function(req, res, next) {
  UserModel.getQuerys(req.sessionID,function(error, data){
    res.render('oquery', { uis : data, title: 'Consulta'} );
  });
});
router.get('/oadd_q', function(req, res, next) {
  res.render('oadd_q', { title: 'Agregar una consulta'} );
});
router.post("/oadd_q/agregar", function(req,res){
  var userData = {
    id: req.body.id,
    category : req.body.category,
    name : req.body.name,
    description : req.body.description,
    db_id: req.body.db_id,
    sql_: req.body.sql_,
    err: null,
    ptypes: req.body.ptypes,
    email: req.body.email,
    created_at: new Date().toLocaleString()
  };
  UserModel.insertQuery(userData,function(error, data){
    //si el usuario se ha insertado correctamente modificarstramos su info
    if(data && data.msg){
      res.json(200, {"msg":"Creado correctamente"});
    }
    else{
      res.json(500,{"msg":"Error"});
    }
  });
});
router.get('/odel_q', function(req, res, next) {
  res.render('odel_q', { title: 'Eliminar una consulta'} );
});
router.post("/odel_q/eliminar", function(req,res){
  UserModel.deleteQuery(req.body.id,function(error, data){
    //si el usuario se ha insertado correctamente mostramos su info
    if(data && data.msg){
      //dar de retorno un html para que se muestre la info en una página
      res.json(data);
    }
    else{
      res.json(500,{"msg":"Error"});
    }
  });
});
/********************************************************************************************************************************/

/* GET Views */
router.get('/oviews', function(req, res, next){
  UserModel.getViews(function(error, data){
    res.render('olist_view', { title:'Lista de vistas por consulta', views: data} );
  });
});
router.get('/oadd_view', function(req, res, next) {
  res.render('oadd_view', { title: 'Agregar una vista'} );
});
router.post("/oadd_view/agregar", function(req,res){
  var userData = {
    id: req.body.id,
    name : req.body.name,
    query_id: req.body.query_id,
    sql_: req.body.sql_,
    err: null,
    created_at: new Date().toLocaleString()
  };
  UserModel.insertView(userData,function(error, data){
    if(data && data.msg){
      res.json(200, {"msg":"Creado correctamente"});
    }
    else{
      res.json(500,{"msg":"Error"});
    }
  });
});
router.get('/odel_view', function(req, res, next) {
  res.render('odel_view', { title: 'Eliminar una vista'} );
});
router.post("/odel_view/eliminar", function(req,res){
  UserModel.deleteView(req.body.id,function(error, data){
    if(data && data.msg){
      res.json(data);
    }
    else{
      res.json(500,{"msg":"Error"});
    }
  });
});
/********************************************************************************************************************************/

/* GET Views */
router.get('/odocument',function(req, res, next){
  UserModel.getDocs(function(error, data){
    res.render('odocument', { title:'Lista de documentos', docs: data} );
  });
});
router.get('/oadd_doc', function(req, res, next) {
  res.render('oadd_doc', { title: 'Agrega un documento'} );
});
router.post("/oadd_doc/agregar", function(req,res){
  var userData = {
    id: req.body.id,
    name : req.body.name,
    query_id: req.body.query_id,
    sql_: req.body.sql_,
    err: null,
    created_at: new Date().toLocaleString()
  };
  UserModel.insertView(userData,function(error, data){
    if(data && data.msg){
      res.json(200, {"msg":"Creado correctamente"});
    }
    else{
      res.json(500,{"msg":"Error"});
    }
  });
});
router.get('/odel_doc', function(req, res, next) {
  res.render('odel_doc', { title: 'Eliminar un documento'} );
});
router.post("/odel_doc/eliminar", function(req,res){
  UserModel.deleteD(req.body.id,function(error, data){
    if(data && data.msg){
      res.json(data);
    }
    else{
      res.json(500,{"msg":"Error"});
    }
  });
});
router.get("/oupd_doc", function(req,res, next){
  res.render('oupd_doc', { title: 'Modificar un documento' });
});
router.post("/oupd_doc/oupd_confirm_doc", function(req,res, next){
  UserModel.getD(req.body.id,req.sessionID, function(error, data){
    console.log( data );
    if (error) {            
            res.json(500,{"msg":"Error"});
        }
        if (data.length>0) {
            res.render('oupd_confirm_doc', {Docs: data} );
        } else {
            res.json(500,{"msg":"Error"});
        }    
  });
});
router.post("/oupd_doc/odoc_save", function(req,res){
  var userData = {
    id : req.body.id,
    ui_id : req.body.ui_id,
    name: req.body.name,
    mime: req.body.mime,
    description : req.body.description,
    content : req.body.content,
    created_at : req.body.created_at,
    updated_at : new Date().toLocaleString()
  };
  UserModel.updateDoc(userData,function(error, data){
    if(data && data.msg){
      res.json(200,{"msg":"Modificado correctamente"});
    }
    else{
      res.json(500,{"msg":"Error"});
    }
  });
});
/********************************************************************************************************************************/

/* GET Connections */
// 5
router.get('/odb', function(req, res, next) {
  UserModel.getDBs(function(error, data){
    res.render('odb', { title: 'Agrega un documento', dbs:data } ); 
  }); 
});
router.post("/odb/agregar", function(req,res){
  var userData = {
    id: req.body.id,
    name : req.body.name,
    description : req.body.description, 
    user: req.body.user,
    password : req.body.password,
    dbname: req.body.dbname, 
    dsn : req.body.dsn,
    hostsocket : req.body.hostsocket,
    classname : req.body.classname,
    subprotocol : req.body.subprotocol,
    params : req.body.params
  };
  UserModel.insertDB(userData,function(error, data){
    //si el usuario se ha insertado correctamente modificarstramos su info
    if(data && data.msg){
      res.json(200, {"msg":"Creado correctamente"});
      //res.json(500,{"msg":"Creado correctamente"});
    }
    else{
      res.json(500,{"msg":"Error"});
    }
  });
});
router.get("/odel_db", function(req, res, next){
  res.render('odel_db', { title:'Eliminar db'} );
});
router.post("/odel_db/eliminar", function(req,res){
  UserModel.deleteDB(req.body.id,function(error, data){
    //si el usuario se ha insertado correctamente mostramos su info
    if(data && data.msg){
      //dar de retorno un html para que se muestre la info en una página
      res.json(data);
    }
    else{
      res.json(500,{"msg":"Error"});
    }
  });
});

router.get("/oupd_db", function(req,res, next){
  res.render('oupd_db', { title: 'Modificar DB' });
});
router.post("/oupd_db/confirm", function(req,res, next){
  UserModel.getDB(req.body.id, function(error, data){
    console.log( data );
    if (error) {            
            res.json(500,{"msg":"Error"});
        }
        if (data.length>0) {
          //res.json(data);
            res.render('upd_db_confirm', {dbs: data} );
        } else {
            res.json(500,{"msg":"Error"});
        }    
  });
});
router.post("/oupd_db/oupdate", function(req,res){
  //creamos un objeto con los datos a insertar del usuario
  var userData = {
    id : req.body.id,
    name : req.body.name,
    description : req.body.description,
    user : req.body.user,
    password : req.body.password,
    dbname : req.body.dbname,
    dsn : req.body.dsn,
    hostsocket : req.body.hostsocket,
    classname : req.body.classname,
    subprotocol : req.body.subprotocol,
    params : req.body.params
  };
  UserModel.updateDB(userData,function(error, data){
    if(data && data.msg){
      res.json(200,{"msg":"BD modificada correctamente"});
    }
    else{
      res.json(500,{"msg":"Error"});
    }
  });
});
/********************************************************************************************************************************/

/* GET page admin Out Session */
router.get("/out_session", function(req,res, next){
  req.session.destroy();
  var pagina='<!doctype html><html><head></head><body><br><a href="./">Retornar</a></body></html>';
  res.send(pagina);
});

module.exports = router;
