document.querySelector("#submitLogin").addEventListener("click", async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(
      "https://api-nodejs-todolist.herokuapp.com/user/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: document.querySelector("#emailLogin").value,
          password: document.querySelector("#passwordLogin").value,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      sessionStorage.setItem("token", data.token);
      window.open("./pages/profile.html");
    } else {
      throw new Error(`HTTP error: ${response.status}`);
    }
  } catch (error) {
    console.error(`Catch: ${error}`);
  }
});

const validatePassword = () => {
  const password = document.getElementById("passwordLogin").value;
  const regularExpression = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  if (!regularExpression.test(password)) {
    document.getElementById("message").innerHTML =
      "Password should contain at least one number, a lower-case letter, an upper-case letter and 8 or more characters";
    return false;
  } else {
    document.getElementById("message").innerHTML =
      "";
  }
};
