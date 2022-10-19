document
.querySelector('#submitRegistration')
.addEventListener('click', async (e) => {
    e.preventDefault();

  try {
    const URL = "https://api-nodejs-todolist.herokuapp.com/user/register";
    const email = document.querySelector("#emailRegistration").value;
    const pwd = document.querySelector("#passwordRegistration").value;
    const name = document.querySelector("#nameRegistration").value;
    const age = document.querySelector("#ageRegistration").value;

    if (pwd.length < 8) {
      alert("Password length must be atleast 8 characters");
      return false;
    }

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
        window.open("index.html");
    } else {
      throw new Error(`HTTP error: ${response.status}`);
    }
  } catch (error) {
    console.error(`Catch: ${error}`);
  }
})
