import { BikeDatabase } from "../data/BikeDatabase";
import { Bike, BikeColorInputDTO, BikeIdInputDTO, BikeInputDTO, BikePriceInputDTO, BikeUpdatePriceInputDTO } from "../entities/Bike";
import { CustomError } from "../error/CustomError";
import { AuthenticationData, Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class BikeBusiness {
    constructor(
        private idGenerator: IdGenerator,
        private authenticator: Authenticator,
        private bikeDatabase: BikeDatabase
    ) {}

    async createBike(input: BikeInputDTO): Promise<void> {
        try {
            
            if(!input.color || !input.gear || !input.brand || !input.model || !input.price || !input.token) {
                throw new CustomError(422, "Fields color, gear, brand, model and price must be provided")
            }

            const tokenData: AuthenticationData = this.authenticator.getData(input.token)

            if (!tokenData) {
                throw new CustomError(422, "Access denied. Please log in")
            }

            const id: string = this.idGenerator.generate()

            const newBike: Bike = new Bike(
                id,
                input.color,
                input.gear,
                input.brand,
                input.model,
                input.price,
                tokenData.id
            )

            await this.bikeDatabase.insertBike(newBike)

        } catch (error) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    async getAllBikes(token: string): Promise<Bike[]> {
        try {
            
            if(!token){
                throw new CustomError(422, "Please log in")
            }

            const tokenData: AuthenticationData = this.authenticator.getData(token)

            if (!tokenData) {
                throw new CustomError(422, "Access denied. Please log in")
            }

            const queryResult = await this.bikeDatabase.selectAllBikes()

            if (!queryResult) {
                throw new CustomError(404, "No bikes were found");
            }

            const result = queryResult.map((item: Bike) => {
                return {
                    id: item.getId(), 
                    color: item.getColor(), 
                    gear: item.getGear(), 
                    brand: item.getBrand(), 
                    model: item.getModel(), 
                    price: item.getPrice(), 
                    authorId: item.getAuthorId()
                }
            })

            return result

        } catch (error) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    async getBikeByColor(input: BikeColorInputDTO): Promise<Bike[]> {
        try {
            
            if (!input.token || !input.color) {
                throw new CustomError(422, "Please log in")
            }

            const tokenData: AuthenticationData = this.authenticator.getData(input.token)

            if (!tokenData) {
                throw new CustomError(422, "Access denied. Please log in")
            }

            const queryResult = await this.bikeDatabase.selectBikeByColor(input.color)

            if (!queryResult) {
                throw new CustomError(404, "No bikes were found");
            }

            const result = queryResult.map((item: Bike) => {
                return {
                    id: item.getId(), 
                    color: item.getColor(), 
                    gear: item.getGear(), 
                    brand: item.getBrand(), 
                    model: item.getModel(), 
                    price: item.getPrice(), 
                    authorId: item.getAuthorId()
                }
            })

            return result

        } catch (error) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    async getBikeByPrice(input: BikePriceInputDTO): Promise<Bike[]> {
        try {
            
            if (!input.token || !input.price) {
                throw new CustomError(422, "Please log in")
            }

            const tokenData: AuthenticationData = this.authenticator.getData(input.token)

            if (!tokenData) {
                throw new CustomError(422, "Access denied. Please log in")
            }

            const queryResult = await this.bikeDatabase.selectBikeByPrice(input.price)

            if (!queryResult) {
                throw new CustomError(404, "No bikes were found");
            }

            const result = queryResult.map((item: Bike) => {
                return {
                    id: item.getId(), 
                    color: item.getColor(), 
                    gear: item.getGear(), 
                    brand: item.getBrand(), 
                    model: item.getModel(), 
                    price: item.getPrice(), 
                    authorId: item.getAuthorId()
                }
            })

            return result

        } catch (error) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    async editBikePrice(input: BikeUpdatePriceInputDTO): Promise<void> {
        try {
            
            if (!input.token || !input.id || !input.price) {
                throw new CustomError(422, "Please log in")
            }

            const tokenData: AuthenticationData = this.authenticator.getData(input.token)

            if (!tokenData) {
                throw new CustomError(422, "Access denied. Please log in")
            }

            await this.bikeDatabase.updateBikePrice(input.id, input.price)

        } catch (error) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    async deleteBikeById(input: BikeIdInputDTO): Promise<void> {
        try {
            
            if (!input.token || !input.id) {
                throw new CustomError(422, "Please log in")
            }

            const tokenData: AuthenticationData = this.authenticator.getData(input.token)

            if (!tokenData) {
                throw new CustomError(422, "Access denied. Please log in")
            }

            const queryResult = await this.bikeDatabase.deleteBikeById(input.id)

            // if (!queryResult) {
            //     throw new CustomError(404, "Bike not found");
            // }

            return queryResult

        } catch (error) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}