import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateOccurrenceInput {
  @Field()
  student: string

  @Field()
  classroom: string

  @Field()
  sex: string

  @Field()
  age: number

  @Field()
  description: string

  @Field()
  registration: string
}
