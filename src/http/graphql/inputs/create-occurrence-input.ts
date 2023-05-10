import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateOccurrenceInput {
  @Field()
  student: string

  @Field()
  school: string

  @Field()
  classroom: string

  @Field()
  sex: string

  @Field()
  age: string

  @Field()
  registration: string

  @Field()
  date: string

  @Field()
  description: string
}
