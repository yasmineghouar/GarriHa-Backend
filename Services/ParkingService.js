const pool = require('../database.js');


/*************** Add Parking ****************/
async function addParking(parkingName, CommuneParking, WilayaParking, AdresseParking, photoParking, nombreDePlaces, PrixParHeure, DescriptionParking, SurfaceParking, Latitude, Longitude) {
    const connection = await pool.getConnection();
    try {
        // le nom est unique
        const [existingParking] = await connection.query('SELECT * FROM parkings WHERE parkingName = ?', [parkingName]);
        if (existingParking.length > 0) {
            throw new Error('parking exist deja');
        }
        const [insertResult] = await connection.query(
            'INSERT INTO parkings (parkingName, CommuneParking, WilayaParking, AdresseParking, photoParking, nombreDePlaces, PrixParHeure, DescriptionParking, SurfaceParking, Latitude, Longitude) VALUES (?, ?, ?, ? , ?, ?, ?, ?, ?, ?, ?)',
            [parkingName, CommuneParking, WilayaParking, AdresseParking, photoParking, nombreDePlaces, PrixParHeure, DescriptionParking, SurfaceParking, Latitude, Longitude]
        );
        const newParkingId = insertResult.insertId;

        // Fetch and return the newly inserted parking
        const [Parking] = await connection.query('SELECT * FROM parkings WHERE parkingId = ?', [newParkingId]);
        return Parking[0];
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
}

/*************** Afficher la liste des Parkings ****************/
async function getAllParkings() {
    const connection = await pool.getConnection();
    try {
        const [parkings] = await connection.query('SELECT * FROM parkings');
        return parkings;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
}

/*************** get parking details by id ****************/
async function getParkingById(parkingId) {
    const connection = await pool.getConnection();
    try {
        const [parking] = await connection.query('SELECT * FROM parkings WHERE parkingId = ?', [parkingId]);
        if (parking.length === 0) {
            throw new Error('Parking not found');
        }
        return parking[0];
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
}

module.exports = {
   addParking,
   getAllParkings,
   getParkingById,
};