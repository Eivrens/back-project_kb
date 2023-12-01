import { situationPet, speciesPet } from 'src/shared/enums/pet.enum';

export class Pet {
  id?: string;
  name: string;
  dt_birth: Date | string;
  gender: string;
  color: string;
  description: string;
  species?: speciesPet;
  situation?: situationPet;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
