import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from "@nestjs/common";
import { FlowersService } from "./flowers.service";
import { CreateFlowerDto } from "./dto/create-flower.dto";
import { UpdateFlowerDto } from "./dto/update-flower.dto";
import { EventPattern } from "@nestjs/microservices";
import { HttpService } from "@nestjs/axios";

@Controller("flowers")
export class FlowersController {
  constructor(
    private readonly flowersService: FlowersService,
    private readonly httpSevice: HttpService
  ) {}

  @Post()
  create(@Body() createFlowerDto: CreateFlowerDto) {
    return this.flowersService.create(createFlowerDto);
  }

  @Post("order/:id")
  async orderFlower(@Param("id") id: string) {
    let flower = await this.flowersService.findOne(+id);
    if (!flower) {
      throw new NotFoundException("Bunday gul topilmadi");
    }

    flower.ordered += 1;
    await flower.save();
    try {
      this.httpSevice
        .post(`http://localhost:3001/flowers/order/${id}`)
        .subscribe((res) => {
          if (res) {
            console.log(res);
          }
        });
    } catch (error) {
      console.log(error);
    }
    return flower;
  }

  @Get()
  findAll() {
    return this.flowersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.flowersService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateFlowerDto: UpdateFlowerDto) {
    return this.flowersService.update(+id, updateFlowerDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.flowersService.remove(+id);
  }
}
