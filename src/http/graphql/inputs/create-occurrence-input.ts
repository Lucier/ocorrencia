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
  age: number

  @Field()
  registration: string

  @Field()
  description: string
}
