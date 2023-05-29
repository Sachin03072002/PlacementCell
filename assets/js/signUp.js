const button = document.querySelector('.button');
const submit = document.querySelector('.submit');

let myInput = document.getElementById("name");
let password = document.getElementById("password");
let confirm = document.getElementById("Confirmpassword");
let email = document.getElementById('email');
function toggleClass() {
    this.classList.toggle('active-btn');
}

function addClass() {
    this.classList.add('finished');

    // Remove the 'active-btn' and 'finished' classes after the animation is done
    setTimeout(() => {
        this.classList.remove('active-btn', 'finished');
        submit.innerHTML = 'Signed Up'
        button.style.backgroundColor = "green";
        this.disabled = true;
    }, 1000); // Adjust the timeout value to match the duration of your animation
}
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log(emailRegex.test(email))
    return emailRegex.test(email);
}
document.getElementById("myForm").addEventListener("submit", function (event) {
    if (!email || !myInput.value || !password.value || !confirm) {
        event.preventDefault(); // Prevent form submission
        if (!email.value) {
            let alertMessage = document.createElement("p");
            alertMessage.classList.add("custom-alert");
            alertMessage.textContent = "Please fill the required Email.";
            if (!validateEmail(email.value)) {
                alertMessage.textContent = "Please enter a valid Email"
            }
            email.parentNode.appendChild(alertMessage);

            setTimeout(function () {
                alertMessage.remove();
            }, 3000); // Remove the custom alert after 3 seconds
        }
        if (!myInput.value) {
            let alertMessage = document.createElement("p");
            alertMessage.classList.add("custom-alert");
            alertMessage.textContent = "Please fill the required Username.";

            myInput.parentNode.appendChild(alertMessage);

            setTimeout(function () {
                alertMessage.remove();
            }, 3000); // Remove the custom alert after 3 seconds
        }

        if (!password.value) {
            let alertMessage = document.createElement("p");
            alertMessage.classList.add("custom-alert-1");
            alertMessage.textContent = "Please fill the required password.";

            password.parentNode.appendChild(alertMessage);

            setTimeout(function () {
                alertMessage.remove();
            }, 3000); // Remove the custom alert after 3 seconds
        }
        if (!confirm.value) {
            let alertMessage = document.createElement("p");
            alertMessage.classList.add("custom-alert-1");
            alertMessage.textContent = "Please fill the required password.";
            confirm.parentNode.appendChild(alertMessage);

            setTimeout(function () {
                alertMessage.remove();
            }, 3000); // Remove the custom alert after 3 seconds
        }

    } else {
        event.preventDefault(); // Prevent form submission

        button.addEventListener('click', toggleClass);
        button.addEventListener('transitionend', addClass);

        // Trigger the animation
        button.click();
    }
});
