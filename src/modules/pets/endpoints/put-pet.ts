import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { UpdatePetDTO } from '../dto/update-pet.dto';

@Injectable()
export class PutPetsService {
  constructor(private prisma: PrismaService) {}

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
}
