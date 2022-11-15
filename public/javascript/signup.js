// runs async function for the signUp form

async function signupFormHandler(event) {
    event.preventDefault();
  
    const signupUsernameEl = document
      .querySelector("#username-signup")
      .value.trim();
    const signupEmailEl = document.querySelector("#email-signup").value.trim();
    const signupPasswordEl = document
      .querySelector("#password-signup")
      .value.trim();
    const signupErrorEl = document.querySelector("#signup-error");
  
    // If user's email and password matches the email and password in our system, then
    // respond with a fetch request of current users in system to ensure that email & username are unique
    if (signupUsernameEl && signupEmailEl && signupPasswordEl) {
      const response = await fetch("/api/users", {
        method: "post",
        // turns username, email, and password into a JSON string
        body: JSON.stringify({
         username: signupUsernameEl,
          email: signupEmailEl,
          password: signupPasswordEl,
        }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        console.log("success");
        document.location.replace("/dashboard");
        // if the response wasn't successful, user will get an alert message indicating their info was incorrect
      } else {
        signupErrorEl.style.setProperty("visibility", "visible");
      }
    }
  }
  
  document
    .querySelector(".signup-form")
    .addEventListener("submit", signupFormHandler);