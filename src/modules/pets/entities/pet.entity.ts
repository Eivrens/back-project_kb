import { $Enums } from '@prisma/client';

export class Pet {
  id?: string;
  name: string;
  dt_birth: Date;
  gender: $Enums.Gender;
  color: string;
  description: string;
  species: $Enums.Species;
  situation: $Enums.Situation;
  tutorId?: string;
  adoptionId?: string;
  createdAt: Date;
  updatedAt: Date;
  activated: boolean;
  deletedAt: Date | null;
}
