let addEmail = document.getElementById("addEmail");
let addPassword = document.getElementById("addPassword");
let loginBtn = document.getElementById("loginBtn");
let errorMessage = document.getElementById("errorMessage");

loginBtn.addEventListener("click", (e) => {
  let userData = {
    email: addEmail.value,
    password: addPassword.value,
  };

  fetch('https://notesbackend-ten.vercel.app/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
    .then(data => {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("id", data._id);
      window.location.href = 'index.html';

    })
    .catch(error => {
      console.error('Error:', error);
      // Display appropriate error message to the user based on the response status code
      if (error.message === "401") {
        errorMessage.innerHTML = "Email not Verified"
        // Invalid password or email does not exist
      } else if (error.message === "402") {
        errorMessage.innerHTML = "Wrong Password"
      }else if (error.message === "403") {
        errorMessage.innerHTML = "User does not Exist"
      }else if (error.message === "500") {
        errorMessage.innerHTML = "Server error"
      } else {
        // Handle other types of errors or display a generic error message
      }
    });

  e.preventDefault();
  addEmail.value = "";
  addPassword.value = "";
});


function togglePasswordVisibility() {
  const passwordInput = document.getElementById('addPassword');
  const showPasswordCheckbox = document.getElementById('showPasswordCheckbox');
  
  if (showPasswordCheckbox.checked) {
    passwordInput.type = 'text';
  } else {
    passwordInput.type = 'password';
  }
}
