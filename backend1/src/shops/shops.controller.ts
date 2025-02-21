import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('shops')
export class ShopsController {
  constructor(
    private readonly shopsService: ShopsService,
    @Inject("SHOPS_SERVICE") private readonly clientService: ClientProxy
  ) {}

  @Post()
  async create(@Body() createShopDto: CreateShopDto) {
    const shop = await this.shopsService.create(createShopDto);
    this.clientService.send('createShop', shop).subscribe((data)=>{
      console.log(data)
    })
    return shop
  }

  @Get()
  async findAll() {
    const shop = await this.shopsService.findAll();
    this.clientService.send('findAllShops', shop)
    return shop
  }
  
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const shop = await this.shopsService.findOne(+id);
    this.clientService.send('findOneShop', shop)
    return shop
  }
  
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateShopDto: UpdateShopDto) {
    
    const shop = await this.shopsService.update(+id, updateShopDto);
    this.clientService.send('updateShop', shop).subscribe((data)=>{
      console.log(data)
    })
    return shop
  }
  
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const shop = await this.shopsService.remove(+id);
    this.clientService.send('updateShop', shop).subscribe((data)=>{
      console.log(data)
    })
    return shop
  }
}
