import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateFlowerDto } from "./dto/create-flower.dto";
import { UpdateFlowerDto } from "./dto/update-flower.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Flower } from "./entities/flower.entity";
import { Repository } from "typeorm";

@Injectable()
export class FlowersService {
  constructor(
    @InjectRepository(Flower) private readonly flowerRepo: Repository<Flower>
  ) {}
  create(createFlowerDto: CreateFlowerDto) {
    return this.flowerRepo.save(createFlowerDto);
  }

  findAll() {
    return this.flowerRepo.find();
  }

  async orderFlower(id: number) {
    let flower = await this.flowerRepo.findOneBy({ id });
    if (!flower) {
      throw new NotFoundException("Bunday gul topilmadi");
    }

    flower.ordered += 1;
    const updatedFlower = await this.flowerRepo.update(
      { id },
      {
        ordered: flower.ordered,
      }
    );
    return flower;
  }

  findOne(id: number) {
    return this.flowerRepo.findOneBy({ id });
  }

  update(id: number, updateFlowerDto: UpdateFlowerDto) {
    return this.flowerRepo.update({ id }, updateFlowerDto);
  }

  remove(id: number) {
    return this.flowerRepo.delete({ id });
  }
}
