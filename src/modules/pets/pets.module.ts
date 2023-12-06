import { Module } from '@nestjs/common';
import { GetPetsService } from './endpoints/get-pet';
import { PostPetsService } from './endpoints/post-pet';
import { PutPetsService } from './endpoints/put-pet';
import { DeletePetsService } from './endpoints/delete-pet';
import { PetsController } from './pets.controller';
import { PrismaService } from '../../database/PrismaService';

@Module({
  controllers: [PetsController],
  providers: [
    PrismaService,
    GetPetsService,
    PostPetsService,
    PutPetsService,
    DeletePetsService,
  ],
})
export class PetsModule {}
