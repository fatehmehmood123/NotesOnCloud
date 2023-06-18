console.log("login.js");
let addEmail = document.getElementById("addEmail");
let addPassword = document.getElementById("addPassword");
let loginBtn = document.getElementById("loginBtn");


loginBtn.addEventListener("click", (e)=>{
     // Create an object with the book data
  let userData = {
    email: addEmail.value,
    password: addPassword.value
  };
  // Send the POST request to the server
  fetch('https://notesbackend-ten.vercel.app/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
  .then(response => {
    if (response.ok) {
      // Note added successfully  
      console.log("user added Successfully");
      // alert("added")
    return response.json();
      // Perform any other necessary actions after successful addition
    } else {
      // Error occurred during addition
      console.error('Error adding User:', response.statusText);
    }
  }).then((data) => {
    localStorage.setItem("accessToken",data.accessToken);
    localStorage.setItem("id",data._id);
    window.location.href = 'index.html';
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