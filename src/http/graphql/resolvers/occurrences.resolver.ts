import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { OccurrencesService } from '../../../services/occurrences.service'
import { CreateOccurrenceInput } from '../inputs/create-occurrence-input'
import { Occurrence } from '../models/occurrence'

@Resolver(() => Occurrence)
export class OccurrencesResolver {
  constructor(private occurencesService: OccurrencesService) {}

  @Query(() => [Occurrence])
  occurrences() {
    return this.occurencesService.listAllOccurrences()
  }

  @Query(() => Occurrence)
  async occurrence(@Args('id') id: string) {
    const occurrence = await this.occurencesService.getOccurrenceById(id)

    return occurrence
  }

  @Query(() => [Occurrence])
  async occurrenceByStudent(@Args('student') student: string) {
    const occurrences = await this.occurencesService.getOccurrenceByStudent(
      student,
    )

    return occurrences
  }

  @Query(() => [Occurrence])
  async occurrenceByClassroom(@Args('classroom') classroom: string) {
    const occurrences = await this.occurencesService.getOccurrenceByClassroom(
      classroom,
    )

    return occurrences
  }

  @Query(() => [Occurrence])
  async occurrenceBySchool(@Args('school') school: string) {
    const occurrences = await this.occurencesService.getOccurrenceBySchool(
      school,
    )

    return occurrences
  }

  @Query(() => [Occurrence])
  async occurrenceByRegistration(@Args('registration') registration: string) {
    const occurrences =
      await this.occurencesService.getOccurrenceByRegistration(registration)

    return occurrences
  }

  @Mutation(() => Occurrence)
  createOccurrence(@Args('data') data: CreateOccurrenceInput) {
    return this.occurencesService.createOccurrence(data)
  }

  // @Mutation(() => Occurrence)
  // updateOccurrence(@Args('data') data: UpdateOccurrenceInput) {
  //   return this.occurencesService.updateOccurrence(data)
  // }

  // @Mutation(() => Occurrence)
  // removeOccurrence(@Args('id') id: string) {
  //   return this.occurencesService.removeOccurrence(id)
  // }
}
