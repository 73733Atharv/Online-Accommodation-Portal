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
// const arr = [5, 1, 2, 3, 4, 5, 6];
// // let arr1 = arr.splice(2);
// // let a = 'abc';
// // console.log(a.padStart(10, '').length);

// // // [1]
// // //  (9) [0, 2, 3, 4, 2, 3, 4, 5, 6]
// // const set = new Set();
// // console.log(set);
// const map = new Map([
//   [1, 'a'],
//   [2, 'b'],
// ]);
// arr.forEach(function (ele, index, array) {
//   console.log(index, ele, arr);
// });

//coding challange
// Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners
// about their dog's age, and stored the data into an array (one array for each). For
// now, they are just interested in knowing whether a dog is an adult or a puppy.
// A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years
// old.
// Your tasks:
// Create a function 'checkDogs', which accepts 2 arrays of dog's ages
// ('dogsJulia' and 'dogsKate'), and does the following things:
// 1. Julia found out that the owners of the first and the last two dogs actually have
// cats, not dogs! So create a shallow copy of Julia's array, and remove the cat
// ages from that copied array (because it's a bad practice to mutate function
// parameters)
// 2. Create an array with both Julia's (corrected) and Kate's data
// 3. For each remaining dog, log to the console whether it's an adult ("Dog
// 🐶 number 1
// is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy
// ")
// 4. Run the function for both test datasets
// Test data:
// §Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// §Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
// const checkDogs = function (dogsJulia, dogsKate) {
//   let dogsJuliaCopy = [...dogsJulia];
//   dogsJuliaCopy = dogsJuliaCopy.slice(1, -2);
//   const dogs = [...dogsJuliaCopy, ...dogsKate];
//   dogs.forEach(function (age, i) {
//     const type = age >= 3 ? 'adult' : 'puppy';
//     console.log(`Dog number ${i + 1} is an ${type}, and is ${age} years old`);
//   });
// };
// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

// const arr = [1, 2, 3, 4, 5];
// const arr5 = arr.map((ele, i) => ele * 5 * i);
// console.log(arr5);
// const abc = 1 > 5 ? console.log('g') : console.log('s');
// console.log(abc);

// Let's go back to Julia and Kate's study about dogs. This time, they want to convert
// dog ages to human ages and calculate the average age of the dogs in their study.
// Your tasks:
// Create a function 'calcAverageHumanAge', which accepts an arrays of dog's
// ages ('ages'), and does the following things in order:
// 1. Calculate the dog age in human years using the following formula: if the dog is
// <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old,
// humanAge = 16 + dogAge * 4
// 2. Exclude all dogs that are less than 18 human years old (which is the same as
// keeping dogs that are at least 18 years old)
// 3. Calculate the average human age of all adult dogs (you should already know
// from other challenges how we calculate averages 😉)
// 4. Run the function for both test datasets
// Test data:
// §Data 1: [5, 2, 4, 1, 15, 8, 3]
// §Data 2: [16, 6, 10, 5, 6, 1, 4]

// const calcAverageHumanAge = function (dogAges) {
//   let dogs;
//   const averageDogHumanAge =
//     dogAges
//       .map(function (age) {
//         if (age <= 2) {
//           return 2 * age;
//         } else {
//           return 16 + age * 4;
//         }
//       })
//       .filter(function (age) {
//         return age >= 18;
//       })
//       .reduce(function (acc, cur, index) {
//         dogs = index + 1;
//         return acc + cur;
//       }) / dogs;
//   console.log(averageDogHumanAge);

//   return averageDogHumanAge;
// };
// const calcAverageHumanAge = function (dogAges) {
//   const adultDogs = dogAges
//     .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
//     .filter(age => age >= 18);
//   const average =
//     adultDogs.reduce((acc, cur) => acc + cur, 0) / adultDogs.length;
//   return average;
// };

// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
// console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));
// const account = accounts.find(acc => acc.owner === 'Steven Thomas Williams');
// console.log(account);
// let account;
// for (const acc of accounts) {
//   const { owner } = acc;
//   if (owner === 'Steven Thomas Williams') {
//     account = acc;
//     break;
//   }
// }
// console.log(account);
const z = Array.from(
  { length: 100 },
  () => Math.trunc(Math.random() * 100) + 1
);
console.log(z);
