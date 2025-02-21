import { Module } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { ShopsController } from './shops.controller';
import { Shop } from './entities/shop.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Customer } from 'src/customers/entities/customer.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([Shop, Customer]),
      ClientsModule.register([
        {
          name: "SHOPS_SERVICE",
          transport: Transport.RMQ,
          options: {
            urls: [
              "amqps://cjlwprvs:sklF36Gyn0a-Y14mVN80ixlJkzc1yPSM@cow.rmq2.cloudamqp.com/cjlwprvs",
            ],
            queue: "shop_queue",
            queueOptions: {
              durable: false,
            },
          },
        },
      ]),
    ],
  controllers: [ShopsController],
  providers: [ShopsService],
})
export class ShopsModule {}
