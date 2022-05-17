const api = "";
const url = "https://api.coinstats.app/public/v1/coins?skip=0";
let list = document.getElementById("list");

document.addEventListener("DOMContentLoaded", () => {
  getCoins();
});

function getCoins() {
  fetch(url)
    .then((res) => res.json())
    .then((data) =>
     singleCoin(data.coins)
    );
}

function singleCoin(coins) {
  console.log(coins);
  let data = ""

   coins.map((coin) => {
     data += ` <div class="card-container">
            <div class="first-section">
              <div class="coin-details">
                <h3>${coin.name}</h3>
                <h5>${coin.symbol}</h5>
              </div>
              <div class="coin-image">
                <img
                  src=${coin.icon}
                  alt=""
                />
              </div>
            </div>
            <div class="coin-price">
              Ksh ${convertPriceToKsh(coin.price)}
              <!-- <span class="label">Price</span>
              <span class="value">$30,0000</span> -->
            </div>
              <button class="btn">more</button>

          </div>`;
   });
  

  list.innerHTML = data;
}

function convertPriceToKsh(coinPrice) {
  let convertedPriceValue = coinPrice * 3469615.18;
  return convertedPriceValue.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// console.log(convertPriceToKsh(0.7172823631946439));
