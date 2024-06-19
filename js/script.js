// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  set,
  onChildAdded,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

/**
 * Config = 機密情報です！！！
 * この部分はGitHubに上げないこと！！！！！！！
 */
//
const firebaseConfig = {

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const dbRef = ref(database, "chat");

// const kosuge = {
//   name: "こすげ",
//   age: 41,
//   from: "神奈川",
// };
// console.log(kosuge.name);
// console.log(kosuge["from"]);

// 送信ボタンを押したときの処理
$("#send").on("click", function () {
  // 入力欄のデータを取得
  const time = Date(Date.now());
  const userName = $("#userName").val();
  const text = $("#text").val();
  console.log(userName, text, time);

  //送信データをオブジェクトにまとめる
  const message = {
    userName: userName,
    text: text,
    time: time,
  };

  const newPostRef = push(dbRef);
  set(newPostRef, message);
});

onChildAdded(dbRef, function (data) {
  // 追加されたデータをFirebaseから受け取り、分解
  // ルールにのっとった分解方法
  const message = data.val();
  const key = data.key;
  console.log(data, message, key);

  let chatMsg = `
    <div>
      <div>${message.time}</div>
      <div>${message.userName}</div>
      <div>${message.text}</div>
    </div>
  `;

  $('#output').append(chatMsg);
});



