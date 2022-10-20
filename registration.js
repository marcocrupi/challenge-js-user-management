document
  .querySelector("#submitRegistration")
  .addEventListener("click", async (e) => {
    e.preventDefault();

    try {
      const URL = "https://api-nodejs-todolist.herokuapp.com/user/register";
      const email = document.querySelector("#emailRegistration").value;
      const pwd = document.querySelector("#passwordRegistration").value;
      const name = document.querySelector("#nameRegistration").value;
      const age = document.querySelector("#ageRegistration").value;

      validateForm(name, age, email, pwd);

      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: email,
          password: pwd,
          name: name,
          age: age,
        }),
      });
      console.log(response);

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        window.location.href = "../index.html";
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
  } else {
    document.getElementById("messageNameSignup").innerHTML = "";
  }

  if (age === "") {
    document.getElementById("messageAgeSignup").innerHTML =
      "Age must be filled out";
  } else {
    document.getElementById("messageAgeSignup").innerHTML = "";
  }

  if (email === "") {
    document.getElementById("messageEmailSignup").innerHTML =
      "Email must be filled out";
  } else {
    document.getElementById("messageEmailSignup").innerHTML = "";
  }

  if (pwd.length === 0) {
    document.getElementById("messagePasswordSignup").innerHTML =
      "Password must be filled out";
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
    document.querySelector("#nameRegistration").style.outlineColor = "#ff1744";
    document.querySelector("#emailRegistrationName").style.color =
      "#ff1744";
  }

  if (!regularExpression.test(name)) {
    document.getElementById("messageNameSignup").innerHTML =
      "Invalid name (numbers and the empty input field are not allowed)";
      document.querySelector("#nameRegistration").style.outlineColor =
        "#ff1744";
      document.querySelector("#emailRegistrationName").style.color = "#ff1744";
  }

  if (name.length > 2 && regularExpression.test(name)) {
    document.getElementById("messageNameSignup").innerHTML = "";
    document.querySelector("#nameRegistration").style.outlineColor = "#00c853";
    document.querySelector("#emailRegistrationName").style.color = "#00c853";
  }
};

// VALIDATION INPUT AGE

document.querySelector("#ageRegistration").addEventListener("keypress", (e) => {
  if (e.key === "e") {
    e.preventDefault();
  }
  document.getElementById("messageAgeSignup").innerHTML = "";
});

function ageImposeMinMax(age) {
  if (age.value != "") {
    if (parseInt(age.value) < parseInt(age.min)) {
      age.value = age.min;
    }
    if (parseInt(age.value) > parseInt(age.max)) {
      age.value = age.max;
    }
  }
}

// VALIDATION INPUT EMAIL

const validateEmail = () => {
  const email = document.querySelector("#emailRegistration").value;

  let validRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (email.match(validRegex)) {
    document.getElementById("messageEmailSignup").innerHTML =
      "Valid email address!";
    return true;
  } else {
    document.getElementById("messageEmailSignup").innerHTML =
      "Invalid email address!";
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
    return false;
  } else {
    document.getElementById("messagePasswordSignup").innerHTML = "";
  }
};
