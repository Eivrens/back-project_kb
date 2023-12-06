import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreateTutorDTO } from '../dto/create-tutor.dto';

@Injectable()
export class PostTutorsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTutorDTO) {
    try {
      const tutorExists = await this.prisma.tutor.findFirst({
        where: {
          OR: [
            { doc_number: data.doc_number },
            { phone: data.phone },
            { email: data.email },
          ],
        },
      });

      if (tutorExists) {
        throw new HttpException(
          {
            message: `${data.name} já está cadastrado`,
            status: HttpStatus.BAD_REQUEST,
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const createdTutor = await this.prisma.tutor.create({ data });

      return {
        message: `${data.name} cadastrado com sucesso`,
        tutor: createdTutor,
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
