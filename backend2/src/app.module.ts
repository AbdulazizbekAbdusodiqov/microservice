import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FlowersModule } from './flowers/flowers.module';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [MongooseModule.forRoot("mongodb://127.0.0.1:27017/microservice"), FlowersModule, CustomersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
