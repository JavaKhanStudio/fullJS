const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./mydb.sqlite3', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

db.run(`CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
)`, (err) => {
    if (err) {
        console.log(err);
    } else {
        // Table fraîchement créer, ajouter la data
        const insert = 'INSERT OR IGNORE INTO contacts (name, email) VALUES (?,?)';
        db.run(insert, ["contact1", "contact1@example.com"]);
        db.run(insert, ["contact2", "contact2@example.com"]);
        db.run(insert, ["contact3", "contact3@example.com"]);
        db.run(insert, ["contact4", "contact4@example.com"]);
    }
});

db.all("SELECT * FROM contacts", [], (err, rows) => {
    if (err) {
        console.log(err)
        return;
    }
    console.log(rows)
});

// Ne pas oublier de fermer la DB
db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Close the database connection.');
});


