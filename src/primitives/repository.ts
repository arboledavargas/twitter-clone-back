import { IQuery } from "./query";

export interface IRepository<M, Q> {
	save(model: M): void;
	queryMany(query: IQuery<Q>): Promise<M[]>;
	queryOne(query: IQuery<Q>): Promise<M | null>;
}