

import { signUp, login, logout } from "./auth";

const signUpForm = document.querySelector("#signup-form");
const loginForm = document.querySelector("#login-form");
const logoutBtn = document.querySelector("#logout-btn");

// Sign Up Event Listener
signUpForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const firstname = document.getElementById("signup-firstname").value;
    const lastname = document.getElementById("signup-lastname").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    console.log("Sign Up Data:", { firstname, lastname, email, password });

    signUp(firstname, lastname, email, password);
});

// Login Event Listener
loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    console.log("Login Data:", { email, password });

    login(email, password);
});

// Logout Event Listener
logoutBtn.addEventListener("click", () => {
    logout();
    console.log("User logged out.");
});
