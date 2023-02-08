import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { OccurrencesService } from '../../../services/occurrences.service'
import { CreateOccurrenceInput } from '../inputs/create-occurrence-input'
import { UpdateOccurrenceInput } from '../inputs/update-occurrence-input'
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

  @Query(() => Occurrence)
  async occurrenceByStudent(@Args('student') student: string) {
    const students = await this.occurencesService.getOccurrenceByStudent(
      student,
    )

    return students
  }

  @Query(() => Occurrence)
  async occurrenceByClassroom(@Args('classroom') classroom: string) {
    const classrooms = await this.occurencesService.getOccurrenceByStudent(
      classroom,
    )

    return classrooms
  }

  @Mutation(() => Occurrence)
  createOccurrence(@Args('data') data: CreateOccurrenceInput) {
    return this.occurencesService.createOccurrence(data)
  }

  @Mutation(() => Occurrence)
  updateOccurrence(@Args('data') data: UpdateOccurrenceInput) {
    return this.occurencesService.updateOccurrence(data)
  }

  @Mutation(() => Occurrence)
  removeOccurrence(@Args('id') id: string) {
    return this.occurencesService.removeOccurrence(id)
  }
}
