const apiCodeUrl =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

let dropdowns = document.querySelectorAll(".dropdown select");
let msgPara = document.querySelector(".msg");
let btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    }
    if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  //console.log(currCode);
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

window.addEventListener('load',()=>{
    updateExchange();
})

btn.addEventListener("click", async (e) => {
  e.preventDefault();
  updateExchange();
  
});

const updateExchange = async()=>{
    let amount = document.querySelector(".amount input");
  let amtValue = amount.value;
  if (amtValue === "" || amtValue < 1) {
    amtValue = 1;
    amount.value = 1;
  }
  console.log(amtValue);
  console.log(fromCurr.value,toCurr.value);

  //const Url = `${apiCodeUrl}/currency-api@${Date}/v1/currencies/${fromCurr.value.toLowerCase()}.json`;
  const Url=`${apiCodeUrl}/${fromCurr.value.toLowerCase()}.json`;
  //const Url=`/fetch-multi?from=${fromCurr.value.toLowerCase()}&to=${toCurr.value.toLowerCase()}`
  let response = await fetch(Url); // fetch data from the given Url
  let data = await response.json(); // convert json format into javascript object
  let rate= data[`${fromCurr.value.toLowerCase()}`][`${toCurr.value.toLowerCase()}`];
  let finalAmount=amount.value*rate;
  msgPara.innerText=`${amtValue} ${fromCurr.value}=${finalAmount.toFixed(5)} ${toCurr.value}`;

}
