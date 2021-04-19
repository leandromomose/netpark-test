export class Bike {
    map: any
    constructor(
        private id: string,
        private color: string,
        private gear: number,
        private brand: string,
        private model: string,
        private price: string,
        private authorId: string
    ) {}

    public getId(): string {return this.id}
    public getColor(): string {return this.color}
    public getGear(): number {return this.gear}
    public getBrand(): string {return this.brand}
    public getModel(): string {return this.model}
    public getPrice(): string {return this.price}
    public getAuthorId(): string {return this.authorId}
}

export interface BikeInputDTO {
    token: string,
    color: string,
    gear: number,
    brand: string,
    model: string,
    price: string,
}

export interface BikeColorInputDTO {
    token: string;
    color: string;
}

export interface BikePriceInputDTO {
    token: string;
    price: string;
}

export interface BikeUpdatePriceInputDTO {
    token: string;
    id: string;
    price: string;
}

export interface BikeIdInputDTO {
    token: string;
    id: string;
}
