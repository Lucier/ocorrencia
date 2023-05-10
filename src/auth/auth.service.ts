import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { LoginUserInput } from './dto/login-user.input'
import { UsersService } from '../services/users.service'
import { CreateUserInput } from '../http/graphql/inputs/create-user-input'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email)
    const valid = user && (await bcrypt.compare(password, user?.password))

    if (user && valid) {
      const { password, ...result } = user
      return result
    }

    return null
  }

  async login(loginUserInput: LoginUserInput) {
    const user = await this.usersService.findByEmail(loginUserInput.email)
    const { password, ...result } = user

    return {
      access_token: this.jwtService.sign({
        email: user.email,
        sub: user.id,
      }),
      user: result,
    }
  }

  async signup(signupUserInput: CreateUserInput) {
    const user = await this.usersService.findByEmail(signupUserInput.email)

    if (user) {
      throw new Error('User already exists')
    }

    const password = await bcrypt.hash(signupUserInput.password, 10)

    return this.usersService.create({
      ...signupUserInput,
      password,
    })
  }
}
