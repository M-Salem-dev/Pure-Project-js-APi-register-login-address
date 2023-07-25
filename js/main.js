/*
TASK
*/
var nums = [2, 4, 4, 2, 4, 3, 5, 7, 8, 9, 2];
var nums2 = [1, 2, 3, 4];

function checkNums(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);

    for (let index = 0; index < arr.length; index++) {
      if (arr[i] == arr[index] && i != index) {
        return true;
      }

    }
  }
  return false
}

// checkNums(nums);
console.log(checkNums(nums));

//-----------------------------------------------------------------------

/*
TASK
*/
function parseData() {
  var locationsIndex = { id: 1, age: 2, name: 0 };

  // var data = "mohamed|30|6";
  var data = "mohamed|2|30";

  // return;
  data = data.split("|");

  console.log(data);
  console.log("id:", data[locationsIndex.id]);
  console.log("name:", data[locationsIndex.name]);
  console.log("age:", data[locationsIndex.age]);

  locationsIndex = { id: data[2], age: data[1], name: data[0] };

  console.log(locationsIndex);
  // locationsIndex = locationsIndex.split(":");
  // console.log(locationsIndex);

  /*
{
  id:6,
  age:30,
  name:mohamed
}
  */
}
parseData();

// ----------------------------------------------------------------------------
// register

function sendPostRequest2() {
  var myRequest = new XMLHttpRequest();

  myRequest.open("post", "https://sdv2.tasksa.dev/api/auth/register");

  var data = new FormData(); // Form ده بيحظ الحاجه اللي جاي من
  // data واخدت نسخه في

  data.append("first_name", "ddddd");
  data.append("last_name", "ccccccc");
  data.append("phone", "012588885888");

  myRequest.send(data);

  myRequest.addEventListener("readystatechange", function () {
    if (myRequest.readyState == 4 && myRequest.status == 200) {
      // Error اذا كان تمام او في Api ده الرد اللي بيجي من ال
      // posts = JSON.parse(myRequest.response);
    }
  });
}

// sendPostRequest2();

// ----------------------------------------------------------------------------
// code
//sdv2.tasksa.dev/api/auth/generate-code

let errorCode = document.getElementById("errorCode");
function btnSendLooginCode() {
  let inbutPhoneCode = document.getElementById("inbutPhoneCode").value;

  sendPostRequest3(inbutPhoneCode);
}

function sendPostRequest3(phoneToGetCode) {
  var myRequest = new XMLHttpRequest();

  myRequest.open("post", "https://sdv2.tasksa.dev/api/auth/generate-code");

  var data = new FormData(); // Form ده بيحظ الحاجه اللي جاي من
  // data واخدت نسخه في

  data.append("phone", phoneToGetCode);

  myRequest.send(data);

  myRequest.addEventListener("readystatechange", function () {
    if (myRequest.readyState == 4 && myRequest.status == 200) {
      // Error اذا كان تمام او في Api ده الرد اللي بيجي من ال
      // posts = JSON.parse(myRequest.response);
      // sendPostRequest4();
      let respone = JSON.parse(myRequest.response);

      console.log(respone.message);

      errorCode.innerHTML = respone.message;

      localStorage.setItem("phone", phoneToGetCode);

      location.replace("/2login.html");
      // location.replace("https://www.javascripttutorial.net/");
      sendPostRequest4();
    }

    if (myRequest.readyState == 4 && myRequest.status == 422) {
      let respone = JSON.parse(myRequest.response);

      console.log(respone.data.phone);

      let codeErrorArr = [];
      for (let index = 0; index < respone.data.phone.length; index++) {
        codeErrorArr.push(`<p>${respone.data.phone[index]}</p>`);
      }
      errorCode.innerHTML = codeErrorArr;

      // errorCode.innerHTML = respone.message;
      // errorCode.innerHTML = respone.errors.phone[0];
    }
  });
}
// --------------------------------------------------------------------------------------------------
// login
let errorCodeLogin = document.getElementById("errorCodeLogin");

