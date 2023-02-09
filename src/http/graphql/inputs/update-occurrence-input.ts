import { Field, InputType, PartialType } from '@nestjs/graphql'
import { CreateOccurrenceInput } from './create-occurrence-input'

@InputType()
export class UpdateOccurrenceInput extends PartialType(CreateOccurrenceInput) {
  @Field()
  id: string

  @Field()
  student: string

  @Field()
  school: string

  @Field()
  classroom: string

  @Field()
  sex: string

  @Field()
  age: number

  @Field()
  registration: string

  @Field()
  description: string
}
