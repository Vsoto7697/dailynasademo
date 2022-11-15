async function loginFormHandler(event) {
    event.preventDefault();
  
  
    // Defines the constants for email and password user is utilizing to login
  // Email and password are equal to the #current-email and #current-password query selector IDs respectively, using trim to remove whitespace from both sides of the email and password string
    const currentEmailEl = document.querySelector('#email-login').value.trim();
    const currentPasswordEl = document.querySelector('#password-login').value.trim();
    const loginError = document.querySelector('#login-error');
  
    if (currentEmailEl && currentPasswordEl) {
   
      const response = await fetch('/api/users/login', {
   
        method: 'post',
        body: JSON.stringify({
          email: currentEmailEl,
          password:currentPasswordEl
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      
  // Response.ok contains a boolean value indicating whether the response was successful
      // So, this if statement translates to if the response was successful, then the browser will replace the current URL 
      // (document.location.replace) with the URL of the home page
  
      if (response.ok) {
        document.location.replace('/dashboard');
  
        // if the response wasn't successful, user will get an alert message indicating their info was incorrect 
      } else {
        loginError.style.setProperty('visibility', 'visible');
      }
    }
  }
  document.querySelector('.login-form').addEventListener('submit', loginFormHandler);