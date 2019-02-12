var express = require('express');
var set = require('set-type')
var fs = require('fs');
var router = express.Router();
var UserModel = require('../public/javascripts/db');
var db2 = require('../public/javascripts/db.js');


/****************** Get admin page **************************************/
router.post('/administrador', function(req, res, next) {
	var rp = require('request-promise');
  	var options = {
    	method: 'POST',
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
          res.render('administrador', { title: 'Sesion de administrador' });
        }
        else { /*no se autentifico*/ }
    })
    .catch(function (err) { /* POST failed...*/ });
});
/*************************************************************************/

/********************************************************************************************************************************/
//1
router.get('/query/:nombre_query', function(req, res, next) {
	UserModel.conectar('localhost','root','portgas','consultor');
	UserModel.getQuerys3(req.params.nombre_query, function(error, data){
		UserModel.getDB(data[0].db_id,function(error, data2){
			db2.conectar('localhost', 'root', 'portgas', 'horarios');
			console.log(data2[0].dbname);
			//db2.conectar(data2[0].dsn, data2[0].user, data2[0].password, data2[0].dbname);
			db2.Consulta(data[0], function(err, data3){
				if( !(data3 && data3.msg) ){
					console.log("1");
					res.send(data3);
				}
				else{
					console.log(req.sessionID);
					res.json(403,{"msg":""});
				}
			} )
		});
	});
});
//2 Con el nombre de una ui puedes obtener el documento index 
router.get('/ui/:nombre', function(req, res) {
	UserModel.getUi(req.params.nombre, req.sessionID, function(error, data){	//obtengo la ui
		if( !(data && data.msg) ){
			UserModel.getDocumento(data[0].id, data[0].index_, req.sessionID, function(error, data2){	//obtengo el documento
				if( !error ){
					console.log("2");
					switch(data2[0].mime){
						case 'text/html':{
							res.setHeader('Content-Type', data2[0].mime)
							break;
						}
						case 'text/css':{
							res.setHeader('Content-Type', data2[0].mime);
							break;
						}
					}
					res.send(data2[0].content);
				}
				else{
					res.json(403,{"msg":""});
				}
			});
		}
		else{
			res.json(403,{"msg":""});
		}
	})
});
//3 Ejecucion de un docuento individual
router.get('/ui/:nombre_ui/:nombre_doc', function(req, res) {
	if( req.params.nombre_doc ){
		UserModel.getDocumento(req.params.nombre_ui, req.params.nombre_doc, req.sessionID, function(error, data){
			if( !error ){
				console.log("3");
				switch(data[0].mime){
					case 'text/html':{
						res.setHeader('Content-Type', data[0].mime)
						break;
					}
					case 'text/css':{
						res.setHeader('Content-Type', data[0].mime);
						break;
					}
					case 'image/jpeg':{
						res.setHeader('Content-Type', data[0].mime);
						break;
					}
				}
				res.send(data[0].content);
			}
			else{
				res.json(403,{"msg":""});
			}
		});		
	}
});
//4 Subir documentos de forma externa
router.get('/addDoc', function(req, res, next) {
	res.render('addDoc', { title: "Subir documento de forma externa"} );
});
router.post('/ui/:nombre_ui/:nombre_document', function(req, res) {
	var sql = 'select * from ui where name = "' + req.body.nombre_ui + '"'; 
	var Data = {sql_ : sql};
	UserModel.Consulta(Data,function(error, data3_aux){
		if( !error ){
			var Data = {
				ui_id : data3_aux[0].id,
				name_doc : req.body.nombre_document,
				content : req.body.rr,
				updated_at: new Date().toLocaleString()
			};
			UserModel.updateDocExt(Data, function(error, data2){
				if( !error ){
					console.log("4");
					res.json(200,{"msg":"update confirm !"});
				}
				else{
					res.json(403,{"msg":"eror"});
				}
			});	
		}
		else{
			res.json(403,{"msg":""});
		}
	})
});

