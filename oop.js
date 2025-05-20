var BankAccount = /** @class */ (function () {
    function BankAccount(accountNumber, ownerName, balance) {
        this.accountNumber = accountNumber;
        this.ownerName = ownerName;
        this.balance = balance;
    }
    BankAccount.prototype.getBalance = function () {
        console.log(this.balance);
    };
    BankAccount.prototype.deposit = function (amount) {
        this.balance += amount;
    };
    BankAccount.prototype.withdraw = function (amount) {
        this.balance -= amount;
    };
    BankAccount.prototype.getName = function () {
        console.log(this.ownerName);
    };
    BankAccount.prototype.setName = function (newName) {
        this.ownerName = newName;
    };
    BankAccount.bankName = "TBC";
    return BankAccount;
}());
;
console.log(BankAccount.bankName);
var account1 = new BankAccount("123456789", "John Doe", 1000);
var account2 = new BankAccount("987654321", "Jane Doe", 2000);
account1.getBalance();
account1.deposit(500);
account1.getBalance();
account1.withdraw(200);
account1.getBalance();
account1.getName();
