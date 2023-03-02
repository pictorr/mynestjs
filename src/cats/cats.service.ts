import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catRepository: Repository<Cat>,
  ) {}
  async create(createCatDto: CreateCatDto) {
    const cat = new Cat();
    cat.name = createCatDto.name;
    cat.age = Number(createCatDto.age);
    cat.breed = createCatDto.breed;
    cat.id = Number((Math.random() * 50).toFixed(0));
    await this.catRepository.insert(cat);
    return cat;
  }

  findAll() {
    return this.catRepository.find();
  }

  findOne(id: number) {
    return this.catRepository.findBy({id: id});
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    const cat = await this.catRepository.findOneBy({id: id});
    cat.name = updateCatDto.name;
    cat.age = updateCatDto.age;
    cat.breed = updateCatDto.breed;
    await this.catRepository.save(cat);
    return cat;
  }

  async remove(id: number) {
    const catToRemove = await this.catRepository.findOneBy({id});
    await this.catRepository.remove(catToRemove);
    return {id: id, message: 'Cat deleted successfully'}
  }
}