function btnSendLooginCode2() {
  let inbutPhoneCode1 = document.getElementById("inbutPhoneCode1").value;
  let inbutPhoneCode2 = document.getElementById("inbutPhoneCode2").value;
  let inbutPhoneCode3 = document.getElementById("inbutPhoneCode3").value;
  let inbutPhoneCode4 = document.getElementById("inbutPhoneCode4").value;
  var xxxxx =
    inbutPhoneCode1 + inbutPhoneCode2 + inbutPhoneCode3 + inbutPhoneCode4;
  console.log(xxxxx);
  sendPostRequest4(xxxxx);
}

function sendPostRequest4(phoneToGetCodeLogin) {
  var myRequest = new XMLHttpRequest();

  myRequest.open("post", "https://sdv2.tasksa.dev/api/auth/login");

  var data = new FormData(); // Form ده بيحظ الحاجه اللي جاي من
  // data واخدت نسخه في

  data.append("phone", localStorage.getItem("phone"));
  data.append("code", phoneToGetCodeLogin);

  myRequest.setRequestHeader("Accept", "application/json ");

  myRequest.send(data);

  myRequest.addEventListener("readystatechange", function () {
    if (myRequest.readyState == 4 && myRequest.status == 200) {
      // Error اذا كان تمام او في Api ده الرد اللي بيجي من ال

      let respone = JSON.parse(myRequest.response);

      // console.log(respone.data.token);
      let acessToken = respone.data.token;
      localStorage.setItem("token", acessToken);
      location.replace("/3display.html");

      // getAddress();

      console.log(respone.message);
    }
    if (myRequest.readyState == 4 && myRequest.status == 422) {
      let respone = JSON.parse(myRequest.response);

      console.log(respone.errors.code);

      let codeErrorArr = [];
      for (let index = 0; index < respone.errors.code.length; index++) {
        codeErrorArr.push(`<p>${respone.errors.code[index]}</p>`);
      }
      errorCodeLogin.innerHTML = codeErrorArr;

      // errorCode.innerHTML = respone.message;
      // errorCodeLogin.innerHTML = respone.errors.phone[0];
    }
  });
}

// --------------------------------------------------------------------------------------------------
// add asddress
//
function sendPostRequest5() {
  var myRequest = new XMLHttpRequest();

  myRequest.open("post", "https://sdv2.tasksa.dev/api/address/store");

  var data = new FormData(); // Form ده بيحظ الحاجه اللي جاي من
  // data واخدت نسخه في

  let localStorageToken = localStorage.getItem("token");

  myRequest.setRequestHeader("Authorization", "Bearer " + localStorageToken);

  data.append("first_name", "Abdo");
  data.append("last_name", "Al Okaily");
  data.append("description", "عنوان جديد");
  data.append("type", "home");
  data.append("is_default", "1");
  data.append("phone", "+201096881927");
  data.append("country_id", "1");
  data.append("area_id", "1");
  data.append("city_id", "1");

  myRequest.send(data);

  myRequest.addEventListener("readystatechange", function () {
    if (myRequest.readyState == 4 && myRequest.status == 200) {
      // Error اذا كان تمام او في Api ده الرد اللي بيجي من ال
    }
  });
}

// --------------------------------------------------------------------------------------------------
// get address

var posts = []; // Array علشان هو جاي ع هيئه dataعلشان استلام ال Arrayال

function getAddress() {
  var myRequest = new XMLHttpRequest();

  myRequest.open("GET", "https://sdv2.tasksa.dev/api/address");
  let localStorageToken = localStorage.getItem("token");
  console.log(localStorageToken);

  myRequest.setRequestHeader("Authorization", "Bearer " + localStorageToken);
  myRequest.send();

  myRequest.addEventListener("readystatechange", function () {
    if (myRequest.readyState == 4 && myRequest.status == 200) {
      posts = JSON.parse(myRequest.response); // json ل string انا كده حولت من JSON.parseو ال Arrayوبخزن في ال dataبستلام ال posts
      posts = posts.data;
      displayPosts2(); // جات ف تتعرض dataعلشان اتاكد ان ال if ولازم اعرضها في

      console.log(posts);

      // deleteAddress(posts[0].id);

      // updateAddress(posts[0]);

      // for (let index = 0; index < posts.length; index++) {
      //   if (posts[index].is_default == 0) {
      //     // updateAddress(posts[index]);

      //   }
      // }

      // for (let index = 0; index < posts.length; index++) {
      //   if (posts[index].is_default != 1) {
      //     // updateAddress(posts[index]);
      //     deleteAddress(posts[index].id);
      //   }
      // }
    }
  });
}

