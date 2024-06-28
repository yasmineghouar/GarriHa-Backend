const express = require('express');
const ParkingService = require('../Services/ParkingService');

const ParkingController = express.Router();

/*************** Add Parking ****************/
ParkingController.post("/addParking", async (req, res, next) => {
    try {
        const {parkingName, CommuneParking, WilayaParking, AdresseParking, photoParking, nombreDePlaces, PrixParHeure, DescriptionParking, SurfaceParking, Latitude, Longitude} = req.body;
        const Parking = await ParkingService.addParking(parkingName, CommuneParking, WilayaParking, AdresseParking, photoParking, nombreDePlaces, PrixParHeure, DescriptionParking, SurfaceParking, Latitude, Longitude);
        res.status(200).json(Parking);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

/*************** Afficher la liste des Parkings ****************/
ParkingController.get("/allParkings", async (req, res, next) => {
    try {
        const parkings = await ParkingService.getAllParkings();
        res.status(200).json(parkings);
        // console.log (res.message)
        console.log (parkings)
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});
 
/*************** get parking details by id ****************/
ParkingController.get("/getparking/:parkingId", async (req, res, next) => {
    try {
        const { parkingId } = req.params;
        const parking = await ParkingService.getParkingById(parkingId);
        res.status(200).json(parking);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});


module.exports = ParkingController;
