(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

// Create a circular progress bar using ProgressBar.js
const circle = new ProgressBar.Circle('#container', {
    color: '#000',
    strokeWidth: 5,
    trailColor: '#eee',
    trailWidth: 3,
    duration: 500,
    easing: 'easeInOut',

    // Configure the percentage text inside the circle
    text: {
        value: '0%',
        style: {
            fontSize: '1.5rem',
            fontWeight: 'bold',
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: {
                prefix: true,
                value: 'translate(-50%, -50%)'
            },
            margin: 0,
            padding: 0
        },
    },

    // Update the percentage text on each animation frame
    step: function (state, circle) {
        const value = Math.round(circle.value() * 100);
        circle.setText(value + '%');
    },
});

// Select form and input elements
const inputs = document.querySelectorAll("input");
const form = document.querySelector("form");

// Track which inputs have been validated to avoid duplicate progress
const validatedInputs = new Set();

/**
 * Validate a single input element, show/hide error message and styles.
 * @param {HTMLInputElement} input - The input field to validate.
 * @returns {boolean} - True if valid, false otherwise.
 */
function validateInput(input) {
    const errorDiv = input.parentElement.querySelector("div");


    if (!input.validity.valid) {
        input.classList.add("border-red-500!");
        errorDiv.classList.remove("hidden");
        errorDiv.innerText = input.validationMessage;
        return false;
    } else {
        input.classList.remove("border-red-500!");
        errorDiv.classList.add("hidden");
        return true;
    }
}

function validatePasswordMatch() {
    const password = document.querySelector("#password")
    const confirmPassword = document.querySelector("#confirm-password")
    if (password.value !== confirmPassword.value) {
        confirmPassword.setCustomValidity("Passwords do not match");
    } else if (confirmPassword.value.length < 8) {
        confirmPassword.setCustomValidity("Please lengthen this text to 8 characters or more (you are currently using 4 characters).");
    } else {
        confirmPassword.setCustomValidity("")
        confirmPassword.validity.valid = true

    }
}

// Attach blur event to each input to validate and update progress bar
inputs.forEach((input) => {
    input.addEventListener("blur", () => {
        input.id == "confirm-password" ? validatePasswordMatch() : null;

        const currentProgress = Math.round(circle.value() * 100);
        const isValid = input.checkValidity();
        const alreadyTracked = validatedInputs.has(input);

        // Show validation error if necessary
        validateInput(input);

        // Increase progress if newly valid
        if (isValid && !alreadyTracked && currentProgress < 100) {
            circle.animate(circle.value() + 0.25);
            validatedInputs.add(input);
        }

        // Decrease progress if input becomes invalid
        if (!isValid && alreadyTracked && currentProgress > 0) {
            circle.animate(circle.value() - 0.25);
            validatedInputs.delete(input);
        }
    });
});

// Handle form submission: prevent default and validate all inputs
form.addEventListener("submit", (event) => {
    event.preventDefault();
    let allValid = true;

    for (const input of inputs) {
        const isValid = validateInput(input);
        if (!isValid) {
            allValid = false;
        }
    }

    // If all inputs are valid, proceed with form submission
    if (allValid) {
        form.submit();
    }
});

function showPassword() {
    const eyeButtons = document.querySelectorAll("button .fa-eye-slash")
    eyeButtons.forEach((eyeButton) => {

        eyeButton.parentElement.addEventListener("click", () => {
            if (eyeButton.classList.contains("fa-eye-slash")) {
                eyeButton.classList.replace("fa-eye-slash", "fa-eye")
                eyeButton.parentElement.parentElement.querySelector("input").type = "text";
            } else {
                eyeButton.classList.replace("fa-eye", "fa-eye-slash");
                eyeButton.parentElement.parentElement.querySelector("input").type = "password";

            }
        })
    })
}

onload = () => {
    showPassword()
}
},{}]},{},[1]);
