$(document).ready(function () {
  const sendButton = $(".message-input button");
  const inputField = $(".message-input input");
  const messagesDiv = $(".messages");

  sendButton.click(sendMessage);
  inputField.keypress(function (event) {
    if (event.which == 13) {
      sendMessage();
    }
  });

  function sendMessage() {
    let message = inputField.val().trim();
    if (message === "") return;

    let userMessage = $('<div class="message sent"></div>').text(message);
    messagesDiv.append(userMessage);
    inputField.val("");
    messagesDiv.scrollTop(messagesDiv[0].scrollHeight);

    setTimeout(() => {
      let botMessage = $('<div class="message received"></div>').text(
        "This is a bot response."
      );
      messagesDiv.append(botMessage);
      messagesDiv.scrollTop(messagesDiv[0].scrollHeight);
    }, 1000);
  }
});
