import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
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
  });
  app.connectMicroservice<MicroserviceOptions>({
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
  });
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [
        "amqps://cjlwprvs:sklF36Gyn0a-Y14mVN80ixlJkzc1yPSM@cow.rmq2.cloudamqp.com/cjlwprvs",
      ],
      queue: "shops_queue",
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.startAllMicroservices();

  await app.listen(process.env.PORT ?? 3002, () => {
    console.log("Backend2 server 3002-portda ishga tushdi");
  });
}
bootstrap();
