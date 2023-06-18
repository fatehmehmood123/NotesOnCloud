console.log("signup.js");
let addEmail = document.getElementById("addEmail");
let addPassword = document.getElementById("addPassword");
let addConfirmPassword = document.getElementById("addConfirmPassword");
let signupBtn = document.getElementById("signupBtn");
function checkPasswordMatch() {
  if (addPassword.value === addConfirmPassword.value && addPassword.value !== "") {
    signupBtn.classList.remove("disabled");
  }else{
    signupBtn.classList.add("disabled");
    
  }
}
addPassword.addEventListener("input", checkPasswordMatch);
addConfirmPassword.addEventListener("input", checkPasswordMatch);


signupBtn.addEventListener("click", (e)=>{
     // Create an object with the book data
  let userData = {
    email: addEmail.value,
    password: addPassword.value
  };
  // Send the POST request to the server
  fetch('https://notesbackend-ten.vercel.app/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
  .then(response => {
    if (response.ok) {
      // Book added successfully
      console.log('User added successfully');
      window.location.href = "login.html";
      // Perform any other necessary actions after successful addition
    } else {
      // Error occurred during addition
      console.error('Error adding User:', response.statusText);
    }
  })
  .catch(error => {
    // Network error occurred
    console.error('Network error:', error);
  });

    console.log(addEmail.value);
    console.log(addPassword.value);
    e.preventDefault();
    addEmail.value = "";
    addPassword.value = "";
    addConfirmPassword.value = "";
});

function togglePasswordVisibility(elementId) {
  const passwordField = document.getElementById(elementId);
  if (passwordField.type === "password") {
    passwordField.type = "text";
  } else {
    passwordField.type = "password";
  }
}