 export class Money {

  constructor(private readonly amount: number){ }

   get value(): number {
    return this.amount;
   }

   add(addedAmount: Money): Money{
    return new Money(this.amount + addedAmount.amount);
   }

   subtract(amountSubtracted: Money): Money{
   if (this.amount < amountSubtracted.amount){
    throw new Error('Insufficient funds');
   }
   return new Money(this.amount - amountSubtracted.amount)
   }
 }