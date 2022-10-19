const token = sessionStorage.getItem("token");
console.log("token in session storage:", token);

async function getUser() {
  try {
    const response = await fetch(
      "https://api-nodejs-todolist.herokuapp.com/user/me",
      {
        method: "GET",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      document
        .getElementById("divParent")
        .insertAdjacentHTML("beforeend", injectHtml(data));
    } else {
      throw new Error(`HTTP error: ${response.status}`);
    }
  } catch (error) {
    console.error(`Catch: ${error}`);
  }
}

getUser();

function injectHtml(data) {
  return `
      <div class="Dati">
        <p class="email">${data.email}</p>
        <p class="fullName">${data.name}</p>
        <p class="age">${data.age}</p>
      </div>
      `;
}
