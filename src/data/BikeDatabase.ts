import { Bike } from "../entities/Bike"
import { CustomError } from "../error/CustomError"
import { BaseDatabase } from "./BaseDatabase"

export class BikeDatabase extends BaseDatabase {
    editBikePrice(newBike: Bike) {
        throw new Error("Method not implemented.")
    }
    private static TABLE_NAME = "BIKESHOP_BIKE"

    private static toBikeModel(bike: any): Bike {
        return new Bike(
            bike.id,
            bike.color,
            bike.gear,
            bike.brand,
            bike.model,
            bike.price,
            bike.author_id
        )
    }

    public async insertBike(bike: Bike) {
        try {
            
            await BaseDatabase.connection
            .insert({
                id: bike.getId(),
                color: bike.getColor(),
                gear: bike.getGear(),
                brand: bike.getBrand(),
                model: bike.getModel(),
                price: bike.getPrice(),
                author_id: bike.getAuthorId()
            })
            .into(BikeDatabase.TABLE_NAME)

        } catch (error) {
            throw new Error(error.sqlMessage)
        }
    }

    public async selectAllBikes(): Promise<any> {
        try {
            
            const result = await BaseDatabase.connection
            .select("*")
            .from(BikeDatabase.TABLE_NAME)

            let bikeArray: Bike[] = []

            for(let item of result){
                bikeArray.push(BikeDatabase.toBikeModel(item))
            }

            return bikeArray

        } catch (error) {
            throw new Error(error.sqlmessage || error.message)
        }
    }

    public async selectBikeByColor(color: string): Promise<any> {
        try {
            
            const result = await BaseDatabase.connection
            .select("*")
            .from(BikeDatabase.TABLE_NAME)
            .where({color: color})

            let bikeArray: Bike[] = []

            for(let item of result){
                bikeArray.push(BikeDatabase.toBikeModel(item))
            }

            return bikeArray
            

        } catch (error) {
            throw new Error(error.sqlmessage || error.message)
        }
    }

    public async selectBikeByPrice(price: string): Promise<any> {
        try {
            
            const result = await BaseDatabase.connection
            .select("*")
            .from(BikeDatabase.TABLE_NAME)
            .where({price: price})

            let bikeArray: Bike[] = []

            for(let item of result){
                bikeArray.push(BikeDatabase.toBikeModel(item))
            }

            return bikeArray
            

        } catch (error) {
            throw new Error(error.sqlmessage || error.message)
        }
    }

    public async updateBikePrice(id: string, price: string): Promise<any> {
        try {
            
            if(price){
                await BaseDatabase.connection.raw(`
                    UPDATE BIKESHOP_BIKE
                    SET price = '${price}'
                    WHERE id = '${id}';
                `)
            }

        } catch (error) {
            throw new Error(error.sqlmessage || error.message)
        }
    }

    public async deleteBikeById(id: string) {
        try {
            
            await BaseDatabase.connection
            .delete("*")
            .from(BikeDatabase.TABLE_NAME)
            .where({id: id})

        } catch (error) {
            throw new Error(error.sqlmessage || error.message)
        }
    }
}