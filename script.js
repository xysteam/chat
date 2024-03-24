let chatData = [];

// 在页面加载时，检查本地存储是否有聊天记录，并加载
window.onload = function() {
  if (localStorage.getItem("chatData")) {
    chatData = JSON.parse(localStorage.getItem("chatData"));
    renderChat();
  }
}

// 在窗口关闭时保存聊天记录
window.onbeforeunload = function() {
  localStorage.setItem("chatData", JSON.stringify(chatData));
}

function sendMessage() {
  const identity = document.getElementById("identitySelect").value;
  const message = document.getElementById("messageInput").value;
  const imageInput = document.getElementById('imageInput');
  const image = imageInput.files[0];

  if (message.trim() === '' && !image) {
    alert('请输入消息或选择图片。');
    return;
  }

  chatData.push({ identity, message, image });
  renderChat();

  document.getElementById("messageInput").value = '';
  document.getElementById("imageInput").value = '';
}

function renderChat() {
  const chatBox = document.getElementById("chatBox");
  chatBox.innerHTML = "";

  chatData.forEach(data => {
    let chatItem = document.createElement("div");
    chatItem.style.marginBottom = '10px';
    chatItem.style.border = '1px solid #ccc';
    chatItem.style.padding = '5px';

    let messageContent = `<strong>${data.identity}:</strong> ${data.message}`;
    if (data.image) {
      let image = document.createElement("img");
      image.src = window.URL.createObjectURL(data.image);
      image.style.maxWidth = '200px';
      image.style.marginTop = '10px';
      chatItem.appendChild(image);
    }
    chatItem.innerHTML += messageContent;
    chatBox.appendChild(chatItem);
  });
}
