const pool = require('../database.js');

/*************** Login ****************/
async function login(
    email,
    motDePasse
    ){
    const connection = await pool.getConnection();
    try {
    
        const [results] = await connection.query(
        'SELECT * FROM users WHERE email = ?;',
        [email]
        );
        console.log(email);
        if (results.length == 0) {
            throw new Error("Adresse mail incorrect");
        }
        const user = results[0];
        console.log(user.motDePasse)
        // Verification du mot de passe
        if (user.motDePasse != motDePasse) {
            throw new Error("Mot de passe incorrect");
        }
        // else retourner le user connecte sans le mot de passe 

       // Destructure the user object to exclude the motDePasse
       const { motDePasse: _, ...userWithoutPassword } = user;
        // console.log("userr : ", userWithoutPassword);
    return { user: userWithoutPassword };
    // return { user };
    } catch (e) {
        throw e;
    } finally {
        connection.release();
    }
}

/*************** SignUp ****************/
async function signup(
    firstName,
    lastName,
    email,
    NUmeroTel,
    motDePasse,
    PhotoUser
    ){
    const connection = await pool.getConnection();
    try {
        const [results] = await connection.query(
        'SELECT * FROM users WHERE email = ?;',
        [email]
        );
        console.log(email);
        if (results.length != 0) {
            throw new Error("Adresse mail deja utilise");
        }
        const [insertResult] = await connection.query(
            'INSERT INTO users (firstName, lastName, email, NUmeroTel, motDePasse, PhotoUser) VALUES (?, ?, ?, ?, ?, ?)',
            [firstName, lastName, email, NUmeroTel, motDePasse, PhotoUser]
        );
        const userId = insertResult.insertId;
        const [newUser] = await connection.query(
            'SELECT * FROM users WHERE userId = ?',
            [userId]
        );
        user = newUser[0];
        // return user sans le mot de passe 
        const { motDePasse: _, ...userWithoutPassword } = user;
        // return { user };
        return { user: userWithoutPassword };
    } catch (e) {
        throw e;
    } finally {
        connection.release();
    }
}
 

/*************** SignUp Google****************/
async function signupGoogle(
    firstName,
    lastName,
    email,
    NUmeroTel,
    motDePasse,
    PhotoUser
    ){
    const connection = await pool.getConnection();
    try {
        const [results] = await connection.query(
        'SELECT * FROM users WHERE email = ?;',
        [email]
        );
        console.log(email);
        if (results.length != 0) {
            return results[0];
        }
        const [insertResult] = await connection.query(
            'INSERT INTO users (firstName, lastName, email, NUmeroTel, motDePasse, PhotoUser) VALUES (?, ?, ?, ?, ?, ?)',
            [firstName, lastName, email, NUmeroTel, motDePasse, PhotoUser]
        );
        const userId = insertResult.insertId;
        const [newUser] = await connection.query(
            'SELECT * FROM users WHERE userId = ?',
            [userId]
        );
        user = newUser[0];
        // return user sans le mot de passe 
        const { motDePasse: _, ...userWithoutPassword } = user;
        // return { user };
        return { user: userWithoutPassword };
    } catch (e) {
        throw e;
    } finally {
        connection.release();
    }
}

 
module.exports = {
    login,   
    signup,    
    signupGoogle
};