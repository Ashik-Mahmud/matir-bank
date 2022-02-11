// Modal script

/* $. work for open modal  */
const depositButton = document.getElementById("deposit"),
    withdrawButton = document.getElementById("withdraw");
// modal for deposit 
depositButton.addEventListener('click', function () {
    toggleModal('deposit-modal')
})
// modal for withdraw 
withdrawButton.addEventListener('click', function () {
    toggleModal('withdraw-modal')
})
// work for modal function 
function toggleModal(modalId) {
    modalWrapper = document.getElementById(modalId);
    modalWrapper.classList.add('active-modal');
    modalWrapper.querySelector('.close-btn').addEventListener('click', function () {
        modalWrapper.classList.remove('active-modal');
    })
}
// work with logout 
document.querySelector(".logout-btn").addEventListener("click", function () {
    if (confirm("Do you want to log out?")) {
        localStorage.removeItem('username');
    }
})