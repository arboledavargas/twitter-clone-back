import { ApolloDriverConfig } from "@nestjs/apollo";
import { Injectable } from "@nestjs/common";
import { GqlOptionsFactory } from "@nestjs/graphql";
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
import * as DataLoader from "dataloader";
import { User } from "../models/user.model";
import { UserService } from "../user/user.service";

@Injectable()
export class GraphQLConfig implements GqlOptionsFactory {

	constructor(private readonly userService: UserService) {}

	getUsersLoader(): DataLoader<string, User> {
    return new DataLoader<string, User>(
      async (keys: string[]) =>
        await this.userService.getUsersByIds(keys),
    )
  }

  createGqlOptions(): ApolloDriverConfig {
    return {
			typePaths: ['./**/*.gql'],
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
			context: () => ({
				usersLoader: this.getUsersLoader(),
			}),
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      }
    };
  }
}