const pool = require('../database.js');
const qr = require('qrcode'); //  bibliothèque pour generer les codes QR


/*************** create Reservation ****************/
async function createReservation(
    iduser,
    idparking,
    DateReservation,
    HeureDebut,
    HeureFin
) {
    const connection = await pool.getConnection();
    try {
        const [results] = await connection.query(
            'SELECT * FROM parkings WHERE parkingId = ?;',
            [idparking]
        );
        console.log(idparking);
        if (results.length === 0) {
            throw new Error("Le parking n'existe pas");
        }

        const parking = results[0];

        if (HeureFin <= HeureDebut) {
            throw new Error("L'heure de sortie doit être supérieure à l'heure d'entrée.");
        }

        // verifier la disponibilite du parking
        const [availabilityResult] = await connection.query(
            `SELECT COUNT(*) AS OccupiedSpots 
            FROM reservations 
            WHERE idparking = ? 
            AND DateReservation = ? 
            AND 
            ((HeureDebut BETWEEN ? AND ?) OR (HeureFin BETWEEN ? AND ?) OR (HeureDebut < ? AND HeureFin > ?))`,
            [idparking, DateReservation,  HeureDebut, HeureFin, HeureDebut, HeureFin, HeureDebut, HeureFin]
        );
        const occupiedSpots = availabilityResult[0].OccupiedSpots;
        if (occupiedSpots >= parking.nombreDePlaces) {
            throw new Error("Aucune place disponible pour cette période.");
        }
        const [maxIdResult] = await connection.query(
            'SELECT IFNULL(MAX(reservationId), 0) AS maxId FROM reservations'
        );
        const maxId = maxIdResult[0].maxId;
        const newIdReservation = maxId + 1;
        const qrCodeData = 
        `${newIdReservation} - ${occupiedSpots + 1}\n` ;
        
        const qrCodeBuffer = await qr.toDataURL(qrCodeData);

        const [insertResult] = await connection.query(
            'INSERT INTO reservations (reservationId, numero, QRCode, DateReservation, HeureDebut, HeureFin, iduser, idparking) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [newIdReservation, occupiedSpots + 1, qrCodeBuffer , DateReservation, HeureDebut, HeureFin, iduser, idparking]
        );

        const reservationId = insertResult.insertId;

        const [newReservation] = await connection.query(
            'SELECT * FROM reservations WHERE reservationId = ?',
            [reservationId]
        );

        const reservation = newReservation[0];

        return reservation;
    } catch (e) {
        throw e;
    } finally {
        connection.release();
    }
}

/*************** Afficher all Reservations *************/
async function getAllReservations() {
    const connection = await pool.getConnection();
    try {
        const [reservations] = await connection.query('SELECT * FROM reservations');
        return reservations;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
}

/*************** Afficher Reservation by id *************/
async function getReservationById(reservationId) {
    const connection = await pool.getConnection();
    try {
        const [reservation] = await connection.query('SELECT * FROM reservations WHERE reservationId = ?', [reservationId]);
        if (reservation.length === 0) {
            throw new Error('Reservation not found');
        }
        return reservation[0];
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
}
  
/*************** Afficher les Reservations d'un user by id *************/
async function getReservationsUserById(userId) {
    const connection = await pool.getConnection();
    try {
        const [reservation] = await connection.query('SELECT * FROM reservations WHERE iduser = ?', [userId]);
        if (reservation.length === 0) {
            throw new Error('Aucune Reservation trouvée');
        }
        return reservation;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
}


module.exports = {
    createReservation,  
    getAllReservations, 
    getReservationById,
    getReservationsUserById
};