module.exports = (client, args) => {
	client.query = function query(args) {
		return new Promise((resolve, reject) => {
			client.con.query(args, (err, rows, fields) =>{
				if(err) return err;
				resolve(rows, fields);
			}).on("error", err => {
				  reject(`Error: ${err.message}`);
			});
		  });
	}; 
}; 