function displayPosts2() {
  var cartoona = ``;

  for (var i = 0; i < posts.length; i++) {
    cartoona += ` <div class="col-md-3 bod">
			<div class="post" id="post-${posts[i].id}">
				<h4>${posts[i].first_name} ${posts[i].last_name}</h4>
				<p>${posts[i].description}</p>
          
          <button onclick="deleteAddress(${posts[i].id})" class="btn btn-danger my-2">delete</button>
         
          <a class="btn btn-success  my-2" href="4update.html?Id=${posts[i].id}">update</a>
        
			</div>
		</div> `;
  }
  document.getElementById("myRow").innerHTML = cartoona;
}

// --------------------------------------------------------------------------------------------------
function btnSendUbdet() {
  var inbutUpdate1 = document.getElementById("inbutUpdate1").value;
  var inbutUpdate2 = document.getElementById("inbutUpdate2").value;
  var inbutUpdate3 = document.getElementById("inbutUpdate3").value;
  var inbutUpdate4 = document.getElementById("inbutUpdate4").value;

  console.log(inbutUpdate1);
  updateAddress({
    inbutUpdate1: inbutUpdate1,
    inbutUpdate2: inbutUpdate2,
    inbutUpdate3: inbutUpdate3,
    inbutUpdate4: inbutUpdate4,
  });
}

// update address
function updateAddress(adds) {
  var myRequest = new XMLHttpRequest();

  myRequest.open("post", "https://sdv2.tasksa.dev/api/address/update");

  var data = new FormData(); // Form ده بيحظ الحاجه اللي جاي من
  // data واخدت نسخه في

  let localStorageToken = localStorage.getItem("token");

  myRequest.setRequestHeader("Authorization", "Bearer " + localStorageToken);

  data.append("address_id", 138); //  inbut heden
  data.append("first_name", adds.inbutUpdate1);
  // data.append("last_name", adds.last_name);
  // data.append("description", adds.description);
  // data.append("type", adds.type);
  // data.append("is_default", adds.is_default);
  data.append("phone", "+201289914444");
  // data.append("country_id", adds.country_id);
  // data.append("area_id", adds.area_id);
  // data.append("city_id", adds.city_id);

  myRequest.send(data);

  myRequest.addEventListener("readystatechange", function () {
    if (myRequest.readyState == 4 && myRequest.status == 200) {
      // Error اذا كان تمام او في Api ده الرد اللي بيجي من ال
    }
  });
}

// --------------------------------------------------------------------------------------------------
// delete address

function deleteAddress(id) {
  var myRequest = new XMLHttpRequest();

  myRequest.open("post", `https://sdv2.tasksa.dev/api/address/delete/${id}`);

  var data = new FormData(); // Form ده بيحظ الحاجه اللي جاي من
  // data واخدت نسخه في

  let localStorageToken = localStorage.getItem("token");

  myRequest.setRequestHeader("Authorization", "Bearer " + localStorageToken);

  // data.append("address_id", id);

  myRequest.send();

  // posts.splice(id, 1);
  // displayPosts2();

  myRequest.addEventListener("readystatechange", function () {
    if (myRequest.readyState == 4 && myRequest.status == 200) {
      // Error اذا كان تمام او في Api ده الرد اللي بيجي من ال
      document.getElementById(`post-${id}`).parentElement.style.display =
        "none";
    }
  });
}

// --------------------------------------------------------------------------------------------------
// getUrlParameters

function getUrlParameters() {
  // console.log(window.location.href);

  const str = window.location.href;

  const words = str.split("?");
  // console.log(words[1].split('&'));

  let ParametersKay = words[1].split("&");

  let parametersObject = {};

  for (let index = 0; index < ParametersKay.length; index++) {
    // console.log(ParametersKay[index].split('='));

    // parametersObject.ParametersKay[index].split("=");

    let x = ParametersKay[index].split("=");
    // console.log(x[0]);
    // console.log(x[1]);

    parametersObject[x[0]] = x[1];
  }
  return parametersObject;
}

// --------------------------------------------------------------------------------------------------

// get Address id

var postsId = {}; // Array علشان هو جاي ع هيئه dataعلشان استلام ال Arrayال

