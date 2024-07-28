export interface IRepository<T> {
  findById(id: string): Promise<T>;
  save(entity: T): Promise<void>;
  update(entity: T): Promise<void>;
  delete(id: string): Promise<void>;
  findByConditions(conditions: { [key: string]: any }): Promise<T | null>;
  findOne(idOrEmail: string): Promise<T>;
}