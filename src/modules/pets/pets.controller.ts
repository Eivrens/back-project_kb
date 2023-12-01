import {
  Body,
  Controller,
  Param,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDTO } from './dto/create-pet.dto';
import { UpdatePetDTO } from './dto/update-pet.dto';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post('register')
  async createPet(@Body() data: CreatePetDTO) {
    return this.petsService.create(data);
  }

  @Get('get')
  async getPets() {
    return this.petsService.findAll();
  }

  @Put(':id')
  async updatePet(@Param('id') id: string, @Body() data: UpdatePetDTO) {
    return this.petsService.update(id, data);
  }

  @Delete(':id')
  async deletePet(@Param('id') id: string) {
    return this.petsService.delete(id);
  }
}
