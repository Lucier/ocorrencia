import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Occurrence {
  @Field(() => ID)
  id: string

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
