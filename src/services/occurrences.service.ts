import { Injectable } from '@nestjs/common'
import { PrismaService } from '../database/prisma/prisma.service'

interface CreateOccurrenceParams {
  student: string
  school: string
  classroom: string
  sex: string
  age: number
  registration: string
  description: string
}

interface UpdateOccurrenceParams {
  id: string
  student: string
  school: string
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

  getOccurrenceByRegistration(registration: string) {
    return this.prisma.occurrence.findFirst({
      where: {
        registration,
      },
    })
  }

  async createOccurrence({
    student,
    school,
    classroom,
    sex,
    age,
    registration,
    description,
  }: CreateOccurrenceParams) {
    return this.prisma.occurrence.create({
      data: {
        student,
        school,
        classroom,
        sex,
        age,
        registration,
        description,
      },
    })
  }

  async updateOccurrence({
    id,
    student,
    school,
    classroom,
    sex,
    age,
    registration,
    description,
  }: UpdateOccurrenceParams) {
    return this.prisma.occurrence.update({
      where: {
        id,
      },
      data: {
        ...(student && { student }),
        ...(school && { school }),
        ...(classroom && { classroom }),
        ...(sex && { sex }),
        ...(age && { age }),
        ...(registration && { registration }),
        ...(description && { description }),
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
