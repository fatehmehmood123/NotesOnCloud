// import cryptoRandomString from "crypto-random-string";

let addEmail = document.getElementById("addEmail");
let addPassword = document.getElementById("password-input");
let addConfirmPassword = document.getElementById("addConfirmPassword");
let signupBtn = document.getElementById("signupBtn");
let errorMessage = document.getElementById("errorMessage");
function checkPasswordMatch() {
  if (
    addPassword.value === addConfirmPassword.value &&
    addPassword.value !== ""
  ) {
    signupBtn.classList.remove("disabled");
  } else {
    signupBtn.classList.add("disabled");
  }
}
addPassword.addEventListener("input", checkPasswordMatch);
addConfirmPassword.addEventListener("input", checkPasswordMatch);
function generateRandomCode() {
  const min = 100000; // Minimum value (inclusive)
  const max = 999999; // Maximum value (inclusive)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
signupBtn.addEventListener("click", (e) => {
  // Create an object with the user data
  // const token = cryptoRandomString({ length: 6, type: "numeric" });
  
  const token = generateRandomCode();
  let verifyEmail = addEmail.value;
  const isVerified = false;
  console.log(token);
  let userData = {
    email: addEmail.value,
    password: addPassword.value,
    token: token,
    isVerified:isVerified
  };
  // Send the POST request to the server
  fetch("https://notesbackend-ten.vercel.app/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (response.ok) {
        // window.location.href = "login.html";
        // window.location.href = `verify.html?email=${encodeURIComponent(
        //   verifyEmail
        // )}`;
        // Perform any other necessary actions after successful addition
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
    .then((data) => {
      // Send a verification email to the user's email address
      sendVerificationEmail(data.email, token);
     
      // Redirect to the verification page with email as a query parameter
      window.location.href = `verify.html?email=${data.email}`;
    })
    .catch(error => {
      console.error('Error:', error);
      // Display appropriate error message to the user based on the response status code
      if (error.message === "400") {
        errorMessage.innerHTML = "User already exists"
      }  else {
        errorMessage.innerHTML = "Server error"
      }
    });
  e.preventDefault();
  addEmail.value = "";
  addPassword.value = "";
  addConfirmPassword.value = "";
});

function sendVerificationEmail(email, verificationToken) {
  // Use the Fetch API or an email library to send an email with the verificationToken to the provided email address
  fetch('https://notesbackend-ten.vercel.app/sendVerificationEmail', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, verificationToken }),
  })
  .then(response => {
      if (!response.ok) {
          console.error('Error sending verification email:', response.statusText);
      }
  })
  .catch(error => {
      console.error('Email sending error:', error);
  });
}
function togglePasswordVisibility(elementId) {
  const passwordField = document.getElementById(elementId);
  if (passwordField.type === "password") {
    passwordField.type = "text";
  } else {
    passwordField.type = "password";
  }
}

addEventListener("DOMContentLoaded", (event) => {
  const password = document.getElementById("password-input");
  const passwordAlert = document.getElementById("password-alert");
  const requirements = document.querySelectorAll(".requirements");
  let lengBoolean, bigLetterBoolean, numBoolean, specialCharBoolean;
  let leng = document.querySelector(".leng");
  let bigLetter = document.querySelector(".big-letter");
  let num = document.querySelector(".num");
  let specialChar = document.querySelector(".special-char");
  const specialChars = "!@#$%^&*()-_=+[{]}\\|;:'\",<.>/?`~";
  const numbers = "0123456789";

  requirements.forEach((element) => element.classList.add("wrong"));

  password.addEventListener("focus", () => {
    passwordAlert.classList.remove("d-none");
    if (!password.classList.contains("is-valid")) {
      password.classList.add("is-invalid");
    }
  });

  password.addEventListener("input", () => {
    let value = password.value;
    if (value.length < 8) {
      lengBoolean = false;
    } else if (value.length > 7) {
      lengBoolean = true;
    }

    if (value.toLowerCase() == value) {
      bigLetterBoolean = false;
    } else {
      bigLetterBoolean = true;
    }

    numBoolean = false;
    for (let i = 0; i < value.length; i++) {
      for (let j = 0; j < numbers.length; j++) {
        if (value[i] == numbers[j]) {
          numBoolean = true;
        }
      }
    }

    specialCharBoolean = false;
    for (let i = 0; i < value.length; i++) {
      for (let j = 0; j < specialChars.length; j++) {
        if (value[i] == specialChars[j]) {
          specialCharBoolean = true;
        }
      }
    }

    if (
      lengBoolean == true &&
      bigLetterBoolean == true &&
      numBoolean == true &&
      specialCharBoolean == true
    ) {
      password.classList.remove("is-invalid");
      password.classList.add("is-valid");

      requirements.forEach((element) => {
        element.classList.remove("wrong");
        element.classList.add("good");
      });
      passwordAlert.classList.remove("alert-warning");
      passwordAlert.classList.add("alert-success");
    } else {
      password.classList.remove("is-valid");
      password.classList.add("is-invalid");

      passwordAlert.classList.add("alert-warning");
      passwordAlert.classList.remove("alert-success");

      if (lengBoolean == false) {
        leng.classList.add("wrong");
        leng.classList.remove("good");
      } else {
        leng.classList.add("good");
        leng.classList.remove("wrong");
      }

      if (bigLetterBoolean == false) {
        bigLetter.classList.add("wrong");
        bigLetter.classList.remove("good");
      } else {
        bigLetter.classList.add("good");
        bigLetter.classList.remove("wrong");
      }

      if (numBoolean == false) {
        num.classList.add("wrong");
        num.classList.remove("good");
      } else {
        num.classList.add("good");
        num.classList.remove("wrong");
      }

      if (specialCharBoolean == false) {
        specialChar.classList.add("wrong");
        specialChar.classList.remove("good");
      } else {
        specialChar.classList.add("good");
        specialChar.classList.remove("wrong");
      }
    }
  });

  password.addEventListener("blur", () => {
    passwordAlert.classList.add("d-none");
  });
});
