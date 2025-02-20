import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Customer {
  @Prop()
  id: number;

  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  age: number;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
