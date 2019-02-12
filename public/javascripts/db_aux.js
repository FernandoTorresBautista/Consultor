var UserModel={};


function Conectar( connect,hostc, userc, passwordc, databasec){	
	var mysql = require('mysql')
	connect = mysql.createConnection({
		host: hostc,
		user: userc,
		password: passwordc,
		database: databasec
	})
	connect.connect(function(err) {
		if(error){
			throw error;
		}
		else{
			console.log("OK");
			return ;
		}
	})
	UserModel.Consulta = function (sql_, callback){
		var sqll = sql_;
		if(connect){

		}
		connect.query(sqll, function(error, Data){
			return JSON(data);
		})
	}) 
	function end_Connection(){
		connect.end();
	}
}
