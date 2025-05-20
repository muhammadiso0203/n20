"use strict";
class BankAccount {
    constructor(accountNumber, ownerName, balance) {
        this.accountNumber = accountNumber;
        this.ownerName = ownerName;
        this.balance = balance;
    }
    get nameOwner() {
        return this.ownerName;
    }
    set changeOwnerName(name) {
        this.ownerName = name;
    }
    getBalance() {
        return this.balance;
    }
    deposit(amount) {
        this.balance += amount;
    }
    withdraw(amount) {
        this.balance -= amount;
    }
    specialName() {
        return `Owner name : ${this.ownerName}`;
    }
}
BankAccount.bankName = "Buyuk Ipak Yo'li";
class PremiumAccount extends BankAccount {
    specialName() {
        return this.ownerName;
    }
}
const bankAccount1 = new BankAccount("1234N", "Diyor", 10000);
const premiumAccount = new PremiumAccount("5678N", "Akbar", 20000);
console.log(premiumAccount.specialName());
console.log(bankAccount1.getBalance());
bankAccount1.deposit(1000);
bankAccount1.withdraw(5000);
bankAccount1.changeOwnerName = "Akmal";
console.log(bankAccount1.specialName());
console.log(bankAccount1.nameOwner);
console.log(bankAccount1.getBalance());
//# sourceMappingURL=main1.js.map