let loginBtn = document.querySelector(".login button");
loginBtn.addEventListener("click", login);

document.querySelector('#pwd').addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    login();
  }
});

async function login() {

  let id = document.querySelector("#id").value;
  let pwd = encodeURIComponent(document.querySelector("#pwd").value);

  let res = await fetch("https://shiis.uhs.ac.kr/login?attribute=loginChk&fake=" + new Date(), {
    "headers": {
      "accept": "application/json, text/javascript, */*; q=0.01",
      "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"100\", \"Google Chrome\";v=\"100\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-requested-with": "XMLHttpRequest"
    },
    "referrer": "https://shiis.uhs.ac.kr/login?attribute=login",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": `id=${id}&pwd=${pwd}`,
    "method": "POST",
    "mode": "cors",
    "credentials": "include"
  });
  let data = await res.json();

  if (data.code == 200) {
    console.log("token:", data.token);
    location.href = "main.html";
  } else {
    modal.show(`<h2>${data.msg}</h2>`);
  }
}