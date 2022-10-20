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
      <div class="dati">
        <h1 class="fullName">${data.name}</h1>
        <p class="email">Email:<br><span>${data.email}</span></p>
        <p class="age">Age: <span>${data.age}</span></p>
      </div>
      `;
}

const logout = document.getElementById("logout");

logout.addEventListener("click", () => {
  sessionStorage.removeItem("token");
  window.location.href = "../index.html";
});