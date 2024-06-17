import { Module } from '@nestjs/common';
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { validateConfig } from "./common/validate-config";
import { TweetResolver, TweetRepository, TeeetService } from "./tweet";
import { PrismaService } from "./common/prisma.service";
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateConfig
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.gql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
    })
  ],
  controllers: [],
  providers: [TeeetService, TweetResolver, PrismaService, TweetRepository],
})
export class AppModule {}