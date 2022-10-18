document
.querySelector('#submitRegistration')
.addEventListener('click', async (e) => {
    e.preventDefault();

  try {
    const URL = "https://api-nodejs-todolist.herokuapp.com";
    const ENDPOINT = "/user/register";

    const response = await fetch(URL + ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: document.querySelector("#emailRegistration").value,
        password: document.querySelector("#passwordRegistration").value,
        name: document.querySelector("#nameRegistration").value,
        age: document.querySelector("#ageRegistration").value,
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
