import { Module } from '@nestjs/common';
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { validateConfig } from "./common/validate-config";
import { TweetResolver, TweetRepository, TweetService } from "./tweet";
import { PrismaService } from "./common/prisma.service";
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { UserResolver } from "./user/user.resolver";
import { UserService } from "./user/user.service";
import { UserRepository } from "./user/user.repository";
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateConfig
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.gql'],
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
    })
  ],
  controllers: [],
  providers: [TweetService, TweetResolver, UserResolver, UserService, PrismaService, TweetRepository, UserRepository],
})
export class AppModule {}