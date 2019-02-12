var connection;
var userModel = {};
	userModel.conectar = function(hostc, userc, passwordc, databasec){
		var mysql = require('mysql')
		connection = mysql.createConnection({
			host: hostc,
			user: userc,
			password: passwordc,
			database: databasec
		})
		connection.connect(function(err) {
		if (err) throw err
			console.log('OK')
		})
	}
	//obtenemos todos los usuarios sean administradores o no
	userModel.getUsers = function(callback){
		if (connection) {
			connection.query('SELECT * FROM dbaccess ORDER BY id', function(error, rows) {
				if(error){
					throw error;
				}
				else{
					callback(null, rows);
				}
			});
		}
	}
	userModel.getQuerys = function(sid, callback){
		if (connection) {
			connection.query('SELECT * FROM query ORDER BY id', function(error, rows) {
				if(error){
					throw error;
				}
				else{
					callback(null, rows);
				}
			});
		}
	}
	userModel.getQuerys2 = function(name,callback){
		if (connection) {
			connection.query('SELECT * FROM query WHERE name="'+name+'"', function(error, rows) {
				if(error){
					throw error;
				}
				else{
					callback(null, rows);
				}
			});
		}
	}
	userModel.getQuerys3 = function(name,callback){
		if (connection) {
			connection.query('SELECT * FROM query WHERE name="'+name+'"', function(error, rows) {
				if(error){
					throw error;
				}
				else{
					callback(null, rows);
				}
			});
		}
	}
	//retorna todos los items de id
	userModel.getConexiones = function(sid, callback){
		if (connection) {
			connection.query('SELECT * FROM db ORDER BY id', function(error, rows) {
				if(error){
					throw error;
				}
				else{
					callback(null, rows);
				}
			});
		}
	}
	//retorna todas las views del usuario
	userModel.getViews = function(callback){
		if (connection) {
			connection.query('SELECT * FROM view ORDER BY id',function(error, rows) {
				if(error){
					throw error;
				}
				else{
					callback(null, rows);
				}
			});
		}
	}
	//get views por id
	userModel.getViewsId = function(Id,callback){
		if (connection) {
			connection.query('SELECT * FROM view WHERE query_id =' + connection.escape(Id) +' ORDER BY id',function(error, rows) {
				if(error){
					throw error;
				}
				else{
					callback(null, rows);
				}
			});
		}
	}
	//retorna todas las uis del usuario
	userModel.getUis = function(callback){
		if (connection) {
			connection.query('SELECT * FROM ui ORDER BY id',function(error, rows) {
				if(error){
					throw error;
				}
				else{
					callback(null, rows);
				}
			});
		}
	}
	userModel.getUi = function(name_ui, sessionID, callback){
		if (connection) {
			var sql = 'SELECT * FROM ui WHERE name = ' + connection.escape(name_ui);
			connection.query(sql,function(error, rows) {
				if(error){
					throw error;
				}
				else{
					callback(null, rows);
				}
			});
		}
	}
	//retorna una
	userModel.getView = function(q_id,callback){
		if (connection) {
			connection.query('SELECT * FROM view WHERE query_id=? ORDER BY id',q_id, function(error, rows) {
				if(error){
					throw error;
				}
				else{
					callback(null, rows);
				}
			});
		}
	}
	//obtenemos un usuario por su id
	userModel.getUser = function(id,callback){
		if (connection){
			var sql = 'SELECT * FROM dbaccess WHERE id = ' + connection.escape(id);
			connection.query(sql, function(error, row) {
				if(error){
					throw error;
				}
				else{
					callback(null, row);
				}
			});
		}
	}
	//retorna una tupla con un id especifico de la tabla db
	userModel.getDB = function(id,callback){
		if (connection){
			var sql = 'SELECT * FROM db WHERE id = ' + connection.escape(id);
			connection.query(sql, function(error, row) {
				if(error){
					throw error;
				}
				else{
					callback(null, row);
				}
			});
		}
	}
	userModel.getDBs = function(callback){
		if (connection){
			var sql = 'SELECT * FROM db ORDER BY id' ;
			connection.query(sql, function(error, row) {
				if(error){
					throw error;
				}
				else{
					callback(null, row);
				}
			});
		}
	}
	//retorna todos los documentos
	userModel.getDocs = function(callback){
		if (connection){
			var sql = 'SELECT * FROM document ORDER BY id ';
			connection.query(sql, function(error, row) {
				if(error){
					throw error;
				}
				else{
					callback(null, row);
				}
			});
		}
	}
	//retorna tuplas con un ui_id especifico de la tabla document
	userModel.getDocuments = function(ui_id,callback){
		if (connection){
			var sql = 'SELECT * FROM document WHERE ui_id = ' + connection.escape(ui_id);
			connection.query(sql, function(error, row) {
				if(error){
					throw error;
				}
				else{
					callback(null, row);
				}
			});
		}
	}
	userModel.getDocument = function(name,sessionID,callback){
		if (connection){
			var sql = 'SELECT * FROM document WHERE name = ' + connection.escape(name);
			connection.query(sql, function(error, row) {
				if(error){
					throw error;
				}
				else{
					callback(null, row);
				}
			});
		}
	}
	userModel.getDocumento = function(ui_id,name,sessionID,callback){
		if (connection){
			var sql = 'SELECT * FROM document WHERE name = ' + connection.escape(name) ;
			connection.query(sql, function(error, row) {
				if(error){
					throw error;
				}
				else{
					callback(null, row);
				}
			});
		}
	}
	userModel.getD = function(id,sessionID,callback){
		if (connection){
			//console.log("getD");
			var sql = 'SELECT * FROM document WHERE mime = "text/html" AND id = '+connection.escape(id);
			connection.query(sql, function(error, row) {
				if(error){
					throw error;
				}
				else{
					callback(null, row);
				}
			});
		}
	}
	userModel.getDup = function(id,sessionID,callback){
		if (connection){
			//console.log("getD");
			var sql = 'SELECT * FROM document WHERE id = '+connection.escape(id);
			connection.query(sql, function(error, row) {
				if(error){
					throw error;
				}
				else{
					callback(null, row);
				}
			});
		}
	}
	//retorna una tupla con un name especifico de la tabla document
	userModel.getDocumentUI = function(name_doc,name_ui,sessionID,callback){
		if (connection){
			console.log("getDocumentUI");
			var sql_ = 'SELECT document.id,document.ui_id,document.name,document.mime,document.description,document.content,document.created_at, document.updated_at FROM document, ui WHERE document.name = ' + connection.escape(name_doc) + 'AND ui.name='+ connection.escape(name_ui);
			connection.query(sql_, function(error, row) {
				if(error){
					throw error;
				}
				else{
					callback(null, row);
				}
			});
		}
	}
	//insertar usuario
	userModel.insertUser = function(userData,callback){
		if (connection) {
			console.log( connection.escape(userData.id) + connection.escape(userData.db_id) + connection.escape(userData.email) + connection.escape(userData.rol));
			//alert( connection.escape(userData.id) + connection.escape(userData.db_id) + connection.escape(userData.email) + connection.escape(userData.rol));
			connection.query('INSERT INTO dbaccess (id, db_id, email, rol) VALUES (?,?,?,?)', [userData.id,userData.db_id,userData.email,userData.rol], function(error, result) {
				if(error){
					throw error;
				}
				else{
					callback(null,{"msg" : "seccess"});
				}
			});
		}
	}
	//insertar Consulta
	userModel.insertQuery = function(userData,callback){
		if (connection) {
			connection.query('INSERT INTO query (id, category, name, description, db_id, sql_, error, ptypes, email, created_at)VALUES(?,?,?,?,?,?,?,?,?,?)', [userData.id, userData.category, userData.name, userData.description, userData.db_id, userData.sql_, userData.err, userData.ptypes, userData.email, userData.created_at], function(error, result) {
				if(error){
					throw error;
				}
				else{
					callback(null,{"msg" : "seccess"});
				}
			});
		}
	}
	//insertar view
	userModel.insertView = function(userData,callback){
		if (connection) {
			connection.query('INSERT INTO view (id, name, query_id, sql_, error, created_at)VALUES(?,?,?,?,?,?)', [userData.id, userData.name, userData.query_id, userData.sql_, userData.err, userData.created_at], function(error, result) {
				if(error){
					throw error;
				}
				else{
					callback(null,{"msg" : "seccess"});
				}
			});
		}
	}
	//insertar DB
	userModel.insertDB = function(userData,callback){
		if (connection) {
			connection.query('INSERT INTO db (id, name, description, user, password, dbname, dsn, hostsocket, classname,subprotocol, params) VALUES (?,?,?,?,?,?,?,?,?,?,?)', 
				[userData.id,userData.name,userData.description,userData.user,userData.password,userData.dbname,userData.dsn,userData.hostsocket,
				userData.classname,userData.subprotocol,userData.params], function(error, result) {
				if(error){
					throw error;
				}
				else{
					callback(null,{"msg" : "seccess"});
				}
			});
		}
	}
	//insertar Documento
	userModel.insertDoc = function(userData,callback){
		if (connection) {
			connection.query('INSERT INTO document (id, ui_id, name, mime, description, content, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?)', 
				[userData.id,userData.ui_id,userData.name,userData.mime,userData.description,userData.content,userData.created_at,userData.updated_at], function(error, result) {
				if(error){
					throw error;
				}
				else{
					callback(null,{"msg" : "seccess"});
				}
			});
		}
	}
	//insertar Ui
	userModel.insertUi = function(userData,callback){
		if (connection) {
			connection.query('INSERT INTO ui (id, name, description, index_, email, ekey, created_at) VALUES (?,?,?,?,?,?,?)', 
				[userData.id,userData.name,userData.description,userData.index_,userData.email,userData.ekey,userData.created_at], function(error, result) {
				if(error){
					throw error;
				}
				else{
					callback(null,{"msg" : "seccess"});
				}
			});
		}
	}
	//actualizar un usuario
	userModel.updateUser = function(userData, callback){
		//console.log(userData); return;
		if(connection){
			var sql = 'UPDATE dbaccess SET db_id = ' + connection.escape(userData.db_id) + ',' +  
			'email = ' + connection.escape(userData.email) + ',' +  
			'rol = ' + connection.escape(userData.rol) +
			'WHERE id = ' + userData.id;
			connection.query(sql, function(error, result) {
				if(error){
					throw error;
				}
				else{
					callback(null,{"msg":"success"});
				}
			});
		}
	}
	//actualizar un usuario
	userModel.updateDB = function(userData, callback){
		if(connection){
			var sql = 'UPDATE db SET name = ' + connection.escape(userData.name) + ',' +  
					'description = ' + connection.escape(userData.description) + ',' +  
					'user = ' + connection.escape(userData.user) + ',' +  
					'password = ' + connection.escape(userData.password) + ',' +  
					'dbname = ' + connection.escape(userData.dbname) + ',' +  
					'dsn = ' + connection.escape(userData.dsn) + ',' +  
					'hostsocket = ' + connection.escape(userData.hostsocket) + ',' +  
					'classname = ' + connection.escape(userData.classname) + ',' +  
					'subprotocol = ' + connection.escape(userData.subprotocol) + ',' +  
					'params = ' + connection.escape(userData.params) + 
					'WHERE id = ' + connection.escape(userData.id);
			connection.query(sql, function(error, result) {
				if(error){
					throw error;
				}
				else{
					callback(null,{"msg":"success"});
				}
			});
		}
	}
	//update documento
	userModel.updateDoc = function(userData, callback){
		if(connection){
			var sql = 'UPDATE document SET ui_id = ' + connection.escape(userData.ui_id) + ',' +  
					'name = ' + connection.escape(userData.name) + ',' +  
					'mime = ' + connection.escape(userData.mime) + ',' +  
					'description = ' + connection.escape(userData.description) + ',' +  
					'content = ' + connection.escape(userData.content) + ',' +  
					'created_at = ' + connection.escape(userData.created_at) + ',' +  
					'updated_at = ' + connection.escape(userData.updated_at) + 
					'WHERE id = ' + userData.id;
			connection.query(sql, function(error, result) {
				if(error){
					throw error;
				}
				else{
					callback(null,{"msg":"success"});
				}
			});
		}
	}
	//Subir documento de forma externa.
	//Una vez que se haya verificado que existe la ui y el documento en la base de datos se actualiza el campo content
	userModel.updateDocExt = function(docData, callback){
		if(connection){
			var sql = 'UPDATE document SET content = ' + connection.escape(docData.content) + ',' +  
					'updated_at = ' + connection.escape(docData.updated_at) + 
					'WHERE name = ' + connection.escape(docData.name_doc) + 
					' and ui_id = ' + connection.escape(docData.ui_id);
			connection.query(sql, function(error, result) {
				if(error){
					throw error;
				}
				else{
					callback(null,{"msg":"success"});
				}
			});
		}
	}
	//eliminamos un usuario por su id
	userModel.deleteUser = function(id, callback){
		if(connection){
			var sqlExists = 'SELECT * FROM dbaccess WHERE id = ' + connection.escape(id);
			connection.query(sqlExists, function(err, row) {
				//si existe la id del usuario a eliminar
				if(row){
					var sql = 'DELETE FROM dbaccess WHERE id = ' + connection.escape(id);
					connection.query(sql, function(error, result) {
						if(error){
							throw error;
						}
						else{
							callback(null,{"msg":"deleted"});
						}
					});
				}
				else{
					callback(null,{"msg":"notExist"});
				}
			});
		}
	}
	//eliminamos una consulta por su id
	userModel.deleteQuery = function(id, callback){
		if(connection){
			var sqlExists = 'SELECT * FROM query WHERE id = ' + connection.escape(id);
			connection.query(sqlExists, function(err, row) {
				//si existe la id del usuario a eliminar
				if(row){
					var sql = 'DELETE FROM query WHERE id = ' + connection.escape(id);
					connection.query(sql, function(error, result) {
						if(error){
							throw error;
						}
						else{
							callback(null,{"msg":"deleted"});
						}
					});
				}
				else{
					callback(null,{"msg":"notExist"});
				}
			});
		}
	}
	//eliminamos un usuario por su id
	userModel.deleteDB = function(id, callback){
		if(connection){
			var sqlExists = 'SELECT * FROM db WHERE id = ' + connection.escape(id);
			connection.query(sqlExists, function(err, row) {
				//si existe la id del usuario a eliminar
				if(row){
					var sql = 'DELETE FROM db WHERE id = ' + connection.escape(id);
					connection.query(sql, function(error, result) {
						if(error){
							throw error;
						}
						else{
							callback(null,{"msg":"deleted"});
						}
					});
				}
				else{
					callback(null,{"msg":"notExist"});
				}
			});
		}
	}

	//eliminamos view por su id
	userModel.deleteView = function(id, callback){
		if(connection){
			var sqlExists = 'SELECT * FROM view WHERE id = ' + connection.escape(id);
			connection.query(sqlExists, function(err, row) {
				//si existe la id del usuario a eliminar
				if(row){
					var sql = 'DELETE FROM view WHERE id = ' + connection.escape(id);
					connection.query(sql, function(error, result) {
						if(error){
							throw error;
						}
						else{
							callback(null,{"msg":"deleted"});
						}
					});
				}
				else{
					callback(null,{"msg":"notExist"});
				}
			});
		}
	}
	//eliminamos ui por su id
	userModel.deleteUi = function(id, callback){
		if(connection){
			var sqlExists = 'SELECT * FROM ui WHERE id = ' + connection.escape(id);
			connection.query(sqlExists, function(err, row) {
				//si existe la id del usuario a eliminar
				if(row){
					var sql = 'DELETE FROM ui WHERE id = ' + connection.escape(id);
					connection.query(sql, function(error, result) {
						if(error){
							throw error;
						}
						else{
							callback(null,{"msg":"deleted"});
						}
					});
				}
				else{
					callback(null,{"msg":"notExist"});
				}
			});
		}
	}
	//eliminamos doc por su id
	userModel.deleteDoc = function(id, callback){
		if(connection){
			var sqlExists = 'SELECT * FROM document WHERE id = ' + connection.escape(id);
			connection.query(sqlExists, function(err, row) {
				//si existe la id del usuario a eliminar
				if(row){
					var sql = 'DELETE FROM document WHERE id = ' + connection.escape(id);
					connection.query(sql, function(error, result) {
						if(error){
							throw error;
						}
						else{
							callback(null,{"msg":"deleted"});
						}
					});
				}
				else{
					callback(null,{"msg":"notExist"});
				}
			});
		}
	}
	userModel.Consulta = function(userData, callback){
		var sql = userData.sql_;
		connection.query(sql, function(error, Data){
			if(error){
				throw error;
			}
			else{
				callback(null,Data);
			}
		})
	}
	userModel.end_Connection = function(){
		connection.end();
	}

module.exports = userModel ;
