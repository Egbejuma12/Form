// GRABING FIELDS
const form = document.querySelector("#form")
const username = document.querySelector("#Username")
const email = document.querySelector("#Email")
const password = document.querySelector("#Password")
const confirmPassword = document.querySelector("#Confirm-password")

form.addEventListener("submit", (e) => {
    e.preventDefault();
    verifyInputs();
})

verifyInputs = () => {
    // function to get user inputs
    const usernameValue = username.value.trim()
    const emailValue = email.value.trim()
    const passwordValue = password.value.trim()
   const confirmPasswordValue =  confirmPassword.value.trim()

   if(usernameValue === ""){
    //    show error message
    //  add error class
      errorMessage(username, "Username field is blank")
   } else {
    //    show success class
      successMessage(username)
   }

     if(emailValue === ""){
      errorMessage(email, "Email field is blank")
   } else if( validateEmail(emailValue)){
     errorMessage(email, "Email is not valid")
   } else {
       successMessage(email)
   }

     if(passwordValue === ""){
      errorMessage(password, "Password field is blank")
   } else {
      successMessage(password)
   }

     if(confirmPasswordValue === ""){
      errorMessage(confirmPassword, "Confirm-Password field is blank")
   } else if (passwordValue !== confirmPasswordValue){
        errorMessage(confirmPassword, "Passwords does not match")
   } else {
      successMessage(confirmPassword)
   }
}

errorMessage = (input, message) => {
    const formContainer = input.parentElement;

    const small = formContainer.querySelector("small")

    // adding error message to the small
    small.innerText = message;

    // adding the error class
    formContainer.className = "form-container error"
}

successMessage = (input) => {
      const formContainer = input.parentElement;
       formContainer.className = "form-container success"
}

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};