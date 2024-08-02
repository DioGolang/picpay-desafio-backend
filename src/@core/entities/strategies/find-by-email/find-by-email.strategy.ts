export interface FindByEmailStrategy<T>{
  findByEmail(email: string): Promise<T>;
}