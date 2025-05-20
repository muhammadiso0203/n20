class BankAccount{
    readonly accountNumber:string;
    public ownerName: string;
    private balance: number;
    static bankName:string = "Buyuk Ipak Yo'li"

    constructor(accountNumber:string,ownerName: string,balance: number){
        this.accountNumber = accountNumber
        this.ownerName = ownerName
        this.balance = balance
    }

    get nameOwner():string{
       return this.ownerName
    }

    set changeOwnerName(name:string){
       this.ownerName = name
    }

    getBalance():number{
       return this.balance
    }

    deposit(amount:number){
       this.balance += amount
    }

    withdraw(amount:number){
       this.balance -= amount
    }

    specialName():string{
        return `Owner name : ${this.ownerName}`
    }


}

class PremiumAccount extends BankAccount{
   
   override specialName():string{
      return this.ownerName
   }

   
}

const bankAccount1 = new BankAccount("1234N","Diyor",10000)
const premiumAccount = new PremiumAccount("5678N","Akbar",20000)
console.log(premiumAccount.specialName())
console.log(bankAccount1.getBalance())
bankAccount1.deposit(1000)
bankAccount1.withdraw(5000)
bankAccount1.changeOwnerName = "Akmal"
console.log(bankAccount1.specialName())
console.log(bankAccount1.nameOwner)
console.log(bankAccount1.getBalance())


