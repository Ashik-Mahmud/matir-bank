/* 3. work for matir bank dashboard  */
let getUsername = localStorage.getItem('username');
if (!getUsername) {
    location.href = 'index.html';
} else {
    const depositMoney = document.getElementById("deposit-money");
    const withdrawMoney = document.getElementById("withdraw-money");
    const totalMoney = document.getElementById("total-money");

    /*  1. showing email address in the dashboard  */
    document.querySelector('#username').innerText = getUsername;

    /*  2. Deposit balance inside our bank  */
    const depositField = document.getElementById("deposit-field");
    const depositBtn = depositField.nextElementSibling;

    function depositBalance() {
        let value = Number(depositField.value);
        if (value <= 0) {
            alert("Please input positive value & Empty field not allowed")
        } else {
            bankUpdateBalance('deposit-money', value, false);
            depositField.value = ''
        }
    };
    depositBtn.addEventListener('click', depositBalance);

    /* 3. withdraw balance inside our bank  */
    const withdrawField = document.getElementById('withdraw-field');
    const withdrawBtn = withdrawField.nextElementSibling;

    function withdrawBalance() {
        let value = Number(withdrawField.value);
        if (value <= 0) {
            alert("Please input positive value & Empty field not allowed")
        } else {
            if (value > Number(totalMoney.innerText)) {
                alert("Now Your balance is - " + totalMoney.innerText + ' You need to withdraw into of your total balance');
            } else {
                bankUpdateBalance('withdraw-money', value, true);
                withdrawField.value = '';
                withdrawMoneyIntoLocalStorage(value);

            }
        }
    };
    withdrawBtn.addEventListener('click', withdrawBalance);

    // get by default value in the local
    function showDefaultValueIntoLocalStorage() {
        let getDepositMoney = localStorage.getItem('deposit-money');
        let getWithdrawMoney = localStorage.getItem('withdraw-money');

        if (getDepositMoney || getWithdrawMoney) {
            depositMoney.innerText = getDepositMoney;
            let totalBalance = getDepositMoney - getWithdrawMoney;
            totalMoney.innerText = totalBalance;
            withdrawMoney.innerText = getWithdrawMoney;
        }

    }
    showDefaultValueIntoLocalStorage();
    /* 4. check if not have total balance then disabled withdraw button and clear all estimate button as well  */
    function isTotalMoney() {
        let total = Number(totalMoney.innerText);
        let depositTotal = Number(depositMoney.innerText);
        let withdrawTotal = Number(withdrawMoney.innerText);
        total <= 0 ? document.querySelector('#withdraw').classList.add("disabled") : document.querySelector('#withdraw').classList.remove("disabled");

        if (withdrawTotal <= 0 && depositTotal <= 0) {
            document.querySelector('.clear-estimate-btn').classList.add('disabled'),
                document.querySelector('.transaction-btn').classList.add('disabled');
        } else {
            document.querySelector('.clear-estimate-btn').classList.remove('disabled');
            document.querySelector('.transaction-btn').classList.remove('disabled');

        }




    };

    isTotalMoney();
    /* 5. Clear Estimate Button  */
    function clearAllEstimate() {
        if (confirm("Do you want to clear your estimate? If it's clear you can't recover in future.")) {
            localStorage.removeItem('withdraw-money');
            localStorage.removeItem('deposit-money');
            document.getElementById("deposit-money").innerText = '000';
            document.getElementById("withdraw-money").innerText = '000';
            document.getElementById("total-money").innerText = '000';
            transactionArea.classList.remove('active')
            isTotalMoney();
        }
    }
    document.querySelector('.clear-estimate-btn').addEventListener('click', clearAllEstimate);
}
/* function for depositBalance & withdrawBalance */
function bankUpdateBalance(insertedId, value, isTrue) {
    const insertMoney = document.getElementById(insertedId);
    const totalMoney = document.getElementById("total-money");
    let totalBalance;
    // set & get deposit money in localStorage 
    localStorage.setItem(insertedId, Number(insertMoney.innerText) + Number(value))
    let getInsertMoney = localStorage.getItem(insertedId);
    insertMoney.innerText = getInsertMoney;
    // set & get total totalBalance in localStorage 
    totalBalance = getInsertMoney - Number(localStorage.getItem('withdraw-money'));
    if (isTrue === false) {
        document.querySelector('#deposit-modal').classList.remove('active-modal');
    } else {
        totalBalance = Number(localStorage.getItem('deposit-money')) - insertMoney.innerText;;
        document.querySelector('#withdraw-modal').classList.remove('active-modal');
    }
    totalMoney.innerText = totalBalance;
    isTotalMoney();
}

/*==========================================
Work with transaction button and area as well  
==============================================*/

const transactionBtn = document.querySelector(".transaction-btn");
const transactionArea = document.querySelector(".transaction");
const transactionClearBtn = document.querySelector(".clear-transaction-btn");

/* 1.show transaction area when users click in transactionBtn */
transactionBtn.addEventListener('click', function () {
    transactionArea.classList.toggle("active");
    if (transactionArea.classList.contains('active')) {
        transactionBtn.innerText = 'Close Transaction';
    } else {
        transactionBtn.innerText = 'Open Transaction';
    }
})

/* 2. set withdrawBalance inside of localStorage  */

function withdrawMoneyIntoLocalStorage(value) {
    let getLocalStorage = localStorage.getItem('withdrawArr');
    if (getLocalStorage == null) {
        withdrawArr = [];
    } else {
        withdrawArr = JSON.parse(getLocalStorage)
    }
    withdrawArr.push(value);
    localStorage.setItem("withdrawArr", JSON.stringify(withdrawArr));
    showInfoInsideOfTable();

}

/* 3. get withdrawBalance inside of localStorage */
function showInfoInsideOfTable() {
    const transactionBody = document.getElementById("transaction-body");
    let getLocalStorage = localStorage.getItem('withdrawArr');
    if (getLocalStorage == null) {
        withdrawArr = [];
    } else {
        withdrawArr = JSON.parse(getLocalStorage)
    }
    // get account holer name 
    let accountHolder = localStorage.getItem('username');
    // get today date 
    let todayDate = new Date().toLocaleDateString();
    // insert withdraw value inside of transaction 
    let withdrawTag = '';
    withdrawArr.forEach(element => {
        withdrawTag += `<tr>
                            <td>${todayDate}</td>
                            <td>${accountHolder}</td>
                            <td><span>${element}</span>$</td>
                            </tr>`;

    });
    transactionBody.innerHTML = withdrawTag;
    if(withdrawArr.length === 0){
        transactionClearBtn.classList.add('disabled');
    }else{
        transactionClearBtn.classList.remove('disabled');
    }
}
showInfoInsideOfTable();
/* Clear All of The Transaction  */
transactionClearBtn.addEventListener("click", function () {
    if (confirm("Do you want to remove all of transaction?")) {
        localStorage.setItem('withdrawArr', '[]');
        document.getElementById("transaction-body").innerHTML = "";
        transactionClearBtn.classList.add('disabled');

    }
})