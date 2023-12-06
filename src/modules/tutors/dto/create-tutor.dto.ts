import { $Enums, Prisma } from '@prisma/client';
import { Tutor } from '../entities/tutor.entity';
import {
  IsString,
  Length,
  IsIn,
  IsEmail,
  IsNumberString,
  IsJSON,
} from 'class-validator';

export class CreateTutorDTO extends Tutor {
  @IsString()
  @Length(5, 40)
  name: string;

  @IsNumberString()
  @Length(11, 11)
  phone: string;

  @IsString()
  @IsIn(['M', 'F'])
  gender: $Enums.Gender;

  @IsString()
  @IsIn(['CPF', 'RG', 'CNH', 'CNPJ'])
  doc_type?: $Enums.DocumentType;

  @IsNumberString()
  @Length(7, 14)
  doc_number: string;

  @IsEmail()
  email: string;

  @IsJSON()
  address?: Prisma.JsonValue;
}
