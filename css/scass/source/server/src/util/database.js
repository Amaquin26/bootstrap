import sqlite3 from 'sqlite3';

const databasename = "skilldb.db";

const db = new sqlite3.Database(databasename, (err) => {
    if(err){
        console.log(err.message)
    }
});

export default db;