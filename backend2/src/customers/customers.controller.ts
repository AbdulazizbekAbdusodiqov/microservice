import { Controller, Get } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { CustomersService } from "./customers.service";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";

@Controller("customers")
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @MessagePattern("createCustomer")
  create(@Payload() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  async findAll() {
    const customers = await this.customersService.findAll();
    return customers;
  }

  // @MessagePattern("findAllCustomers")
  // findAll() {
  //   return this.customersService.findAll();
  // }

  @MessagePattern("findOneCustomer")
  findOne(@Payload() id: number) {
    return this.customersService.findOne(id);
  }

  @MessagePattern("updateCustomer")
  update(@Payload() updateCustomerDto: UpdateCustomerDto) {
    return this.customersService.update(
      updateCustomerDto.id,
      updateCustomerDto
    );
  }

  @MessagePattern("removeCustomer")
  remove(@Payload() id: number) {
    return this.customersService.remove(id);
  }
}
