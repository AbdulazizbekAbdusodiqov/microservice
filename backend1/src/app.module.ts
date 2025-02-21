import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FlowersModule } from "./flowers/flowers.module";
import { Flower } from "./flowers/entities/flower.entity";
import { CustomersModule } from "./customers/customers.module";
import { Customer } from "./customers/entities/customer.entity";
import { ShopsModule } from './shops/shops.module';
import { Shop } from "./shops/entities/shop.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "P@ssw0rd123!",
      database: "microservice",
      entities: [Flower, Customer, Shop],
      synchronize: true,
    }),
    FlowersModule,
    CustomersModule,
    ShopsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
