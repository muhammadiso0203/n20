import { Injectable } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import {readData,writeData} from "../utils/file.control"

@Injectable()
export class CountriesService {
  create(createCountryDto: CreateCountryDto) {
     const countries = readData()
     const newCountry = {id: !countries.length ? 1 : countries.at(-1).id + 1, ...createCountryDto}
     countries.push(newCountry)
     writeData(countries)
     return {
      statusCode: 201,
      message: "success",
      data: newCountry
     }
  }

  findAll() {
    return {
      statusCode: 200,
      message: "success",
      data: readData()
    };
  }

  findOne(id: number) {
    const countries = readData()
    const country = countries.find((country:any) => country?.id === id)
    if(!country){
      return{
        statusCode: 404,
        message: `Country with ID ${id} not found`
      }
    }
    return {
      statusCode: 200,
      message: "success",
      data: country
    }
  }

  update(id: number, updateCountryDto: UpdateCountryDto) {
    const countries = readData()
    const index = countries.findIndex((country:any) => country?.id === id)
    if(index === -1){
      return{
        statusCode: 404,
        message: `Country with ID ${id} not found`
      }
    }

    countries[index] = {id: +id, ...updateCountryDto}
    writeData(countries)
    return {
      statusCode: 200,
      message: "success",
      data: countries[index]
    }
  }

  remove(id: number) {
    const countries = readData()
    const index = countries.findIndex((country:any) => country?.id === id)
    if(index === -1){
      return{
        statusCode: 404,
        message: `Country with ID ${id} not found`
      }
    }
    countries.splice(index,1)
    writeData(countries)
    return {
      statusCode: 200,
      message: "success",
      data: {}
    }
  }
}
