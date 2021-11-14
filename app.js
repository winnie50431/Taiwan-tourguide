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
const topic = document.querySelector("section.topic");
const allTopics = document.querySelectorAll("section.topic");
// cards
const mapCards = document.querySelector("div.cards_map");
const foodCards = document.querySelector("div.cards_food");
const hotelCards = document.querySelector("div.cards_hotel");
const activityCards = document.querySelector("div.cards_activity");
// btn
const prevMap = document.querySelector(".prev_map");
const nextMap = document.querySelector(".next_map");

let url, city, type, keywords, limitNum;

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
if (prevMap) prevMap.remove();
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

/** 預設顯示資料 */
const setDefault = async () => {
  let block;
  /** 活動 */
  if (activityCards) {
    type = "Activity";
    limitNum = 10;
    url = `https://ptx.transportdata.tw/MOTC/v2/Tourism/${type}?$top=${limitNum}&$format=JSON`;
  }
  try {
    let html = "";
    const res = await fetch(url, {
      headers: getAuthorizationHeader(),
    });
    const data = await res.json();
    // console.log(data);
    data.forEach((d) => {
      // console.log(d.Name, d.Picture.PictureUrl1);
      if (d.Picture.PictureUrl1) {
        html += `
      <div class="card_activity">
      <div class="activity_img">
        <img
          src="${d.Picture.PictureUrl1}"
          alt="${d.Name}"
        />
      </div>
      <div class="activity_content">
        <h4 class="activity_title">
        ${d.Name}
        </h4>
        <p>
        ${d.Description}...
        </p>
      </div>
      <div class="info">
        <span
          ><i class="text_primary fas fa-map-marker-alt"></i
          >&nbsp;${d.City}</span
        >
        <button class="btn btn_outline_primary">活動詳情</button>
      </div>
    </div>
        `;
      }
    });
    activityCards.innerHTML = html;
  } catch (err) {
    console.log(err);
  }

  /** 美食 */
  if (foodCards) {
    block = foodCards;
    type = "Restaurant";
    limitNum = 10;
  }
  try {
    url = `https://ptx.transportdata.tw/MOTC/v2/Tourism/${type}?$top=${limitNum}&$format=JSON`;
    let html = "";
    const res = await fetch(url, {
      headers: getAuthorizationHeader(),
    });
    const data = await res.json();
    // console.log(data);
    data.forEach((d) => {
      // console.log(d.Name, d.Picture.PictureUrl1);
      if (d.Picture.PictureUrl1) {
        html += `
        <div class="card">
        <div class="img_container">
          <img
            src="${d.Picture.PictureUrl1}"
            alt="${d.Name}"
          />
        </div>
        <div class="card_content">
          <p>${d.Name}</p>
          <div>
            <i class="text_primary fas fa-map-marker-alt"></i>
            <span>${d.Address[0] + d.Address[1] + d.Address[2]}</span>
          </div>
        </div>
      </div>
          `;
      }
    });
    block.innerHTML = html;
  } catch (err) {
    console.log(err);
  }

  /** 住宿 */
  if (hotelCards) {
    block = hotelCards;
    type = "Hotel";
    limitNum = 10;
  }
  try {
    url = `https://ptx.transportdata.tw/MOTC/v2/Tourism/${type}?$top=${limitNum}&$format=JSON`;
    let html = "";
    const res = await fetch(url, {
      headers: getAuthorizationHeader(),
    });
    const data = await res.json();
    // console.log(data);
    data.forEach((d) => {
      // console.log(d.Name, d.Picture.PictureUrl1);
      if (d.Picture.PictureUrl1) {
        html += `
        <div class="card">
        <div class="img_container">
          <img
            src="${d.Picture.PictureUrl1}"
            alt="${d.Name}"
          />
        </div>
        <div class="card_content">
          <p>${d.Name}</p>
          <div>
            <i class="text_primary fas fa-map-marker-alt"></i>
            <span>${d.Address[0] + d.Address[1] + d.Address[2]}</span>
          </div>
        </div>
      </div>
          `;
      }
    });
    block.innerHTML = html;
  } catch (err) {
    console.log(err);
  }
};
setDefault();

/** 篩選器
 *  1. get the form data : eventListner
 *  2. set URL : setURL()
 *  3. fetch API
 *  4. add element to layout
 */
