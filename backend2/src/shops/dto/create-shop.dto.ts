import mongoose from "mongoose";

export class CreateShopDto {
  id: number;
  name: string;
  customerId: string;
}
