import { Injectable } from '@nestjs/common'
import { PrismaService } from '../database/prisma/prisma.service'

interface CreateOccurrenceParams {
  student: string
  school: string
  classroom: string
  sex: string
  age: string
  registration: string
  date: string
  description: string
}

// interface UpdateOccurrenceParams {
//   id: string
//   student: string
//   school: string
//   classroom: string
//   sex: string
//   age: number
//   registration: string
//   date: string
//   description: string
// }

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
    return this.prisma.occurrence.findMany({
      where: {
        student: {
          equals: student,
          mode: 'insensitive',
        },
      },
    })
  }

  getOccurrenceByClassroom(classroom: string) {
    return this.prisma.occurrence.findMany({
      where: {
        classroom,
      },
    })
  }

  getOccurrenceByRegistration(registration: string) {
    return this.prisma.occurrence.findMany({
      where: {
        registration,
      },
    })
  }

  getOccurrenceBySchool(school: string) {
    return this.prisma.occurrence.findMany({
      where: {
        school: {
          equals: school,
          mode: 'insensitive',
        },
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
    date,
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
        date,
        description,
      },
    })
  }

  // async updateOccurrence({
  //   id,
  //   student,
  //   school,
  //   classroom,
  //   sex,
  //   age,
  //   registration,
  //   date,
  //   description,
  // }: UpdateOccurrenceParams) {
  //   return this.prisma.occurrence.update({
  //     where: {
  //       id,
  //     },
  //     data: {
  //       ...(student && { student }),
  //       ...(school && { school }),
  //       ...(classroom && { classroom }),
  //       ...(sex && { sex }),
  //       ...(age && { age }),
  //       ...(registration && { registration }),
  //       ...(date && { date }),
  //       ...(description && { description }),
  //     },
  //   })
  // }

  // async update(
  //   where: Prisma.OccurrenceWhereUniqueInput,
  //   data: Prisma.OccurrenceUpdateInput,
  // ) {
  //   const occurrence = this.prisma.occurrence.update({
  //     where,
  //     data,
  //   })

  //   return occurrence
  // }

  // async removeOccurrence(id: string) {
  //   return this.prisma.occurrence.delete({
  //     where: {
  //       id,
  //     },
  //   })
  // }
}
