

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