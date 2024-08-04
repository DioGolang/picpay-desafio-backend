import { Store } from "src/@core/entities/store.entity";
import { IStoreRepository } from "../../@core/repositories/store.repository";
import { PrismaService } from "./prisma/prisma.service";
import { Money } from "../../@core/value-objects/money.vo";
import { Inject, Injectable } from "@nestjs/common";
import { isUUID } from "class-validator";
import { IHasher } from "../../@core/interfaces/hasher.interface";

@Injectable()
export class StoreRepository implements IStoreRepository {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('IHasher') private readonly hasher: IHasher
  ) {}

  private mapToStore(store: any): Store | null {
    if (!store) {
      return null;
    }
    return new Store(
      store.id,
      store.fullName,
      store.cnpj,
      store.email,
      store.password,
      new Money(store.balance),
      this.hasher
    );
  }

  async findById(id: string): Promise<Store | null> {
    const storeData = await this.prisma.store.findUnique({ where: { id } });
    return this.mapToStore(storeData);
  }

  async findOne(idOrEmail: string): Promise<Store | null> {
    const isId = isUUID(idOrEmail, 4);
    const storeData = await this.prisma.store.findFirst({
      where: isId ? { id: idOrEmail } : { email: idOrEmail }
    });
    return this.mapToStore(storeData);
  }

  async findByEmail(email: string): Promise<Store | null> {
    const storeData = await this.prisma.store.findUnique({ where: { email } });
    return this.mapToStore(storeData);
  }

  async findByCnpj(cnpj: string): Promise<Store | null> {
    const storeData = await this.prisma.store.findUnique({ where: { cnpj } });
    return this.mapToStore(storeData);
  }

  async save(entity: Store): Promise<void> {
    await this.prisma.store.create({
      data: {
        fullName: entity.fullName,
        cnpj: entity.cnpj,
        email: entity.email,
        password: entity.password,
        balance: entity.balance.value,
      },
    });
  }

  async update(entity: Store): Promise<void> {
    await this.prisma.store.update({
      where: { id: entity.id },
      data: {
        fullName: entity.fullName,
        cnpj: entity.cnpj,
        email: entity.email,
        password: entity.password,
        balance: entity.balance.value,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.store.delete({ where: { id } });
  }

  async findByConditions(conditions: { [key: string]: any }): Promise<Store | null> {
    try {
      const storeData = await this.prisma.store.findFirst({ where: conditions });
      return storeData ? this.mapToStore(storeData) : null;
    } catch (error) {
      throw new Error(`Error finding store with conditions ${JSON.stringify(conditions)}: ${error.message}`);
    }
  }
}