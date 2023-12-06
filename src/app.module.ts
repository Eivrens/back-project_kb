import { Module } from '@nestjs/common';
import { PetsModule } from './modules/pets/pets.module';
import { TutorsModule } from './modules/tutors/tutors.module';

@Module({
  imports: [PetsModule, TutorsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
