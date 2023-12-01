import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreatePetDTO } from './dto/create-pet.dto';
import { UpdatePetDTO } from './dto/update-pet.dto';

@Injectable()
export class PetsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreatePetDTO) {
    try {
      const petExists = await this.prisma.pet.findFirst({
        where: { name: data.name },
      });

      if (petExists) {
        throw new HttpException(
          {
            message: `${data.name} já está cadastrado`,
            status: HttpStatus.BAD_REQUEST,
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const createdPet = await this.prisma.pet.create({ data });

      return {
        message: `${data.name} cadastrado com sucesso`,
        pet: createdPet,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: `Erro ao cadastrar ${data.name}`,
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const pets = await this.prisma.pet.findMany();
      const quantity = await this.prisma.pet.count();

      return { quantity, pets };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Erro ao buscar pets',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, data: UpdatePetDTO) {
    try {
      const petExists = await this.prisma.pet.findUnique({ where: { id } });

      if (!petExists) {
        throw new HttpException(
          {
            message: `${data.name} não encontrado`,
            status: HttpStatus.NOT_FOUND,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const updatedPet = await this.prisma.pet.update({ data, where: { id } });

      return {
        message: `${data.name} atualizado com sucesso`,
        pet: updatedPet,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: `Erro ao atualizar ${data.name}`,
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: string) {
    try {
      const petExists = await this.prisma.pet.findUnique({ where: { id } });

      if (!petExists) {
        throw new HttpException(
          {
            message: 'Pet não encontrado ou já deletado',
            status: HttpStatus.NOT_FOUND,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      await this.prisma.pet.delete({ where: { id } });

      return { message: 'Pet deletado com sucesso' };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Erro ao deletar pet',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
