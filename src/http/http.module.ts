import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { DatabaseModule } from '../database/database.module'
import { OccurrencesService } from '../services/occurrences.service'
import { OccurrencesResolver } from './graphql/resolvers/occurrences.resolver'
import { UserResolver } from './graphql/resolvers/users.resolver'
import { UsersService } from '../services/users.service'
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from '../auth/auth.service'
import { AuthResolver } from '../auth/auth.resolver'
import { LocalStrategy } from '../auth/strategies/local.strategy'
import { JwtStrategy } from '../auth/strategies/jwt.strategy'

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),

    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),

    // JwtModule.register({
    //   signOptions: { expiresIn: '3h' },
    //   secret: 'secret',
    // }),
  ],
  providers: [
    // Resolvers
    OccurrencesResolver,
    UserResolver,
    AuthResolver,

    // Services
    OccurrencesService,
    UsersService,
    AuthService,

    // JWT
    // JwtStrategy,

    LocalStrategy,
    JwtStrategy,
  ],
})
export class HttpModule {}
