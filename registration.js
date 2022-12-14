document
  .querySelector("#submitRegistration")
  .addEventListener("click", async (e) => {
    e.preventDefault();

    try {
      const URL = "https://api-nodejs-todolist.herokuapp.com/user/register";
      const email = document.querySelector("#emailRegistration");
      const pwd = document.querySelector("#passwordRegistration");
      const name = document.querySelector("#nameRegistration");
      const age = document.querySelector("#ageRegistration");

      validateForm(name.value, age.value, email.value, pwd.value);

      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: email.value,
          password: pwd.value,
          name: name.value,
          age: age.value,
        }),
      });
      console.log(response);

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        window.location.href = "../index.html";
      }

      const regularExpression = /^[a-zA-Z ]+$/;
      const validRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const regularExpressionPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

      if (
        response.status === 400 &&
        name.value.length >= 2 &&
        regularExpression.test(name.value) &&
        age.value != "" &&
        email.value.match(validRegex) &&
        regularExpressionPassword.test(pwd.value) &&
        pwd.value.length >= 8
      ) {
        document.getElementById("messageEmailSignup").innerHTML =
          "Email already exist!";
        document.getElementById("messageEmailSignup").style.color = "#ff1744";
      } else {
        throw new Error(`HTTP error: ${response.status}`);
      }
    } catch (error) {
      console.error(`Catch: ${error}`);
    }
  });

// VALIDATION OF ALL FORM

const validateForm = (name, age, email, pwd) => {
  if (name === "") {
    document.getElementById("messageNameSignup").innerHTML =
      "Name must be filled out";
    document.getElementById("nameRegistration").style.outlineColor = "#ff1744";
    document.getElementById("messageNameSignup").style.color = "#ff1744";
    document.getElementById("nameRegistrationLabel").style.color = "#ff1744";
  } else {
    document.getElementById("messageNameSignup").innerHTML = "";
  }

  if (age === "") {
    document.getElementById("messageAgeSignup").innerHTML =
      "Age must be filled out";
    document.getElementById("ageRegistration").style.outlineColor = "#ff1744";
    document.getElementById("messageAgeSignup").style.color = "#ff1744";
    document.getElementById("ageRegistrationLabel").style.color = "#ff1744";
  } else {
    document.getElementById("messageAgeSignup").innerHTML = "";
  }

  if (email === "") {
    document.getElementById("messageEmailSignup").innerHTML =
      "Email must be filled out";
    document.getElementById("emailRegistration").style.outlineColor = "#ff1744";
    document.getElementById("messageEmailSignup").style.color = "#ff1744";
    document.getElementById("emailRegistrationLabel").style.color = "#ff1744";
  } else {
    document.getElementById("messageEmailSignup").innerHTML = "";
  }

  if (pwd.length === 0) {
    document.getElementById("messagePasswordSignup").innerHTML =
      "Password must be filled out";
    document.getElementById("passwordRegistration").style.outlineColor =
      "#ff1744";
    document.getElementById("messagePasswordSignup").style.color = "#ff1744";
    document.getElementById("passwordRegistrationLabel").style.color =
      "#ff1744";
  } else {
    document.getElementById("messagePasswordSignup").innerHTML = "";
  }

  return false;
};

// VALIDATION INPUT NAME

const validateName = () => {
  const name = document.querySelector("#nameRegistration").value;
  const regularExpression = /^[a-zA-Z ]+$/;

  if (name.length < 2) {
    document.getElementById("messageNameSignup").innerHTML =
      "Name must be 2 or more characters";
    document.getElementById("nameRegistration").style.outlineColor = "#ff1744";
    document.getElementById("messageNameSignup").style.color = "#ff1744";
    document.getElementById("nameRegistrationLabel").style.color = "#ff1744";
  }

  if (!regularExpression.test(name)) {
    document.getElementById("messageNameSignup").innerHTML =
      "Invalid name (numbers and the empty input field are not allowed)";
    document.getElementById("nameRegistration").style.outlineColor = "#ff1744";
    document.getElementById("messageNameSignup").style.color = "#ff1744";
    document.getElementById("nameRegistrationLabel").style.color = "#ff1744";
  }

  if (name.length >= 2 && regularExpression.test(name)) {
    document.getElementById("messageNameSignup").innerHTML = "";
    document.getElementById("nameRegistration").style.outlineColor = "#00c853";
    document.getElementById("messageNameSignup").style.color = "#00c853";
    document.getElementById("nameRegistrationLabel").style.color = "#00c853";
  }
};

// VALIDATION INPUT AGE

document.querySelector("#ageRegistration").addEventListener("keydown", (e) => {
  if (e.key === "e") {
    e.preventDefault();
  }
  document.getElementById("messageAgeSignup").innerHTML = "";
});

function ageImposeMinMax(age) {
  if (age.value != "") {
    document.getElementById("ageRegistration").style.outlineColor = "#00c853";
    document.getElementById("messageAgeSignup").style.color = "#00c853";
    document.getElementById("ageRegistrationLabel").style.color = "#00c853";
    if (parseInt(age.value) < parseInt(age.min)) {
      age.value = age.min;
    }
    if (parseInt(age.value) > parseInt(age.max)) {
      age.value = age.max;
    }
  } else {
    document.getElementById("ageRegistration").style.outlineColor = "#ff1744";
    document.getElementById("messageAgeSignup").style.color = "#ff1744";
    document.getElementById("ageRegistrationLabel").style.color = "#ff1744";
  }
}

// VALIDATION INPUT EMAIL

const validateEmail = () => {
  const email = document.querySelector("#emailRegistration").value;

  const validRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (email.match(validRegex)) {
    document.getElementById("messageEmailSignup").innerHTML = "";
    document.getElementById("messageEmailSignup").style.color = "#00c853";
    document.getElementById("emailRegistration").style.outlineColor = "#00c853";
    document.getElementById("emailRegistrationLabel").style.color = "#00c853";
    return true;
  } else {
    document.getElementById("messageEmailSignup").innerHTML =
      "Invalid email address!";
    document.getElementById("messageEmailSignup").style.color = "#ff1744";
    document.getElementById("emailRegistration").style.outlineColor = "#ff1744";
    document.getElementById("emailRegistrationLabel").style.color = "#ff1744";
    return false;
  }
};

// VALIDATION INPUT PASSWORD

const validatePassword = () => {
  const pwd = document.querySelector("#passwordRegistration").value;
  const regularExpression = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  if (!regularExpression.test(pwd) || pwd.length < 8) {
    document.getElementById("messagePasswordSignup").innerHTML =
      "Password should contain at least one number, a lower-case letter, an upper-case letter and 8 or more characters";
    document.getElementById("passwordRegistration").style.outlineColor =
      "#ff1744";
    document.getElementById("messagePasswordSignup").style.color = "#ff1744";
    document.getElementById("passwordRegistrationLabel").style.color =
      "#ff1744";
    return false;
  } else {
    document.getElementById("messagePasswordSignup").innerHTML = "";
    document.getElementById("passwordRegistration").style.outlineColor =
      "#00c853";
    document.getElementById("messagePasswordSignup").style.color = "#00c853";
    document.getElementById("passwordRegistrationLabel").style.color =
      "#00c853";
  }
};
