import { Module } from '@nestjs/common';
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { validateConfig } from "./common/validate-config";
import { TweetResolver, TweetRepository, TweetService } from "./tweet";
import { PrismaService } from "./common/database/prisma.service";
import { GraphQLConfig } from "./common/graphqlConfig";
import { UserModule } from "./user/user.module";
@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateConfig
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports:[UserModule],
      driver: ApolloDriver,
      useClass: GraphQLConfig
    })
  ],
  controllers: [],
  providers: [TweetService, TweetResolver, PrismaService, TweetRepository],
})
export class AppModule {}