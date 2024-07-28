import { Store } from "src/@core/entities/store.entity";
import { IStoreRepository } from "../../@core/repositories/store.repository";
import { PrismaService } from "./prisma/prisma.service";
import { Money } from "../../@core/value-objects/money.vo";
import { Injectable } from "@nestjs/common";
import { isUUID } from "class-validator";

@Injectable()
export class StoreRepository implements IStoreRepository {

  constructor(private prisma: PrismaService) { }

  private mapToStore(store: any): Store {
    return new Store(store.id, store.fullName, store.cnpj, store.email, store.password, new Money(store.balance));
  }

 async findById(id: string): Promise<Store> {
    const store = await this.prisma.store.findUnique({where: {id}});
   return this.mapToStore(store);
  }

  async findOne(idOrEmail: string): Promise<Store> {
    const isId = isUUID(idOrEmail, 4);
    const store = await this.prisma.store.findFirst({
      where: isId
        ? { id: idOrEmail }
        : { email: idOrEmail }
    });

    if (!store) {
      return null;
    }

    return this.mapToStore(store);
  }

   async findByEmail(email: string): Promise<Store> {
      const store = await this.prisma.store.findUnique({ where: { email } });
     return this.mapToStore(store);
    }

    async findByCnpj(cnpj: string): Promise<Store> {
    const store = await this.prisma.store.findUnique({where : { cnpj }});
      return this.mapToStore(store);
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
          where :{ id: entity.id },
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
       await this.prisma.store.delete({where: { id } });
    }

  async findByConditions(conditions: { [key: string]: any }): Promise<Store | null> {
    try {
      const store = await this.prisma.store.findFirst({ where: conditions });
      return store ? this.mapToStore(store) : null;
    } catch (error) {
      throw new Error(`Error finding store with conditions ${JSON.stringify(conditions)}: ${error.message}`);
    }
  }

}