import { Injectable } from "@nestjs/common";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Customer } from "./entities/customer.entity";
import { Repository } from "typeorm";

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>
  ) {}

  create(createCustomerDto: CreateCustomerDto) {
    return this.customerRepo.save(createCustomerDto);
  }

  findAll() {
    return this.customerRepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return this.customerRepo.update({ id }, updateCustomerDto);
  }

  remove(id: number) {
    return this.customerRepo.delete({ id });
  }
}
