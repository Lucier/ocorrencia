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

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    // Resolvers
    OccurrencesResolver,

    // Services
    OccurrencesService,
  ],
})
export class HttpModule {}
