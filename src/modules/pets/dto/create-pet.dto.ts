import { Pet } from '../entities/pet.entity';
import {
  IsString,
  IsNumber,
  Length,
  MaxLength,
  IsIn,
  IsISO8601,
} from 'class-validator';

export class CreatePetDTO extends Pet {
  @IsString()
  @Length(2, 20)
  name: string;

  @IsString()
  @IsISO8601()
  dt_birth: string | Date;

  @IsString()
  @MaxLength(1)
  gender: string;

  @IsString()
  @Length(1, 20)
  color: string;

  @IsString()
  @Length(1, 255)
  description: string;

  @IsNumber()
  @IsIn([1, 2])
  species?: number;

  @IsNumber()
  @IsIn([1, 2, 3])
  situation?: number;
}
