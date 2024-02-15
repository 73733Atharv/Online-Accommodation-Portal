"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Atharv Deshmukh",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Siddhi Deshmukh",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Ved Deshmukh",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Nitin Deshmukh",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);
let currentUser;
//Movements
const updateUI = function () {
  displayMovements(currentUser.movements);
  displayBalance(currentUser);
  displayInOutInterest(currentUser);
};
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = "";
  const mov = sort ? movements.slice().sort((a, b) => a - b) : movements;
  mov.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i} ${type}</div>
    <div class="movements__date">3 days ago</div>
    <div class="movements__value">${mov}rs</div>
  </div>
    `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const displayBalance = function (accn) {
  accn.balance = `${Math.trunc(
    accn.movements.reduce(function (acc, cur) {
      return acc + cur;
    })
  )} rs`;
  labelBalance.textContent = `${accn.balance}`;
};

const displayInOutInterest = function ({ movements, interestRate }) {
  const inAmount = movements
    .filter((amt) => amt > 0)
    .reduce((acc, cur) => acc + cur);
  const outAmount = movements
    .filter((amt) => amt < 0)
    .map((amt) => amt * -1)
    .reduce((acc, cur) => acc + cur);

  const interest = movements
    .filter((amt) => amt > 0)
    .map((amt) => amt * (1.2 / 100))
    .filter((int) => int >= 1)
    .reduce((acc, cur) => acc + cur);
  labelSumIn.textContent = `${Math.trunc(inAmount)}rs`;
  labelSumOut.textContent = `${Math.trunc(outAmount)}rs`;
  labelSumInterest.textContent = `${Math.trunc(interest)}rs`;
  console.log(inAmount);
  console.log(outAmount);
  console.log(interest);
};

//Genrating username;
const createUserName = function (accs) {
  accs.forEach(function (account) {
    account.userName = account.owner
      .toLowerCase()
      .split(" ")
      .map(function (str) {
        return str.charAt(0);
      })
      .join("");
  });
};
createUserName(accounts);
//console.log(accounts);

//login functionality
btnLogin.addEventListener("click", function (event) {
  event.preventDefault();
  const user = inputLoginUsername.value;
  const pin = inputLoginPin.value;
  // console.log(userName);
  // console.log(pin);
  const account = accounts.find(
    (acc) => acc.userName === user && acc.pin == pin
  );
  console.log(account);

  if (account != undefined) {
    currentUser = account;
    document.querySelector(".app").style.opacity = "1";
    updateUI();
    inputLoginUsername.value = "";
    inputLoginPin.value = "";
    inputLoginPin.blur();
  } else {
    document.querySelector(".app").style.opacity = "0";
  }
});

btnTransfer.addEventListener("click", function (event) {
  event.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const to = accounts.find(function (cur) {
    return cur.userName === inputTransferTo.value;
  });
  console.log(amount);
  console.log(to);
  console.log(amount > 0);
  console.log(Number(currentUser.balance.split(" ")[0]) >= amount);
  console.log(to);
  console.log(to.userName !== currentUser.userName);

  if (
    amount > 0 &&
    Number(currentUser.balance.split(" ")[0]) >= amount &&
    to &&
    to.userName !== currentUser.userName
  ) {
    console.log("Transfer");
    currentUser.movements.push(-amount);
    to.movements.push(amount);
    updateUI();
  }
  inputTransferAmount.value = "";
  inputTransferTo.value = "";
});
btnClose.addEventListener("click", function (event) {
  event.preventDefault();
  if (
    inputCloseUsername.value === currentUser.userName &&
    Number(inputClosePin.value) === currentUser.pin
  ) {
    const index = accounts.findIndex(function (cur) {
      return cur.userName === inputCloseUsername.value;
    });
    accounts.splice(index, 1);
    alert("Account Closed");
    document.querySelector(".app").style.opacity = "0";
  }
  inputCloseUsername.value = inputClosePin.value = "";
});
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (
    amount > 0 &&
    currentUser.movements.some((cur) => cur > 0 && cur > amount * 0.1)
  ) {
    currentUser.movements.push(amount);
    updateUI();
  }
  inputLoanAmount.value = "";
});
let sortedState = false;
btnSort.addEventListener("click", function () {
  displayMovements(currentUser.movements, !sortedState);
  sortedState = !sortedState;
});

labelBalance.addEventListener("click", function () {
  const o = Array.from(document.querySelectorAll(".movements__value"));
  console.log(o.map((ele) => ele.textContent.replace("€", "")));
});
let overallBalance;
const newArr = accounts.map((cur) => cur.movements);
overallBalance = newArr.flat();
console.log(overallBalance.reduce((acc, cur) => acc + cur));
const arr = [123, 234, 31, 55, 6];
arr.sort((a, b) => a - b);
console.log(arr);

/////////////////////////////////////////////////
