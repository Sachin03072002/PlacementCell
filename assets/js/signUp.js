const button = document.querySelector('.button');
const submit = document.querySelector('.submit');
const myForm = document.getElementById('myForm');
const myInput = document.getElementById('name');
const password = document.getElementById('password');
const confirm = document.getElementById('Confirmpassword');
const email = document.getElementById('email');

function toggleClass() {
    this.classList.toggle('active-btn');
}

function addClass() {
    this.classList.add('finished');

    // Remove the 'active-btn' and 'finished' classes after the animation is done
    setTimeout(() => {
        this.classList.remove('active-btn', 'finished');
        submit.innerHTML = 'Signed Up';
        button.style.backgroundColor = 'green';
        this.disabled = true;
    }, 300); // Adjust the timeout value to match the duration of your animation
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

myForm.addEventListener('submit', function (event) {
    if (!email.value || !myInput.value || !password.value || !confirm.value) {
        event.preventDefault(); // Prevent form submission
        if (!email.value) {
            showAlert(email.parentNode, 'Please fill in the required Email.', validateEmail(email.value));
        }

        if (!myInput.value) {
            showAlert(myInput.parentNode, 'Please fill in the required Username.');
        }

        if (!password.value) {
            showAlert(password.parentNode, 'Please fill in the required password.');
        }

        if (!confirm.value) {
            showAlert(confirm.parentNode, 'Please fill in the required password.');
        }
    } else {
        button.addEventListener('click', toggleClass);
        button.addEventListener('transitionend', addClass);

        // Trigger the animation
        button.click();
    }
});

function showAlert(container, message, isValid = true) {
    const alertMessage = document.createElement('p');
    alertMessage.classList.add('custom-alert');
    alertMessage.textContent = message;

    if (!isValid) {
        alertMessage.textContent = 'Please enter a valid Email.';
    }

    container.appendChild(alertMessage);

    setTimeout(() => {
        alertMessage.remove();
    }, 3000); // Remove the custom alert after 3 seconds
}
