
export interface IEntityFactory<T>{
  create(data: any): Promise<T>;
}