import { Injectable } from '@nestjs/common';
import { PetDTO } from './pets.dto';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class PetsService {
  constructor(private prisma: PrismaService) {}

  async create(data: PetDTO) {
    const petExists = await this.prisma.pet.findFirst({
      where: {
        name: data.name,
      },
    });

    if (petExists) {
      throw new Error(`O ${data.name} já está cadastrado`);
    }

    const pet = await this.prisma.pet.create({
      data,
    });
    return pet;
  }

  async findAll() {
    const pets = await this.prisma.pet.findMany();

    return pets;
  }

  async update(id: string, data: PetDTO) {
    const petExists = await this.prisma.pet.findUnique({
      where: {
        id,
      },
    });

    if (!petExists) {
      throw new Error(`O pet selecionado não está cadastrado`);
    }

    return await this.prisma.pet.update({
      data,
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    const petExists = await this.prisma.pet.findUnique({
      where: {
        id,
      },
    });

    if (!petExists) {
      throw new Error(`Pet não encontrado`);
    }

    return await this.prisma.pet.delete({
      where: {
        id,
      },
    });
  }
}
