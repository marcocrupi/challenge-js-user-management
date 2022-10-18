async()=>{
    const response= await fetch(
        "https://api-nodejs-todolist.herokuapp.com/user/me",
        {
            method: "GET",
            headers: { Authentication: "Bearer"+ token}
        }
    )

if(response.ok){
    const data=await response.json();
    sessionStorage.getItem("token",data.token);
}
else{
    throw new Error(`HTTP error: ${response.status}`);
}
}

//Data
const data = [{"email":"mail@mail","fullName":"Geggio Geggi","age":24}]; //per ora dummy

//function
function injectHtml() {
  return data.map((item) => {
      const {email,fullName,age} = item;
      //HTML
      return `
      <div class="Dati">
        <p class="email">${email}</p>
        <p class="fullName">${fullName}</p>
        <p class="age">${age}</p>
      </div>
      `;
    });
}

//DOM
document.getElementById("divParent").insertAdjacentHTML("beforeend", injectHtml(data));


// // versione per object

// async function injectHtml(){
//   const {email, fullName, age} = data;
//   const container = document.getElementById("divParent");
//   container.innerHTML=`
//   <div class="Dati">
//   <p class="email">${email}</p>
//   <p class="fullName">${fullName}</p>
//   <p class="age">${age}</p>
//   </div>
//   `;
//   }
// injectHtml()