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
