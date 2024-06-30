
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum Visibility {
    PUBLIC = "PUBLIC",
    PRIVATE = "PRIVATE"
}

export enum TweetType {
    ORIGINAL = "ORIGINAL",
    RETWEET = "RETWEET",
    REPLY = "REPLY"
}

export interface CreateTweetInput {
    body: string;
    visibility: Visibility;
}

export interface IQuery {
    currentUser(): User | Promise<User>;
    feed(take: number, from?: Nullable<string>): FeedConnection | Promise<FeedConnection>;
}

export interface IMutation {
    createTweet(tweet: CreateTweetInput): CreateTweetPayload | Promise<CreateTweetPayload>;
    createUser(uuid: string): CreateUserPayload | Promise<CreateUserPayload>;
}

export interface CreateTweetPayload {
    tweet: Tweet;
    successfull: boolean;
}

export interface CreateUserPayload {
    user: User;
    successfull: boolean;
}

export interface FeedConnection {
    edges: FeedEdge[];
    pageInfo?: Nullable<PageInfo>;
}

export interface FeedEdge {
    cursor: string;
    node: Tweet;
}

export interface PageInfo {
    endCursor?: Nullable<string>;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export interface User {
    id: string;
    name: string;
    email: string;
    bio: string;
    location: string;
    avatarUrl: string;
    followersCount: number;
    followingCount: number;
    createdAt: string;
}

export interface Tweet {
    id: string;
    body: string;
    author: User;
    createdAt: string;
    retweetCount: number;
    likeCount: number;
    replyCount: number;
    visibility: Visibility;
    type: TweetType;
}

type Nullable<T> = T | null;