function getSingleAddress(id) {
  var myRequest = new XMLHttpRequest();

  myRequest.open("GET", `https://sdv2.tasksa.dev/api/address/show/${id}`);
  let localStorageToken = localStorage.getItem("token");
  console.log(localStorageToken);

  myRequest.setRequestHeader("Authorization", "Bearer " + localStorageToken);
  myRequest.send();

  myRequest.addEventListener("readystatechange", function () {
    if (myRequest.readyState == 4 && myRequest.status == 200) {
      postsId = JSON.parse(myRequest.response); // json ل string انا كده حولت من JSON.parseو ال Arrayوبخزن في ال dataبستلام ال posts
      postsId = postsId.data;

      console.log(postsId);
      displayPostsId();

      inbutUpdate1.value = postsId.first_name;
      inbutUpdate2.value = postsId.last_name;
      inbutUpdate3.value = postsId.description;
      // inbutUpdate4.value = postsId.last_name;
    }
  });
}

function displayPostsId() {
  var cartoona = ` <div class="col-md-3 bod">
			<div class="post">
				<h4>${postsId.first_name} ${postsId.last_name}</h4>
				<p>${postsId.description}</p>        
			</div>
		</div> `;
  document.getElementById("myRowId").innerHTML = cartoona;
}

// --------------------------------------------------------------------------------------------------

let ssa = document.getElementById("ssa");

function sendPostRequest(apiUrl, parameters, collback) {
  var myRequest = new XMLHttpRequest();

  myRequest.open("post", apiUrl);

  var data = new FormData();

  for (const [key, value] of Object.entries(parameters)) {
    // console.log(`${key}: ${value}`);
    data.append(key, value);
  }
  // console.log(parameters);/

  myRequest.send(data);

  myRequest.addEventListener("readystatechange", function () {
    if (myRequest.readyState == 4) {
      let respone = JSON.parse(myRequest.response);
      // console.log(respone);
      // return respone;
      // console.log(JSON.parse(myRequest.response));
      if (myRequest.status == 200) {
        collback(respone);
        ssa.innerHTML = respone.message;
      }
      if (myRequest.status == 422) {
        console.log(respone);
      }
      if (myRequest.status == 404) {
        // console.log("validation Error");
      }
      if (myRequest.status == 500) {
        // console.log("validation Error");
      }
    }

    // myRequest.onload = function () {
    //   // alert(`Loaded: ${myRequest.status} ${myRequest.response}`);

    //   if (myRequest.status == 200) {

    //     collback(respone);
    //     console.log(respone.message);
    //     ssa.innerHTML = respone.message;
    //   }
    // };

    // myRequest.onerror = function () {
    //   // only triggers if the request couldn't be made at all
    //   // alert(`Network Error`);
    //   // console.log("Error");
    //   // console.log(respone);
    //   if (myRequest.status == 422) {
    //     console.log(respone);
    //   }
    // };
  });
}

let token = "";

function btnSendLoogin() {
  let inbutPhone = document.getElementById("inbutPhone").value;

  // let sendPhone = document.getElementById("sendPhone");
  var phone = inbutPhone;
  let url = `https://sdv2.tasksa.dev/api/auth/generate-code`;

  sendPostRequest(url, { phone: phone }, function (res) {
    var code = res.data[1];
    url = `https://sdv2.tasksa.dev/api/auth/login`;

    sendPostRequest(url, { phone: phone, code: code }, function (res) {
      token = res.data.token;
      console.log(token);
    });
  });
}
// btnSendLoogin()

//  url = `https://sdv2.tasksa.dev/api/auth/login`;
// sendPostRequest(url, { phone: "+201289918448" ,code:1234 });

// ============================================================================================

function btnSendRegister() {
  var first_name = "Ahmed";
  var last_name = "hi";
  var phone = "+201289914444";

  // let inbutPhone = document.getElementById("inbutPhone").value;

  // let sendPhone = document.getElementById("sendPhone");
  // var phone = inbutPhone;
  let url = `https://sdv2.tasksa.dev/api/auth/register`;

  sendPostRequest(
    url,
    { first_name: first_name, last_name: last_name, phone: phone },
    function (res) {}
  );
}

// btnSendRegister();

// function cccc(x,v){

//   return x+v

// }

// cccc(5,5)
