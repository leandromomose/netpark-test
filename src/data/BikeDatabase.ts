import { Bike } from "../entities/Bike"
import { BaseDatabase } from "./BaseDatabase"

export class BikeDatabase extends BaseDatabase {
    private static TABLE_NAME = "BIKESHOP_BIKE"

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
}