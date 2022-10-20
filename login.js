document.querySelector("#submitLogin").addEventListener("click", async (e) => {
  e.preventDefault();

  try {
    const email = document.querySelector("#emailLogin");
    const pwd = document.querySelector("#passwordLogin");

    validateForm(email.value, pwd.value);

    const response = await fetch(
      "https://api-nodejs-todolist.herokuapp.com/user/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.value,
          password: pwd.value,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      sessionStorage.setItem("token", data.token);
      window.location.href = "./pages/profile.html";
    } else {
      throw new Error(`HTTP error: ${response.status}`);
    }
  } catch (error) {
    console.error(`Catch: ${error}`);
  }
});

// VALIDATION OF ALL FORM

const validateForm = (email, pwd) => {
  if (email === "") {
    document.getElementById("messageEmailLogin").innerHTML =
      "Email must be filled out";
  } else {
    document.getElementById("messageEmailLogin").innerHTML = "";
  }

  if (pwd.length === 0) {
    document.getElementById("messagePasswordLogin").innerHTML =
      "Password must be filled out";
  } else {
    document.getElementById("messagePasswordLogin").innerHTML = "";
  }

  return false;
};

// VALIDATION INPUT EMAIL

const validateEmail = () => {
  const email = document.querySelector("#emailLogin").value;

  const validRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (email.match(validRegex)) {
    document.getElementById("messageEmailLogin").innerHTML = "";
    document.querySelector("#emailLogin").style.outlineColor = "#00c853";
    document.querySelector("#messageEmailLogin").style.color = "#00c853";
    document.querySelector("#emailLoginLabel").style.color = "#00c853";

    return true;
  } else {
    document.getElementById("messageEmailLogin").innerHTML =
      "Invalid email address!";
    document.querySelector("#emailLogin").style.outlineColor = "#ff1744";
    document.querySelector("#messageEmailLogin").style.color = "#ff1744";
    document.querySelector("#emailLoginLabel").style.color = "#ff1744";

    return false;
  }
};

// VALIDATION INPUT PASSWORD

const validatePassword = () => {
  const password = document.getElementById("passwordLogin").value;
  const regularExpression = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  if (!regularExpression.test(password)) {
    document.getElementById("messagePasswordLogin").innerHTML =
      "Password should contain at least one number, a lower-case letter, an upper-case letter and 8 or more characters";
    document.querySelector("#passwordLogin").style.outlineColor = "#ff1744";
    document.querySelector("#messagePasswordLogin").style.color = "#ff1744";
    document.querySelector("#passwordLoginLabel").style.color = "#ff1744";
    return false;
  } else {
    document.getElementById("messagePasswordLogin").innerHTML = "";
    document.querySelector("#passwordLogin").style.outlineColor = "#00c853";
    document.querySelector("#messagePasswordLogin").style.color = "#00c853";
    document.querySelector("#passwordLoginLabel").style.color = "#00c853";
  }
};
