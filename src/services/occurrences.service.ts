import { Injectable } from '@nestjs/common'
import { PrismaService } from '../database/prisma/prisma.service'

interface CreateOccurrenceParams {
  student: string
  classroom: string
  sex: string
  age: number
  registration: string
  description: string
}

interface UpdateOccurrenceParams {
  id: string
  student: string
  classroom: string
  sex: string
  age: number
  registration: string
  description: string
}

@Injectable()
export class OccurrencesService {
  constructor(private prisma: PrismaService) {}

  listAllOccurrences() {
    return this.prisma.occurrence.findMany()
  }

  getOccurrenceById(id: string) {
    return this.prisma.occurrence.findUnique({
      where: {
        id,
      },
    })
  }

  getOccurrenceByStudent(student: string) {
    return this.prisma.occurrence.findFirst({
      where: {
        student,
      },
    })
  }

  getOccurrenceByClassroom(classroom: string) {
    return this.prisma.occurrence.findFirst({
      where: {
        classroom,
      },
    })
  }

  async createOccurrence({
    student,
    classroom,
    sex,
    age,
    description,
    registration,
  }: CreateOccurrenceParams) {
    return this.prisma.occurrence.create({
      data: {
        student,
        classroom,
        sex,
        age,
        description,
        registration,
      },
    })
  }

  async updateOccurrence({
    id,
    student,
    classroom,
    sex,
    age,
    description,
    registration,
  }: UpdateOccurrenceParams) {
    return this.prisma.occurrence.update({
      where: {
        id,
      },
      data: {
        ...(student && { student }),
        ...(classroom && { classroom }),
        ...(sex && { sex }),
        ...(age && { age }),
        ...(description && { description }),
        ...(registration && { registration }),
      },
    })
  }

  async removeOccurrence(id: string) {
    return this.prisma.occurrence.delete({
      where: {
        id,
      },
    })
  }
}
