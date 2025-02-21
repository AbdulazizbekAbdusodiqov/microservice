import { Injectable } from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Shop } from './entities/shop.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShopsService {

  constructor(
      @InjectRepository(Shop)
      private readonly shopRepo: Repository<Shop>
    ) {}
  

  create(createShopDto: CreateShopDto) {
    return this.shopRepo.save(createShopDto)
  }

  findAll() {
    return this.shopRepo.find()
  }

  findOne(id: number) {
    return this.shopRepo.findOneBy({id})
  }

  update(id: number, updateShopDto: UpdateShopDto) {
    return this.shopRepo.update({id}, updateShopDto)
  }

  remove(id: number) {
    return this.shopRepo.delete({id})
  }
}
