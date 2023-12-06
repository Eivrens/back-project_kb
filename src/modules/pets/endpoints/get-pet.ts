import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class GetPetsService {
  constructor(private prisma: PrismaService) {}

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
}
