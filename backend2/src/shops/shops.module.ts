import { Module } from "@nestjs/common";
import { ShopsService } from "./shops.service";
import { ShopsController } from "./shops.controller";
import { Shop, ShopSchema } from "./schemas/shop.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { Customer, CustomerSchema } from "src/customers/schema/customer.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Shop.name, schema: ShopSchema },{ name: Customer.name, schema: CustomerSchema }]),
  ],
  controllers: [ShopsController],
  providers: [ShopsService],
})
export class ShopsModule {}
