import { Prisma, $Enums } from '@prisma/client';

export class Tutor {
  id?: string;
  name: string;
  phone: string;
  gender: $Enums.Gender;
  doc_type?: $Enums.DocumentType;
  doc_number?: string;
  email?: string;
  address?: Prisma.JsonValue;
  createdAt: Date;
  updatedAt: Date;
  activated: boolean;
  deletedAt?: Date;
}

export interface address {
  street: string;
  number?: number;
  district: string;
  city: string;
  state: string;
  cep?: string;
}
