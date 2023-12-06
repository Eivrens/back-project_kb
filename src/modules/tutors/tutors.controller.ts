import {
  Body,
  Controller,
  Param,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { GetTutorsService } from './endpoints/get-tutor';
import { PostTutorsService } from './endpoints/post-tutor';
import { PutTutorsService } from './endpoints/put-tutor';
import { DeleteTutorsService } from './endpoints/delete-tutor';
import { CreateTutorDTO } from './dto/create-tutor.dto';
import { UpdateTutorDTO } from './dto/update-tutor.dto';

@Controller('tutors')
export class TutorsController {
  constructor(
    private readonly getTutorsService: GetTutorsService,
    private readonly postTutorsService: PostTutorsService,
    private readonly putTutorsService: PutTutorsService,
    private readonly deleteTutorsService: DeleteTutorsService,
  ) {}

  @Post('register')
  async createTutor(@Body() data: CreateTutorDTO) {
    return this.postTutorsService.create(data);
  }

  @Get('get')
  async getTutors() {
    return this.getTutorsService.findAll();
  }

  @Put(':id')
  async updateTutor(@Param('id') id: string, @Body() data: UpdateTutorDTO) {
    return this.putTutorsService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteTutorsService.delete(id);
  }
}
