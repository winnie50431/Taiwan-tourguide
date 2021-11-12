/** 縣市資料 */
const cityData = [
  { name: "臺北市", value: "Taipei" },
  { name: "新北市", value: "NewTaipei" },
  { name: "桃園市", value: "Taoyuan" },
  { name: "臺中市", value: "Taichung" },
  { name: "臺南市", value: "Tainan" },
  { name: "高雄市", value: "Kaohsiung" },
  { name: "基隆市", value: "Keelung" },
  { name: "新竹市", value: "Hsinchu" },
  { name: "新竹縣", value: "HsinchuCounty" },
  { name: "苗栗縣", value: "MiaoliCounty" },
  { name: "彰化縣", value: "ChanghuaCounty" },
  { name: "南投縣", value: "NantouCounty" },
  { name: "雲林縣", value: "YunlinCounty" },
  { name: "嘉義縣", value: "ChiayiCounty" },
  { name: "嘉義市", value: "Chiayi" },
  { name: "屏東縣", value: "PingtungCounty" },
  { name: "宜蘭縣", value: "YilanCounty" },
  { name: "花蓮縣", value: "HualienCounty" },
  { name: "臺東縣", value: "TaitungCounty" },
  { name: "金門縣", value: "KinmenCounty" },
  { name: "澎湖縣", value: "PenghuCounty" },
  { name: "連江縣", value: "LienchiangCounty" },
];

// form data
const citySelect = document.querySelector("#citySelect");
const typeSelect = document.querySelector("#typeSelect");
const input = document.querySelector("input#keywords");
const search = document.querySelector("#search");
// blocks
const cityTopic = document.querySelector(".topic_city");
// cards
const mapCards = document.querySelector(".cards_map");
// btn
const prevMap = document.querySelector(".prev_map");
const nextMap = document.querySelector(".next_map");

/** 縣市列表 */
function cityList() {
  let str = '<option value="">選擇縣市</option>';
  cityData.forEach((item) => {
    str += `<option value="${item.value}">${item.name}</option>`;
  });
  citySelect.innerHTML = str;
}
cityList();

/** 熱門城市換頁 */
prevMap.remove();
const toPrevMap = (e) => {
  console.log(e.target);
  prevMap.remove();
  cityTopic.appendChild(nextMap);
  mapCards.style.right = "0";
};
const toNextMap = (e) => {
  console.log(e.target);
  nextMap.remove();
  cityTopic.appendChild(prevMap);
  mapCards.style.right = "100%";
};

/** 監聽事件 */
prevMap.addEventListener("click", toPrevMap);
nextMap.addEventListener("click", toNextMap);

function getAuthorizationHeader() {
  let AppID = "246448c88bce42bfa303e9edd65e4c4f";
  let AppKey = "EesoQpOrDrpMVg-rr-tuMKkOoVQ";
  let GMTString = new Date().toGMTString();
  let ShaObj = new jsSHA("SHA-1", "TEXT");
  ShaObj.setHMACKey(AppKey, "TEXT");
  ShaObj.update("x-date: " + GMTString);
  let HMAC = ShaObj.getHMAC("B64");
  let Authorization =
    'hmac username="' +
    AppID +
    '", algorithm="hmac-sha1", headers="x-date", signature="' +
    HMAC +
    '"';
  return { Authorization: Authorization, "X-Date": GMTString };
}
