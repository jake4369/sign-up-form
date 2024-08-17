const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const submitBtn = document.getElementById("submit-btn");

const addErrorClass = (input) => {
  input.classList.add("error");
  if (input.nextElementSibling) {
    input.nextElementSibling.style.display = "block"; // Show the error message
  }
};

const removeErrorClass = (input) => {
  input.classList.remove("error");
  if (input.nextElementSibling) {
    input.nextElementSibling.style.display = "none"; // Hide the error message
  }
};

const validateName = (name, input) => {
  const regex = /^[A-Za-z]+$/;
  const errorElement = input.nextElementSibling;

  let errorMessage = "";

  if (!name) {
    errorMessage = `${
      input.name === "first-name" ? "First" : "Last"
    } Name cannot be empty`;
  } else if (!regex.test(name)) {
    errorMessage = "Name contains invalid characters";
  }

  if (errorMessage) {
    errorElement.innerText = errorMessage;
    addErrorClass(input);
    return false;
  }

  removeErrorClass(input);
  return true;
};

const validateEmail = (email, input) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const errorElement = input.nextElementSibling;

  let errorMessage = "";

  if (!email) {
    errorMessage = "Email cannot be empty";
  } else if (!regex.test(email)) {
    input.value = "";
    errorMessage = "Looks like this is not an email";
    input.placeholder = "email@example/com";
  }

  if (errorMessage) {
    errorElement.innerText = errorMessage;
    addErrorClass(input);
    return false;
  } else {
    input.placeholder = "Email Address";
    removeErrorClass(input);
    return true;
  }
};

const validatePassword = (password, input) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#?\]])(?=.*\d)[A-Za-z\d!@#?\]]{8,}$/;
  const errorElement = input.nextElementSibling;

  let errorMessage = "";

  if (!password) {
    errorMessage = "Password cannot be empty";
  } else if (!regex.test(password)) {
    errorMessage =
      "Password must be at least 8 characters, and include at least 1: capital letter, lowercase letter, number, and special character, i.e. !, @, #, ? or ]";
  }

  if (errorMessage) {
    errorElement.innerText = errorMessage;
    addErrorClass(input);
    return false;
  }

  removeErrorClass(input);
  return true;
};

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // Store validation results in an array
  const validations = [
    validateName(firstName.value, firstName),
    validateName(lastName.value, lastName),
    validateEmail(email.value, email),
    validatePassword(password.value, password),
  ];

  // Check if all validations passed
  const allValid = validations.every(Boolean);

  if (!allValid) {
    // Error messages are already handled inside the validation functions
    return;
  }

  console.log("Submitting");
  // Proceed with form submission logic here
});