/********************************************************************************************************************************/

/* GET Uis */
router.get('/ui', function(req, res, next) {
	UserModel.getUis(function(error, data){
		res.render('ui', { uis: data} );
	});
});
router.get('/add_ui', function(req, res, next) {
	res.render('add_ui', { title:'Agrega vista de datos'} );
});
router.post("/add_ui/agregar", function(req,res){
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
router.get('/del_ui', function(req, res, next) {
	res.render('del_ui', { title:'Elimina ui'} );
});
router.post("/del_ui/eliminar", function(req,res){
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
// 6
router.get('/query', function(req, res, next) {
	UserModel.getQuerys(req.sessionID,function(error, data){
		res.render('query_list', { consultas: data} );
	});
});
router.get('/add_query', function(req, res, next) {
	res.render('add_query', { title:'Agrega consulta'} );
});
router.post("/query/agregar", function(req,res){
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
router.get('/del_query', function(req, res, next) {
	res.render('del_query', { title:'Elimina consulta'} );
});
router.post("/query/eliminar", function(req,res){
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
router.get('/views', function(req, res, next){
	UserModel.getViews(function(error, data){
		res.render('views_list', { title:'Lista de vistas', views: data} );
	});
});
router.post('/views/query', function(req, res, next){
	console.log(req.body.filtro);
	UserModel.getViewsId(req.body.filtro,function(error, data){
		res.render('views_list', { title:'Lista de vistas por consulta', views: data} );
	});
});
router.get('/views/:query', function(req, res, next){
	console.log("por nobre");
	UserModel.getQuerys2( req.params.query,function(error, data){
		UserModel.getViewsId(data[0].id,function(error, data2){
			res.render('views_list', { title:'Lista de vistas por consulta', views: data2} );
		});
	});
});
router.get('/add_view', function(req, res, next) {
	res.render('add_view', { title:'Agrega vista'} );
});
router.post("/add_view/agregar", function(req,res){
	//creamos un objeto con los datos a insertar del usuario
	var userData = {
		id: req.body.id,
		name : req.body.name,
		query_id: req.body.query_id,
		sql_: req.body.sql_,
		err: null,
		created_at: new Date().toLocaleString()
	};
	UserModel.insertView(userData,function(error, data){
		//si el usuario se ha insertado correctamente modificarstramos su info
		if(data && data.msg){
			res.json(200, {"msg":"Creado correctamente"});
		}
		else{
			res.json(500,{"msg":"Error"});
		}
	});
});
router.get('/del_view', function(req, res, next) {
	res.render('del_view', { title:'Elimina vista'} );
});
router.post("/del_view/eliminar", function(req,res){
	UserModel.deleteView(req.body.id,function(error, data){
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

/* GET Documents */
router.get('/document', function(req, res) {
	UserModel.getDocs( function(error, data){
		if( !(data && data.msg) ){
			res.render('document',{ docs: data});
		}
		else{
			res.json(403,{"msg":""});
		}
	});
});
router.get('/add_doc', function(req, res, next) {
	res.render('add_doc', { title:'Agrega Documento'} );
});
router.post("/add_document/agregar", function(req,res){
	//creamos un objeto con los datos a insertar del usuario
	var userData = {
		id: req.body.id,
		ui_id: req.body.ui_id,
		name : req.body.name,
		mime : req.body.mime,
		description : req.body.description,
		content : req.body.content,
		created_at: new Date().toLocaleString(),
		updated_at: new Date().toLocaleString()
	};
	UserModel.insertDoc(userData,function(error, data){
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
router.get("/upd_doc", function(req,res, next){
	res.render('upd_doc', { title: 'Modificar un documento' });
});
router.post("/administrador/upd_confirm_doc", function(req,res, next){
	UserModel.getDup(req.body.id, req.sessionID,function(error, data){
		if (error) {            
            res.json(500,{"msg":"Error"});
        }
        else {
            res.render('upd_confirm_doc', { Docs: data } );
        }    
	});
});
router.post("/administrador/doc_save", function(req,res, next){
	var userData = {
		id : req.body.id,
		ui_id : req.body.ui_id,
		name : req.body.name,
		mime : req.body.mime,
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
router.get('/del_doc', function(req, res, next) {
	res.render('del_doc', { title:'Elimina documento'} );
});
router.post("/del_doc/eliminar", function(req,res){
	UserModel.deleteDoc(req.body.id,function(error, data){
		if(data && data.msg){
			res.json(data);
		}
		else{
			res.json(500,{"msg":"Error"});
		}
	});
});
/********************************************************************************************************************************/

/* GET Connections */
//5
router.get("/db", function(req,res, next){
	UserModel.getConexiones(req.sessionID,function(error, data){
		res.render('conexiones', { dbs: data } );
	});
});
router.get("/add_db", function(req, res, next){
	res.render('add_db', { title:'Agrega db'} );
});
router.post("/add_db/agregar", function(req,res){
	//creamos un objeto con los datos a insertar del usuario
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
router.get("/del_db", function(req, res, next){
	res.render('del_db', { title:'Eliminar db'} );
});
router.post("/del_db/eliminar", function(req,res){
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
router.get("/upd_db", function(req,res, next){
	res.render('upd_db', { title: 'Modificar DB' });
});
router.post("/administrador/upd_db_confirm", function(req,res, next){
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
router.post("/administrador/upd_db_f", function(req,res){
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
		//si el usuario se ha insertado correctamente mostramos su info
		if(data && data.msg){
			res.json(200,{"msg":"BD modificada correctamente"});
		}
		else{
			res.json(500,{"msg":"Error"});
		}
	});
});
/********************************************************************************************************************************/

/* GET admin Users */
router.get("/usuarios", function(req,res, next){
	UserModel.getUsers(function(error, data){
		res.render('listar', { usuarios: data } );
	});
});
router.get("/crear", function(req,res, next){
	res.render('create_user', { title: 'Crear un usuario' });
});
router.post("/administrador/create_user", function(req,res){
	//creamos un objeto con los datos a insertar del usuario
	var userData = {
		id : req.body.id,
		db_id : req.body.db_id || null,
		email : req.body.email,
		rol: req.body.rol
	};
	UserModel.insertUser(userData,function(error, data){
		if(data && data.msg){
			res.json(200, {"msg":"Creado correctamente"});
		}
		else{
			res.json(500,{"msg":"Error"});
		}
	});
});
router.get("/modificar", function(req,res, next){
	res.render('update_user', { title: 'Modificar un usuario' });
});
router.post("/administrador/update_confirm", function(req,res, next){
	UserModel.getUser(req.body.id, function(error, data){
		console.log( data );
		if (error) {            
            res.json(500,{"msg":"Error"});
        }
        if (data.length>0) {
        	//res.json(data);
            res.render('update_confirm', {usuarios: data} );
        } else {
            res.json(500,{"msg":"Error"});
        }    
	});
});
router.post("/administrador/update_user_f", function(req,res){
	//creamos un objeto con los datos a insertar del usuario
	var userData = {
		id : req.body.id,
		db_id : req.body.db_id || null,
		email : req.body.email,
		rol: req.body.rol,
	};
	UserModel.updateUser(userData,function(error, data){
		//si el usuario se ha insertado correctamente mostramos su info
		if(data && data.msg){
			res.json(200,{"msg":"Modificado correctamente"});
		}
		else{
			res.json(500,{"msg":"Error"});
		}
	});
});
router.get("/eliminar", function(req,res, next){
	res.render('delete_user', { title: 'Eliminar un usuario' });
});
router.post("/administrador/delete_user", function(req,res){
	UserModel.deleteUser(req.body.id,function(error, data){
		if(data && data.msg){
			res.json(data);
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