import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee) private employeeRepo: Repository<Employee>,
  ){}
  create(createEmployeeDto: CreateEmployeeDto) {
    const employee = this.employeeRepo.create(createEmployeeDto)
    return this.employeeRepo.save(employee);
  }

  findAll() {
    return this.employeeRepo.find();
  }

  findOne(id: number) {
    return this.employeeRepo.findOne(id, {
      relations: ['manager', 'directReports', 'meetings']
    });
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return this.employeeRepo.delete(id);
  }
}
