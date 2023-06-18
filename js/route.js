token = localStorage.getItem("accessToken");
if (window.location.pathname === '/' && !token) {
    // Redirect to the login page
    window.location.href = '/login.html';
  }