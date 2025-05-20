class BankAccount{
    readonly accountNumber: string;
    public ownerName: string;
    private balance: number;
    static bankName: string = "TBC";
    constructor (accountNumber: string, ownerName: string, balance: number){
        this.accountNumber = accountNumber;
        this.ownerName = ownerName;
        this.balance = balance;
    }

    getBalance(){
        console.log(this.balance);       
    }
    deposit(amount: number){
        this.balance += amount;
    }
    withdraw(amount: number){
        this.balance -= amount;
    }
    getName(){
        console.log(this.ownerName);
    }
    setName(newName: string): void{
        this.ownerName = newName;
    }
};


console.log(BankAccount.bankName);
const account1 = new BankAccount("123456789", "John Doe", 1000);
const account2 = new BankAccount("987654321", "Jane Doe", 2000);
account1.getBalance();
account1.deposit(500);
account1.getBalance();
account1.withdraw(200);
account1.getBalance();
account1.getName();