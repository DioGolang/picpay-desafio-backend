import { PrismaService } from "./prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { Money } from "../../@core/value-objects/money.vo";
import { User} from "src/@core/entities/user.entity";
import { IUserRepository } from "../../@core/repositories/user.repository";
import { isUUID } from "class-validator";

@Injectable()
export class UserRepository implements IUserRepository {

  constructor(private prisma: PrismaService ) { }



  private mapToUser(user: any): User {
    return new User(user.id, user.fullName, user.cpf, user.email, user.password, new Money(user.balance));
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return null;
    }

    return new User(
      user.id,
      user.fullName,
      user.cpf,
      user.email,
      user.password,
      new Money(user.balance)
    );
  }

 async findOne(idOrEmail: string): Promise<User> {
   const isId = isUUID(idOrEmail, 4);
   const user = await this.prisma.user.findFirst({
     where: isId
       ? { id: idOrEmail }
       : { email: idOrEmail }
   });
   return this.mapToUser(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return this.mapToUser(user);
  }

  async findByCpf(cpf: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { cpf } });
    return this.mapToUser(user);
  }

  async save(user: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        fullName: user.fullName,
        cpf: user.cpf,
        email: user.email,
        password: user.password,
        balance: user.balance.value,
      },
    });
  }

  async update(user: User): Promise<void> {
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        fullName: user.fullName,
        cpf: user.cpf,
        email: user.email,
        password: user.password,
        balance: user.balance.value,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }

  async findByConditions(conditions: { [key: string]: any }): Promise<User | null> {
    try {
      const user = await this.prisma.user.findFirst({ where: conditions });
      return user ? this.mapToUser(user) : null;
    } catch (error) {
      throw new Error(`Error finding user with conditions ${JSON.stringify(conditions)}: ${error.message}`);
    }
  }

}