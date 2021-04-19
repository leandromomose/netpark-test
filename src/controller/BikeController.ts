import { Request, Response } from "express";
import { BikeBusiness } from "../business/BikeBusiness";
import { BikeDatabase } from "../data/BikeDatabase";
import { BikeColorInputDTO, BikeIdInputDTO, BikeInputDTO, BikePriceInputDTO, BikeUpdatePriceInputDTO } from "../entities/Bike";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

const bikeBusiness = new BikeBusiness(
    new IdGenerator(),
    new Authenticator(),
    new BikeDatabase()
)

export class BikeController {
    async createBike(req: Request, res: Response): Promise<void> {
        try {
            
            const token: string = req.headers.authorization as string

            const input: BikeInputDTO = {
                token: token,
                color: req.body.color,
                gear: req.body.gear,
                brand: req.body.brand,
                model: req.body.model,
                price: req.body.price
            }

            await bikeBusiness.createBike(input)

            res.status(200).send("Bike created succesfully!")

        } catch (error) {
            res
                .status(error.statusCode || 400)
                .send({ error: error.message })
        }
    }

    async getAllBikes(req: Request, res: Response): Promise<void> {
        try {
            
            const token: string = req.headers.authorization as string

            const result = await bikeBusiness.getAllBikes(token)

            res.status(200).send(result)

        } catch (error) {
            res
                .status(error.statusCode || 400)
                .send({ error: error.message })
        }
    }

    async getBikeByColor(req: Request, res: Response): Promise<void> {
        try {
            
            const token: string = req.headers.authorization as string

            const input: BikeColorInputDTO = {
                token: token,
                color: req.query.color as string
            }

            const result = await bikeBusiness.getBikeByColor(input)

            res.status(200).send(result)

        } catch (error) {
            res
                .status(error.statusCode || 400)
                .send({ error: error.message })
        }
    }

    async getBikeByPrice(req: Request, res: Response): Promise<void> {
        try {
            
            const token: string = req.headers.authorization as string

            const input: BikePriceInputDTO = {
                token: token,
                price: req.query.price as string
            }

            const result = await bikeBusiness.getBikeByPrice(input)

            res.status(200).send(result)

        } catch (error) {
            res
                .status(error.statusCode || 400)
                .send({ error: error.message })
        }
    }

    async editBikePrice(req: Request, res: Response): Promise<void> {
        try {
            
            const token: string = req.headers.authorization as string

            const input: BikeUpdatePriceInputDTO = {
                token: token,
                id: req.params.id,
                price: req.body.price,
            }

            await bikeBusiness.editBikePrice(input)

            res.status(200).send("Bike price updated succesfully!")

        } catch (error) {
            res
                .status(error.statusCode || 400)
                .send({ error: error.message })
        }
    }

    async deleteBikeById(req: Request, res: Response): Promise<void> {
        try {
            
            const token: string = req.headers.authorization as string

            const input: BikeIdInputDTO = {
                token: token,
                id: req.params.id
            }

            await bikeBusiness.deleteBikeById(input)

            res.status(200).send("Bike deleted succesfully!")

        } catch (error) {
            res
                .status(error.statusCode || 400)
                .send({ error: error.message })
        }
    }
}