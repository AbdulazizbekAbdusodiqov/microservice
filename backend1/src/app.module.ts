import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FlowersModule } from "./flowers/flowers.module";
import { Flower } from "./flowers/entities/flower.entity";
import { CustomersModule } from "./customers/customers.module";
import { Customer } from "./customers/entities/customer.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "Ahror_2004",
      database: "microservice",
      entities: [Flower, Customer],
      synchronize: true,
    }),
    FlowersModule,
    CustomersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
