
export interface IEntityFactory<T>{
  create<T>(data: any): Promise<T>;
}