const setURL = () => {
  if (type && !city && !keywords) {
    url = `https://ptx.transportdata.tw/MOTC/v2/Tourism/${type}?$top=40&$format=JSON`;
  } else if (type && city && !keywords) {
    url = `https://ptx.transportdata.tw/MOTC/v2/Tourism/${type}/${city}?$top=40&$format=JSON`;
  } else if (type && !city && keywords) {
    url = `https://ptx.transportdata.tw/MOTC/v2/Tourism/${type}?$filter=contains(Description,'${keywords}')&$top=40&$format=JSON`;
  } else if (type && city && keywords) {
    url = `https://ptx.transportdata.tw/MOTC/v2/Tourism/${type}/${city}?$filter=contains(Name,'${keywords}')&$top=40&$format=JSON`;
  } else {
    alert("請選擇類別");
  }
  console.log(url);
};

const getData = async (e) => {
  let html = "";

  /** 取得表單資料 */
  e.preventDefault();
  console.log(city, type, keywords);

  /** 依類別取得資料 */
  setURL();
  try {
    const res = await fetch(url, {
      headers: getAuthorizationHeader(),
    });
    const data = await res.json();
    console.log(data);
    /** 清空多餘的標題 */
    if (allTopics.length >= 1) {
      for (let i = 1; i < allTopics.length; i++) {
        console.log(i);
        allTopics.item(i).remove();
      }
    }
    /** 渲染標題 */
    if (type === "Restaurant") {
      html += `
      <div class="topic_title">
      <img src="./images/Icon/Rectangle.png" alt="" />
      <h3>熱門美食</h3>
    </div>
    <div class="cards cards_food">
        `;
    } else if (type === "Hotel") {
      html += `
      <div class="topic_title">
      <img src="./images/Icon/Rectangle.png" alt="" />
      <h3>熱門住宿</h3>
    </div>
    <div class="cards cards_hotel">
        `;
    } else if (type === "Activity") {
      html += `
      <div class="topic_title">
      <img src="./images/Icon/Triangle.png" alt="" />
      <h3>熱門活動</h3>
    </div>
    <div class="cards cards_activity">
      `;
    }
    /** 渲染內容 */
    if (type === "Restaurant" || type === "Hotel") {
      data.forEach((d) => {
        if (d.Name && d.Picture.PictureUrl1) {
          console.log(d.Name, d.Picture.PictureUrl1);
          html += `
          <div class="card">
          <div class="img_container">
            <img
              src="${d.Picture.PictureUrl1}"
              alt="${d.Name}"
            />
          </div>
          <div class="card_content">
            <p>${d.Name}</p>
            <div>
              <i class="text_primary fas fa-map-marker-alt"></i>
              <span>${d.Address[0] + d.Address[1] + d.Address[2]}</span>
            </div>
          </div>
        </div>
        `;
        }
      });
      html += `</div>`;
      topic.innerHTML = html;
    } else if (type === "Activity") {
      data.forEach((d) => {
        // console.log(d.Name, d.Picture.PictureUrl1);
        if (d.Picture.PictureUrl1) {
          html += `
          <div class="card_activity">
          <div class="activity_img">
            <img
              src="${d.Picture.PictureUrl1}"
              alt="${d.Name}"
            />
          </div>
          <div class="activity_content">
            <h4 class="activity_title">
            ${d.Name}
            </h4>
            <p>
            ${d.Description}...
            </p>
          </div>
          <div class="info">
            <span
              ><i class="text_primary fas fa-map-marker-alt"></i
              >&nbsp;${d.City}</span
            >
            <button class="btn btn_outline_primary">活動詳情</button>
          </div>
        </div>
          `;
        }
      });
      html += `</div>`;
      topic.className = "topic topic_activity";
      topic.innerHTML = html;
    }
  } catch (err) {
    console.log(err);
  }
};

/** 監聽事件 */
// 熱門城市換頁
prevMap.addEventListener("click", toPrevMap);
nextMap.addEventListener("click", toNextMap);
// 篩選器(表單)
typeSelect.addEventListener("change", (e) => {
  type = e.target.value;
});
citySelect.addEventListener("change", (e) => {
  city = e.target.value;
});
input.addEventListener("change", (e) => {
  keywords = e.target.value;
});
search.addEventListener("click", getData);

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
