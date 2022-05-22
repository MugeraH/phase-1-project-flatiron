const url = "https://api.coinstats.app/public/v1/coins?skip=0";
let list = document.getElementById("list");
let coinName = document.getElementById("modalCoinName");
var coinData = {};
let modal_coin = document.getElementById("modalCoin");
let modalCoinLabel = document.getElementById("modalCoinLabel");
let modalCoinPrice = document.getElementById("modalCoinPrice");
let modalCoinImage = document.getElementById("coinImage");
let coinSite = document.getElementById("coinWeb");
let coinTwitter = document.getElementById("coinTwitter");
var ebModal = document.getElementById("mySizeChartModal");
var ebSpan = document.getElementsByClassName("ebcf_close")[0];
let filterLimit = document.getElementById("selectLimit");
let coinsData = [];
let limit = 0;

document.addEventListener("DOMContentLoaded", () => {
  limit = filterLimit.options[filterLimit.selectedIndex].value;
  getCoins(limit);
});

ebSpan.onclick = function () {
  ebModal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == ebModal) {
    ebModal.style.display = "none";
  }
};

function changeLimit() {
  limit = filterLimit.options[filterLimit.selectedIndex].value;
  getCoins(limit);
}

function getCoins(limit) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      coinsData = data.coins.map((coin) => {
        coin["likes"] = 1;

        return coin;
      });

      if (limit == "all") {
        displayCoin(coinsData);
      } else {
        displayCoin(coinsData.slice(0, limit));
      }
    });
}

function displayCoin(coinsData) {
  let data = "";

  coinsData.map((coin) => {
    // console.log(coin);
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
              <button class="btn" onclick="getCoinDetails('${
                coin.id
              }')">More info</button>
          </div>`;
  });

  list.innerHTML = data;
}

function getCoinDetails(coinId) {
  let coinDetails = coinsData.filter((coin) => coin.id == coinId);

  console.log(coinDetails[0]);

  coinName.innerText = coinDetails[0].name;
  modal_coin.innerText = coinDetails[0].name;
  modalCoinLabel.innerText = coinDetails[0].symbol;
  modalCoinPrice.innerText = convertPriceToKsh(coinDetails[0].price);
  modalCoinImage.src = coinDetails[0].icon;
  coinSite.href = coinDetails[0].websiteUrl;
  coinTwitter.href = coinDetails[0].twitterUrl;

  ebModal.style.display = "block";
}

function convertPriceToKsh(coinPrice) {
  let convertedPriceValue = coinPrice * 3469615.18;
  return convertedPriceValue.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}
