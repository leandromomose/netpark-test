import express from "express";
import { BikeController } from "../controller/BikeController";


export const bikeRouter = express.Router()

const bikeController = new BikeController()

bikeRouter.post("/create", bikeController.createBike)
bikeRouter.get("/all", bikeController.getAllBikes)
bikeRouter.get("/color", bikeController.getBikeByColor)
bikeRouter.get("/price", bikeController.getBikeByPrice)
bikeRouter.put("/edit/:id", bikeController.editBikePrice)
bikeRouter.delete("/:id", bikeController.deleteBikeById)
