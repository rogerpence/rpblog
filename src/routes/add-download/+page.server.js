import { DATABASE_URL } from '$env/static/private';

import mysql from 'mysql2/promise'; // Import mysql2 with promise support

const pool = mysql.createPool(DATABASE_URL);

const addDownload = async () => {
	try {
		const connection = await pool.getConnection();
		// console.log("MySQL Connection Established: ", connection.threadId);

		let sql =
			"insert into downloads (date_requested, name, country, email_address, product, family) Values('2023-06-02', 'Cranke Carl', 'Broken Arrow', 'carl@penton.com', 'The O''Jays', 'oscar')";
		const [result] = await connection.query(sql);

		//console.log(Object.keys(results));
		//console.log(Object.keys(meta[0]));
		//console.log(JSON.stringify(meta, null, 4));
		// console.log("User Query Results: ", results);
		connection.release();
		return result.insertId;
	} catch (err) {
		console.error(err);
		throw err;
	}
};

export const load = async () => {
	let newId;
	try {
		newId = await addDownload();
		console.log(`new downloaded with id = ${newId}`);
	} catch (err) {
		console.error(err);
	}

	return {
		newId
	};
};
