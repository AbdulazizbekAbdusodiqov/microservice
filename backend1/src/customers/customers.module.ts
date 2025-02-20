import { Module } from "@nestjs/common";
import { CustomersService } from "./customers.service";
import { CustomersController } from "./customers.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Customer } from "./entities/customer.entity";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer]),
    ClientsModule.register([
      {
        name: "CUSTOMERS_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: [
            "amqps://cjlwprvs:sklF36Gyn0a-Y14mVN80ixlJkzc1yPSM@cow.rmq2.cloudamqp.com/cjlwprvs",
          ],
          queue: "customers_queue",
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
