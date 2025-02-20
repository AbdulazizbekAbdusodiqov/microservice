import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type FlowerDocument = HydratedDocument<Flower>;

@Schema()
export class Flower {
  @Prop()
  id: number;

  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  image: string;

  @Prop()
  ordered: number;
}

export const FlowerSchema = SchemaFactory.createForClass(Flower);
