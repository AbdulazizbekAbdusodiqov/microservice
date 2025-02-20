import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { FlowersService } from "./flowers.service";
import { CreateFlowerDto } from "./dto/create-flower.dto";
import { UpdateFlowerDto } from "./dto/update-flower.dto";
import { EventPattern, MessagePattern } from "@nestjs/microservices";

@Controller("flowers")
export class FlowersMicroserviceController {
  constructor(private readonly flowersService: FlowersService) {}

  @EventPattern("hello")
  async hello(data: string) {
    console.log(data);
    return "Hello yetib keldi";
  }

  @MessagePattern("hi")
  async hi(data: string) {
    console.log(data);
    return "Hi yetib keldi";
  }

  @EventPattern("new_flower_created")
  create(@Body() createFlowerDto: CreateFlowerDto) {
    return this.flowersService.create(createFlowerDto);
  }

  @Get()
  findAll() {
    return this.flowersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.flowersService.findOne(+id);
  }

  @EventPattern("flower_updated")
  update(@Body() updateFlowerDto: UpdateFlowerDto) {
    return this.flowersService.update(updateFlowerDto.id!, updateFlowerDto);
  }

  @EventPattern("flower_deleted")
  remove(@Body() id: string) {
    return this.flowersService.remove(+id);
  }
}
