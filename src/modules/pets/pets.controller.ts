import {
  Body,
  Controller,
  Param,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { GetPetsService } from './endpoints/get-pet';
import { PostPetsService } from './endpoints/post-pet';
import { PutPetsService } from './endpoints/put-pet';
import { DeletePetsService } from './endpoints/delete-pet';
import { CreatePetDTO } from './dto/create-pet.dto';
import { UpdatePetDTO } from './dto/update-pet.dto';

@Controller('pets')
export class PetsController {
  constructor(
    private readonly getPetsService: GetPetsService,
    private readonly postPetsService: PostPetsService,
    private readonly putPetsService: PutPetsService,
    private readonly deletePetsService: DeletePetsService,
  ) {}

  @Post('register')
  async createPet(@Body() data: CreatePetDTO) {
    return this.postPetsService.create(data);
  }

  @Get('get')
  async getPets() {
    return this.getPetsService.findAll();
  }

  @Put(':id')
  async updatePet(@Param('id') id: string, @Body() data: UpdatePetDTO) {
    return this.putPetsService.update(id, data);
  }

  @Delete(':id')
  async deletePet(@Param('id') id: string) {
    return this.deletePetsService.delete(id);
  }
}
