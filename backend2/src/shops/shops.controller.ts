import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ShopsService } from './shops.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';

@Controller()
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  @MessagePattern('createShop')
  create(@Payload() createShopDto: CreateShopDto) {
    return this.shopsService.create(createShopDto);
  }

  @MessagePattern('findAllShops')
  findAll() {
    return this.shopsService.findAll();
  }

  @MessagePattern('findOneShop')
  findOne(@Payload() id: number) {
    return this.shopsService.findOne(id);
  }

  @MessagePattern('updateShop')
  update(@Payload() updateShopDto: UpdateShopDto) {
    return this.shopsService.update(updateShopDto.id, updateShopDto);
  }

  @MessagePattern('removeShop')
  remove(@Payload() id: number) {
    return this.shopsService.remove(id);
  }
}
