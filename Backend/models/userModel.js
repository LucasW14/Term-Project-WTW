const pool = require('./dbConnection');



async function getUserByGoogleId(google_id) {
    const queryText = "SELECT * FROM users WHERE google_id = $1";
    const values = [google_id];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

// create google user
async function createGoogleUser(user) {
    const {
        google_id,
        firstName,
        lastName,
        email,
        picture
    } = user;

    const queryText = `
        INSERT INTO users (google_id, first_name, last_name, email, picture)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;

    const values = [
        google_id,
        firstName,
        lastName,
        email,
        picture
    ];

    const result = await pool.query(queryText, values);
    return result.rows[0];
}

/* =========================
   EXISTING FUNCTIONS (KEEP)
========================= */

async function getAllUsers() {
    const queryText = "SELECT * FROM users";
    const result = await pool.query(queryText);
    return result.rows;
}

async function getUserById(google_id) {
    const queryText = "SELECT * FROM users where google_id= $1";
    const values = [google_id];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

async function deleteUser(google_id) {
    let queryText = "DELETE FROM users WHERE google_id =$1";
    const values = [google_id];
    const result = await pool.query(queryText, values);
    return result.rowCount;
}

async function addUser(name, email, password) {
    let queryText = "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *";
    let values = [name, email, password];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

module.exports = {
    getAllUsers,
    getUserById,
    deleteUser,
    addUser,
    getUserByGoogleId,
    createGoogleUser
};