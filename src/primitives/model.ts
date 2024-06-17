export interface IModel {
	id: string | undefined
	isNew(): boolean
}

export abstract class Model implements IModel {

	id: string | undefined

	constructor(id: string | undefined){
		this.id = id
	}

	isNew(): boolean {
		return this.id === undefined
	}

}