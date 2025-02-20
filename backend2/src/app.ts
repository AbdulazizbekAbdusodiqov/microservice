import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
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
    }
  );

  await app.listen();
}
bootstrap();
