export interface IRepository<T> {
  findById(id: string): Promise<T>;
  save(entity: T): Promise<void>;
  update(entity: T): Promise<void>;
  delete(id: string): Promise<void>;
  findOne(conditions: { [key: string]: any }): Promise<T | null>;
}