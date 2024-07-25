import { PrismaService } from "./prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { Money } from "../../@core/value-objects/money.vo";
import { User} from "src/@core/entities/user.entity";

@Injectable()
export class UserRepository{
  constructor(private prisma: PrismaService ) { }

  async findById(id: string): Promise<User>{
    const user = await this.prisma.user.findUnique({where: {id}});
    return new User(user.id, user.fullName, user.cpf, user.email, user.password, new Money(user.balance))
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return new User(user.id, user.fullName, user.cpf, user.email, user.password, new Money(user.balance));
  }

  async findByCpf(cpf: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { cpf } });
    return new User(user.id, user.fullName, user.cpf, user.email, user.password, new Money(user.balance));
  }

  async save(user: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        id: user.id,
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

}