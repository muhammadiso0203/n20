import { Model } from 'sequelize-typescript';
import { Injectable } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Country } from './model/country.model';
import { User } from 'src/user/models/user.model';

@Injectable()
export class CountryService {
  constructor(
    @InjectModel(Country) private model: typeof Country
  ){}
  async create(createCountryDto: CreateCountryDto){
    const country = await this.model.create({...createCountryDto});
    return country;
  }

  async findAll(){
    return this.model.findAll({include: {model: User}});
  }

  async findOne(id: number){
    const category = await this.model.findByPk(id, {include: User});
    if(!category){
      return 'Not found'
    }
    return category;
  }

  async update(id: number, updateCountryDto: UpdateCountryDto){
    const category = await this.model.update(updateCountryDto, {where: {id}, returning: true});
    return category[1][0];
  }

  async remove(id: number){
    const country = await this.model.destroy({where: {id}})
    return {};
  }
}
