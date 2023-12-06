import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class DeletePetsService {
  constructor(private prisma: PrismaService) {}

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
