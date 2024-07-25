import { Store } from "src/@core/entities/store.entity";
import { IStoreRepository } from "../../@core/repositories/store.repository";
import { PrismaService } from "./prisma/prisma.service";
import { Money } from "../../@core/value-objects/money.vo";


export class StoreRepository implements IStoreRepository {

  constructor(private prisma: PrismaService) { }

  private mapToUser(user: any): Store {
    return new Store(user.id, user.fullName, user.cnpj, user.email, user.password, new Money(user.balance));
  }

 async findById(id: string): Promise<Store> {
    const user = await this.prisma.store.findUnique({where: {id}});
   return this.mapToUser(user);
  }
   async findByEmail(email: string): Promise<Store> {
      const user = await this.prisma.store.findUnique({ where: { email } });
     return this.mapToUser(user);
    }

    async findByCnpj(cnpj: string): Promise<Store> {
    const user = await this.prisma.store.findUnique({where : { cnpj }});
      return this.mapToUser(user);
    }

   async save(entity: Store): Promise<void> {
        await this.prisma.store.create({
          data:{
            fullName: entity.fullName,
            cnpj: entity.cnpj,
            email: entity.email,
            password: entity.password,
            balance: entity.balance.value,
          }
        })
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
          }

        })
    }

    async delete(id: string): Promise<void> {
       await this.prisma.store.delete({where: { id } });
    }

}