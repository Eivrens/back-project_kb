import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class GetTutorsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    try {
      const tutors = await this.prisma.tutor.findMany();
      const quantity = await this.prisma.tutor.count();

      return { quantity, tutors };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Erro ao buscar tutores',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
