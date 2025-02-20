import { Module } from "@nestjs/common";
import { FlowersService } from "./flowers.service";
import { FlowersController } from "./flowers.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Flower } from "./entities/flower.entity";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [
    TypeOrmModule.forFeature([Flower]),
    ClientsModule.register([
      {
        name: "FLOWERS_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: [
            "amqps://cjlwprvs:sklF36Gyn0a-Y14mVN80ixlJkzc1yPSM@cow.rmq2.cloudamqp.com/cjlwprvs",
          ],
          queue: "flowers_queue",
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [FlowersController],
  providers: [FlowersService],
})
export class FlowersModule {}
