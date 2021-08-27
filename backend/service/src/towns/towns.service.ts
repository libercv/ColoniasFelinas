import { Injectable } from '@nestjs/common';
import { CreateTownInput } from './dto/create-town.input';
import { UpdateTownInput } from './dto/update-town.input';

@Injectable()
export class TownsService {
  create(createTownInput: CreateTownInput) {
    return 'This action adds a new town';
  }

  findAll() {
    return `This action returns all towns`;
  }

  findOne(id: number) {
    return `This action returns a #${id} town`;
  }

  update(id: number, updateTownInput: UpdateTownInput) {
    return `This action updates a #${id} town`;
  }

  remove(id: number) {
    return `This action removes a #${id} town`;
  }
}