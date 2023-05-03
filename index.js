let content = "";
function sendMessage(text) {
  text = text.trim();
  let username = localStorage.getItem("username3");
  let photo = localStorage.getItem("photo1");
  let postman = new XMLHttpRequest();
  postman.open(
    "GET",
    "https://itchycrisplinuxpc.timondecathlon.repl.co/?text=" +
      text +
      "&username=" +
      username +
      "&photo=" +
      photo
  );
  postman.send();
  document.querySelector("#userMessage").value = "";
}

function showMessages() {
  const messagesDiv = document.querySelector(".messages");
  let postman = new XMLHttpRequest();
  postman.open(
    "GET",
    "https://itchycrisplinuxpc.timondecathlon.repl.co/",
    false
  );
  postman.send();
  if (postman.responseText == content) {
    return;
  }
  content = postman.responseText;
  let data = JSON.parse(postman.responseText);
  messagesDiv.innerHTML = "";

  let textAccamulator = "";
  let userName = localStorage.getItem("username3");
  let msgTime;
  for (messageNumber in data) {
    msgTime = new Date(data[messageNumber].time * 1000)
      .toTimeString()
      .substr(0, 8);
    if (data[messageNumber].username === userName) {
      textAccamulator += `
                    <div>
                      <div class="myavamessage"> 
                        <div class="myavatar" style="backgroung-image: url('${data[messageNumber].photo}')"> 
                          </div>
                           <div class="mymessage">
                          <div>
                            <b>
                              ${data[messageNumber].username}
                            </b>
                          </div>
                          <div>
                            ${data[messageNumber].content}
                          </div>
                          <div class="message-time">
                            ${msgTime}
                          </div>
                        </div>
                         </div>
                    </div> `;
    } else {
      textAccamulator += `
                    <div>
                      <div class="avamessage"> 
                        <div class="avatar" style="backgroung-image: url('${data[messageNumber].photo}')"> 
                          </div>
                            <div class="message">
                            <div>
                            <b>
                            ${data[messageNumber].username}
                            </b>
                            </div>
                            <div>
                            ${data[messageNumber].content}
                            </div>
                            <div class="message-time">
                            ${msgTime}
                            </div>
                            </div>
                      </div>
                    </div> `;
    }
  }
  messagesDiv.innerHTML = textAccamulator;
  messagesDiv.scrollTop = messagesDiv.scrollHeight;

  // for (let i = 0; i < data.length; i++) {
  //     document.querySelector('.messages').innerHTML += `
  //     <div>
  //         <div class="message">${data[i]}</div>
  //     </div> `;
  // }
}

function setUsername() {
  //смотрим заполнено ли имя пользователя
  let username = localStorage.getItem("username3");

  if (username != null) {
    return;
  }

  //вызываем окно с тектом и полем ввода
  username = prompt("Введите имя пользователя");

  //сохраняем введенное имя в локальное хранилище
  localStorage.setItem("username3", username);
}

function setPhoto() {
  let photo = localStorage.getItem("photo1");

  if (photo != null) {
    return;
  }

  photo = prompt("Введите аватарку");

  //сохраняем введенное имя в локальное хранилище
  localStorage.setItem("photo1", photo);
}

setUsername();
setPhoto();

setInterval(function () {
  showMessages();
}, 1000);

document.onkeydown = function (e) {
  if (e.keyCode == 13) {
    document.querySelector("#btnSend").click();
  }
};
