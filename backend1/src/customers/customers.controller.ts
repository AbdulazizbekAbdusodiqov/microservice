import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from "@nestjs/common";
import { CustomersService } from "./customers.service";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { ClientProxy } from "@nestjs/microservices";

@Controller("customers")
export class CustomersController {
  constructor(
    private readonly customersService: CustomersService,
    @Inject("CUSTOMERS_SERVICE") private readonly clientService: ClientProxy
  ) {}

  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    const customer = await this.customersService.create(createCustomerDto);
    this.clientService.emit("createCustomer", customer);
    return customer;
  }

  @Get()
  async findAll() {
    const customers = await this.customersService.findAll();
    return customers;
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.customersService.findOne(+id);
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateCustomerDto: UpdateCustomerDto
  ) {
    await this.customersService.update(+id, updateCustomerDto);
    const customer = await this.customersService.findOne(+id);
    this.clientService.emit("updateCustomer", customer);
    return customer;
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    await this.customersService.remove(+id);
    this.clientService.emit("removeCustomer", id);
    return id;
  }
}
