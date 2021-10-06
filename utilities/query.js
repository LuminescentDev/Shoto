module.exports = (client, args) => {
    client.query = function query(args) {
        client.con.query(args, (err, rows) =>{
            if(err) return err;
            return rows;
        })
    }
}