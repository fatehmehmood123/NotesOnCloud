let addTitle = document.getElementById("addTitle").focus();

// funtion to add notes
var token = localStorage.getItem("accessToken");
var accessedUserId = localStorage.getItem("id");
if(token){
  showNotes();
}
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
  // Create an object with the Note data
  let noteData = {
    title: addTitle.value,
    body: addTxt.value,
    userId : accessedUserId
  };


  // Send the POST request to the server
  fetch(`https://notesbackend-ten.vercel.app/add/${accessedUserId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer '+ token
    },
    body: JSON.stringify(noteData)
  })
  .then(response => {
    if (response.ok) {
      // Note added successfully
      console.log('Note added successfully');
      // Perform any other necessary actions after successful addition
      showNotes();
    } else {
      // Error occurred during addition
      console.error('Error adding Note:', response.statusText);
    }
  })
  .catch(error => {
    // Network error occurred
    console.error('Network error:', error);
  });

  // Clear the input fields
  addTxt.value = "";
  addTitle.value = "";
});


// Function to Show The written Notes
function showNotes() {
  const token = localStorage.getItem('accessToken');
  const id = localStorage.getItem('id');
  fetch(`https://notesbackend-ten.vercel.app/notes/${id}`, {
    method: 'GET',
    headers: {
      'Authorization' : 'Bearer '+ token
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error fetching data');
    }
    return response.json();
  })
  .then(data => {
    
    let html = "";
    data.forEach(function (element, index) {
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
        <h5 class="card-title"> ${element.title===""?"No Title":element.title}</h5>
        <p  class="card-text">${element.body.replaceAll("\n","<br>")} </p>
        <button id="${element._id} "onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        <button id="${element._id} "onclick="editNote(this.id)" class="btn btn-primary">Edit Note</button>
        <p class="card-text"><small class="text-body-secondary">Created At ${element.createdAt}</small></p>
        </div>
        </div>
        `;  
            
    });
    let notesElm = document.getElementById('notes');
    if (data.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `<h4>Nothing to show! Use "Add a Note" section above to add notes</h4>`;
    }
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
    
}

// Function to delete Notes
function deleteNote(_id){
    // Send the delete request
  fetch(`https://notesbackend-ten.vercel.app/note/${accessedUserId}/${_id}`, {
    method: 'DELETE',
    headers: {
      'Authorization' : 'Bearer '+ token
    }
  })
    .then(response => {
      if (response.ok) {
        // Deletion successful
        console.log('Note deleted successfully');
        showNotes();
        // Perform any other necessary actions after successful deletion
      } else {
        // Error occurred during deletion
        console.error('Error deleting Note:', response.statusText);
      }
    })
    .catch(error => {
      // Network error occurred
      console.error('Network error:', error);
    });
}

// Search The Notes
let Search = document.getElementById('searchTxt');
Search.addEventListener("input",function(){
    let inputVal= Search.value.toLowerCase();
    let noteCards= document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
         let cardTxt = element.getElementsByTagName('p')[0].innerText;
         let cardTitle = element.getElementsByTagName('h5')[0].innerText;

        if(cardTxt.toLowerCase().includes(inputVal) || cardTitle.toLowerCase().includes(inputVal)  ){
            element.style.display="block";
        }else{
            element.style.display="none";
        };
    });
});

// function to edit notes 
function editNote(_id){
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    const apiUrl = `https://notesbackend-ten.vercel.app/edit/${_id}`;
    fetch(apiUrl,{
      method: 'GET',
      headers: {
        'Authorization' : 'Bearer '+ token
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error retrieving Note');
      }
    })
    .then(note => {
      console.log(note);
      // Do something with the retrieved Note data
      addTitle.value = note[0].title;
      addTxt.value = note[0].body;
      deleteNote(_id);
    })
    .catch(error => {
      console.error('Error:', error);
    });
   
}

const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click",()=>{
  localStorage.clear();
  window.location.href = 'login.html';
});

const loginLink = document.getElementById("loginLink");
const signupLink = document.getElementById("signupLink");
const token1 = localStorage.getItem("accessToken");
if(token1){
  loginLink.style.display = "none";
  signupLink.style.display = "none";
}
