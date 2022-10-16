document.querySelector("#submitLogin").addEventListener("click", async e => {
  e.preventDefault()
  
  const response = await fetch("https://api-nodejs-todolist.herokuapp.com/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: document.querySelector("#emailLogin").value,
      password: document.querySelector("#passwordLogin").value
    })
  })
  const data = await response.json()
  sessionStorage.setItem("token", `${data.token}`)
})