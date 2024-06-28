const express = require('express');
const ReservationService = require('../Services/ReservationService');

const ReservationController = express.Router();


/*************** Create Reservation *************/
ReservationController.post("/createReservation", async (req, res, next) => {
    try {
      const reservation = await ReservationService.createReservation(
        req.body.iduser,
        req.body.idparking,
        req.body.DateReservation,
        req.body.HeureDebut,
        req.body.HeureFin
      );
      res.status(200).json(reservation);
      next();
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
});

/*************** Afficher all Reservations *************/
ReservationController.get("/allReservations", async (req, res, next) => {
  try {
      const reservations = await ReservationService.getAllReservations();
      res.status(200).json(reservations);
  } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
  }
});

/*************** Afficher Reservations by id *************/
ReservationController.get("/getreservation/:reservationId", async (req, res, next) => {
  try {
      const { reservationId } = req.params;
      const reservation = await ReservationService.getReservationById(reservationId);
      res.status(200).json(reservation);
  } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
  }
});

/*************** Afficher les Reservations d'un user by id *************/
ReservationController.get("/allUserReservations/:iduser", async (req, res, next) => {
  try {
      const { iduser } = req.params;
      const reservations = await ReservationService.getReservationsUserById(iduser);
      res.status(200).json(reservations);
  } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
  }
});


module.exports = ReservationController;
