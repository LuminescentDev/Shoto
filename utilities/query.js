module.exports = (client, args) => {
	client.query = async function query(args) {
		await client.con.query(args, (err, rows) =>{
			if(err) return err;
			return rows;
		});
	};
};