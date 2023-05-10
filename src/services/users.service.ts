import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import { PrismaService } from '../database/prisma/prisma.service'
import { UpdateUserInput } from '../http/graphql/inputs/update-user-input'
import * as bcrypt from 'bcrypt'

interface CreateUserParams {
  name: string
  email: string
  password: string
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  listAllUsers() {
    return this.prisma.user.findMany()
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    })
  }

  findById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    })
  }

  async create({ name, email, password }: CreateUserParams) {
    const hash = bcrypt.hashSync(password, 8)

    const userAlreadyExists = await this.findByEmail(email)

    if (userAlreadyExists) {
      throw new ConflictException('Usuário já cadastrado')
    }

    if (!hash) {
      throw new InternalServerErrorException('Problemas ao salvar a senha')
    }

    return this.prisma.user.create({
      data: {
        name,
        email,
        password: hash,
      },
    })
  }

  async update(id: string, data: UpdateUserInput) {
    return await this.prisma.user.update({
      where: {
        id,
      },
      data,
    })
  }

  async remove(id: string) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    })
  }
}
