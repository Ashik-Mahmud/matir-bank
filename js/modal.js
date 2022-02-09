// Modal script

/* $. work for open modal  */
const depositButton = document.getElementById("deposit"),
    withdrawButton = document.getElementById("withdraw"),
    closeBtn = document.querySelector(".close-btn"),
    modalForDeposit = document.getElementById('deposit-modal'),
    modalForWithdraw = document.getElementById('withdraw-modal');

// modal for deposit 
depositButton.addEventListener('click', function () {
    modalForDeposit.classList.add('active-modal');
    modalForDeposit.querySelector('.close-btn').addEventListener('click', function () {
        modalForDeposit.classList.remove('active-modal');
    })
})

// modal for withdraw 
withdrawButton.addEventListener('click', function () {
    modalForWithdraw.classList.add('active-modal');
    modalForWithdraw.querySelector('.close-btn').addEventListener('click', function () {
        modalForWithdraw.classList.remove('active-modal');
    })
})


// work with logout 

document.querySelector(".logout-btn").addEventListener("click",function(){
    if(confirm("Do you want to log out?")){
        localStorage.removeItem('username');
    }
})