import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreatePetDTO } from '../dto/create-pet.dto';

@Injectable()
export class PostPetsService {
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
}
