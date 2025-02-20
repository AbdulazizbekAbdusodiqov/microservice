import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FlowersService } from "./flowers.service";
import { FlowersController } from "./flowers.controller";
import { Flower, FlowerSchema } from "./schema/flower.schema";
import { FlowersMicroserviceController } from "./flowers.microservice.controller";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Flower.name, schema: FlowerSchema }]),
    HttpModule,
  ],
  controllers: [FlowersController, FlowersMicroserviceController],
  providers: [FlowersService],
})
export class FlowersModule {}
