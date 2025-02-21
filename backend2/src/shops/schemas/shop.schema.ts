import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema({timestamps:true})
export class Shop {
  @Prop()
  id: number;

  @Prop()
  name: string;

  @Prop({
    type: mongoose.Types.ObjectId,
    ref:"Customer"
  })
  customerId:mongoose.Types.ObjectId;
}

export const ShopSchema = SchemaFactory.createForClass(Shop);
