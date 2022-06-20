document.addEventListener("DOMContentLoaded", () => {
  // GRABING FIELDS
  const form = document.querySelector("#form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    verifyInputs();
  });

  const inputForms = form.querySelectorAll("input");

  const ErrorMap = {
    Username: "Username is not correct",
    Email: "Email is not correct",
    Password: "Password field is either empty or too short",
    "Confirm-password": "Password field is either empty or too short",
  };

  verifyInputs = () => {
    let passwords = {};
    // function to get user inputs
    inputForms.forEach((input) => {
      const inputValue = input.value.trim();
      const formId = input.id;

      if (formId === "Password" || formId === "Confirm-password") {
        passwords[formId] = inputValue;
      }

      if (!inputValue) {
        errorMessage(formId, `${formId} should not be empty`);
      } else {
        const isError = verify(inputValue, formId);

        if (!isError && formId === "Confirm-password") {
          if (passwords.Password !== passwords["Confirm-password"]) {
            errorMessage("Confirm-password", "Passwords do not match");
          }
        }
      }
    });
  };

  // TOGGLE PASSWORD
  togglePassword = () => {
    let pass = document.querySelector("#Password");
    let passTwo = document.querySelector("#Confirm-password");
    if (pass.getAttribute("type") === "password") {
      pass.setAttribute("type", "text");
      document.querySelectorAll('i.fa-eye')[0].classList.remove("show")
      document.querySelectorAll('i.fa-eye')[1].classList.remove("show")
      document.querySelectorAll("i.fa-eye-slash")[0].classList.add("show");
      document.querySelectorAll("i.fa-eye-slash")[1].classList.add("show");
      console.log(document.querySelectorAll("i.fa-eye").classList);
    } else {
      pass.setAttribute("type", "password");
       document.querySelectorAll("i.fa-eye")[0].classList.add("show");
       document.querySelectorAll("i.fa-eye")[1].classList.add("show");
       document.querySelectorAll("i.fa-eye-slash")[0].classList.remove("show");
       document.querySelectorAll("i.fa-eye-slash")[1].classList.remove("show");
    }

    if (passTwo.getAttribute("type") === "password") {
      passTwo.setAttribute("type", "text"); 
       document.querySelectorAll("i.fa-eye")[0].classList.remove("show");
       document.querySelectorAll("i.fa-eye")[1].classList.remove("show");
       document.querySelectorAll("i.fa-eye-slash")[0].classList.add("show");
       document.querySelectorAll("i.fa-eye-slash")[1].classList.add("show");
       console.log(document.querySelectorAll("i.fa-eye").classList);
    } else {
      passTwo.setAttribute("type", "password");
       document.querySelectorAll("i.fa-eye")[0].classList.add("show");
       document.querySelectorAll("i.fa-eye")[1].classList.add("show");
       document.querySelectorAll("i.fa-eye-slash")[0].classList.remove("show");
       document.querySelectorAll("i.fa-eye-slash")[1].classList.remove("show");
    }
  };

  // ON CHANGE FUNCTION
  inputForms.forEach((input) => {
    const formId = input.id;
    input.addEventListener("input", function (e) {
      e.preventDefault();
      const inputValue = e.target.value;

      verify(inputValue, formId);
    });
  });

  const verify = (inputValue, formId) => {
    if (!validateInput(inputValue, formId)) {
      errorMessage(formId);
      return true;
    } else {
      successMessage(formId);
    }

    return false;
  };

  errorMessage = (formId, message) => {
    const formContainer = document.querySelector(`#${formId}`).parentElement;
    const small = formContainer.querySelector("small");

    // adding error message to the small
    small.innerText = message || ErrorMap[formId];
    // adding the error class
    formContainer.className = "form-container error";
  };

  successMessage = (formId) => {
    const formContainer = document.querySelector(`#${formId}`).parentElement;
    formContainer.className = "form-container success";
  };

  const validateInput = (input, name) => {
    const patternMap = {
      Email:
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      Username: /^[a-zA-z0-9]{3,}$/,
      Password: /[^\n]{8,}/,
      "Confirm-password": /[^\n]{8,}/,
    };

    return input.match(patternMap[name]);
  };
});
