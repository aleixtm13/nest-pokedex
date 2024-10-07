import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Pokemon extends Document {
    @Prop({
        unique: true,
        idex: true,
    })
    name: string;
    @Prop({
        unique: true,
        idex: true,
    })
    no: number;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);