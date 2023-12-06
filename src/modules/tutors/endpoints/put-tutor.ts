import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { UpdateTutorDTO } from '../dto/update-tutor.dto';

@Injectable()
export class PutTutorsService {
  constructor(private prisma: PrismaService) {}

  async update(id: string, data: UpdateTutorDTO) {
    try {
      const tutorExists = await this.prisma.tutor.findUnique({ where: { id } });

      if (!tutorExists) {
        throw new HttpException(
          {
            message: `${data.name} não encontrado`,
            status: HttpStatus.NOT_FOUND,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const updatedTutor = await this.prisma.tutor.update({
        data,
        where: { id },
      });

      return {
        message: `${data.name} atualizado com sucesso`,
        tutor: updatedTutor,
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
}
