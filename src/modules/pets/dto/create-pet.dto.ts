import { $Enums } from '@prisma/client';
import { Pet } from '../entities/pet.entity';
import { IsString, Length, IsIn, IsISO8601 } from 'class-validator';

export class CreatePetDTO extends Pet {
  @IsString()
  @Length(2, 20)
  name: string;

  @IsString()
  @IsISO8601()
  dt_birth: Date;

  @IsString()
  @IsIn(['M', 'F'])
  gender: $Enums.Gender;

  @IsString()
  @Length(1, 20)
  color: string;

  @IsString()
  @Length(1, 255)
  description: string;

  @IsString()
  @IsIn(['GATO', 'CACHORRO'])
  species: $Enums.Species;

  @IsString()
  @IsIn(['ACOLHIDO', 'DISPONIVEL', 'ADOTADO'])
  situation: $Enums.Situation;
}
