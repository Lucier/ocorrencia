import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Occurrence {
  @Field(() => ID)
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
