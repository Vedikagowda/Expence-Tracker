const balance = document.getElementById(
    "balance"
);

const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list  = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');


const localStorageTransactions = JSON.parse(localStorage.getItem("Transactions"));
let Transactions = localStorage.getItem("Transactions") !== null ? localStorageTransactions:[];


function addTransaction(e) {
    e.preventDefault();
    if (
        text.value.trim() === "" ||
        amount.value.trim() === ""
    ) {
        alert("Please Enter Text And Value");
    } else {
        const transaction ={
            id:generateID(),
            text:text.value,
            amount: +amount.value,
        };

        Transactions.push(transaction);
        addTransactionOOM(transaction);
        updateLocalStorage();
        updateValues();
        text.value = "";
        amount.value = "";
    }
}

function generateID() {
    return Math.floor(Math.random()*100000000);
}

function addTransactionOOM(transaction) {
    const sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li");

    item.classList.add(
        transaction.amount < 0 ? "minus" : "plus"
    );

    item.innerHTML = `
    ${transaction.text}<span>${sign}${Math.abs(
    transaction.amount
  )}</span>
    <button class="delete-btn" onclick="removeTransaction(${
        transaction.id
    })">x</button> 
    `;

    list.appendChild(item);
}

function removeTransaction(id) {
    Transactions = Transactions.filter(
        (transaction) => transaction.id !==id
    );
    updateLocalStorage();
    Init();
}
 
function updateValues() {
    const amount = Transactions.map(
        transaction => transaction.amount
    );
    const total = amount
    .reduce((acc,item) => (acc += item),0)
    .toFixed(2);
    const income = amount
    .filter(item => item > 0)
    .reduce((acc,item)=> (acc += item),0)
    .toFixed(2);
    const expence =(
         amount
         .filter(item => item < 0)
         .reduce((acc,item)=> (acc += item),0) *
          -1
    ).toFixed(2);

    balance.innerText=`$${total}`;
    money_plus.innerText=`$${income}`;
    money_minus.innerText=`$${expence}`;
}

function updateLocalStorage() {
    localStorage.setItem(
        "Transactions",
        JSON.stringify(Transactions)
    );
}

//INIT app
function Init() {
    list.innerHTML="";
    Transactions.forEach(addTransactionOOM);
    updateValues();
}
 
Init();

form.addEventListener("submit",addTransaction);