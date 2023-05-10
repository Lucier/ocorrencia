import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { User } from '../models/user'
import { UsersService } from '../../../services/users.service'
import { CreateUserInput } from '../inputs/create-user-input'

@Resolver(() => User)
export class UserResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [User])
  users() {
    return this.usersService.listAllUsers()
  }

  @Query(() => User)
  async userById(@Args('id') id: string) {
    const user = await this.usersService.findById(id)

    return user
  }

  @Query(() => User)
  async userByEmail(@Args('email') email: string) {
    const user = await this.usersService.findByEmail(email)

    return user
  }

  @Mutation(() => User)
  createUser(@Args('data') data: CreateUserInput) {
    return this.usersService.create(data)
  }
}
