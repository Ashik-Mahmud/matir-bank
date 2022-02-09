/* 3. work for matir bank dashboard  */
let getUsername = localStorage.getItem('username');
if (!getUsername) {
    location.href = 'index.html';
} else {

    const depositMoney = document.getElementById("deposit-money");
    const withdrawMoney = document.getElementById("withdraw-money");
    const totalMoney = document.getElementById("total-money");

    /*  1. showing email address in the dashboard  */
    const username = document.querySelector('#username').innerText = getUsername;

    /*  2. Deposit balance inside our bank  */
    const depositField = document.getElementById("deposit-field");
    const depositBtn = depositField.nextElementSibling;

    function depositBalance() {
        let value = Number(depositField.value);
        if (value <= 0) {
            alert("Please input positive value & Empty field not allowed")
        } else {
            // set & get deposit money in localStorage 
            localStorage.setItem('deposit-money', Number(depositMoney.innerText) + Number(value))
            let getDepositMoney = localStorage.getItem('deposit-money');
            depositMoney.innerText = getDepositMoney;

            // set & get total totalBalance in localStorage 
            let totalBalance = getDepositMoney - Number(withdrawMoney.innerText);
            totalMoney.innerText = totalBalance;
            depositField.value = '';
            modalForDeposit.classList.remove('active-modal');
            isTotalMoney();
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
                localStorage.setItem('withdraw-money', Number(withdrawMoney.innerText) + Number(value))
                let getWithdrawMoney = localStorage.getItem('withdraw-money');
                withdrawMoney.innerText = Number(getWithdrawMoney);
                let totalBalance = Number(depositMoney.innerText) - Number(withdrawMoney.innerText);
                totalMoney.innerText = totalBalance;
                modalForWithdraw.classList.remove('active-modal');
                withdrawField.value = '';
                isTotalMoney()

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

    /* 4. check if not have total balance then disabled withdraw button  */

    function isTotalMoney() {
        let total = Number(totalMoney.innerText);
        if (total <= 0) {
            document.querySelector('#withdraw').classList.add("disabled");
        } else {
            document.querySelector('#withdraw').classList.remove("disabled");
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
            isTotalMoney();
        }
    }
    document.querySelector('.clear-estimate-btn').addEventListener('click', clearAllEstimate);
}