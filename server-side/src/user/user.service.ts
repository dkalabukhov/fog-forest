import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'argon2';
import { AuthDto } from 'src/auth/dto/auth.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        favorites: true,
        orders: true,
      },
    });

    return user;
  }

  async getByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        favorites: true,
        orders: true,
      },
    });

    return user;
  }

  async create(dto: AuthDto) {
    const { name, email, password } = dto;

    return await this.prisma.user.create({
      data: {
        name,
        email,
        password: await hash(password),
      },
    });
  }
}
