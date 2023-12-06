import { Module } from '@nestjs/common';
import { GetTutorsService } from './endpoints/get-tutor';
import { PostTutorsService } from './endpoints/post-tutor';
import { PutTutorsService } from './endpoints/put-tutor';
import { DeleteTutorsService } from './endpoints/delete-tutor';
import { TutorsController } from './tutors.controller';
import { PrismaService } from '../../database/PrismaService';

@Module({
  controllers: [TutorsController],
  providers: [
    PrismaService,
    GetTutorsService,
    PostTutorsService,
    PutTutorsService,
    DeleteTutorsService,
  ],
})
export class TutorsModule {}
