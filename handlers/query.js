module.exports = (client, args) => {
	client.query = function query(args) {
		return new Promise((resolve, reject) => {
			client.con.query(args, (err, rows) =>{
				if(err) return err;
				resolve(rows);
			}).on("error", err => {
				  reject(`Error: ${err.message}`);
			});
		  });
	}; 
}; 