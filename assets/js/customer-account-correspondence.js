$(document).ready(function () {
  // Find all send buttons with class 'chat-send-btn'
  $(".chat-send-btn").each(function () {
    // Get the current send button
    const sendButton = $(this);
    // Extract the chat ID from the button's ID (e.g., 'send-btn-1' -> '1')
    const chatId = sendButton.attr("id").replace("send-btn-", "");
    // Find the corresponding input field by ID (e.g., 'input-1')
    const inputField = $(`#input-${chatId}`);
    // Find the corresponding messages container by ID (e.g., 'messages-1')
    const messagesDiv = $(`#messages-${chatId}`);

    // Bind click event to the send button
    sendButton.click(function () {
      sendMessage(inputField, messagesDiv, chatId);
    });

    // Bind keypress event to the input field to handle the Enter key
    inputField.keypress(function (event) {
      if (event.which === 13) {
        sendMessage(inputField, messagesDiv, chatId);
      }
    });

    // Function to handle sending a message
    function sendMessage(input, messages, chatId) {
      // Get and trim the text from the input field
      let message = input.val().trim();
      // Return if the message is empty
      if (message === "") return;

      // Create a new element for the sent message
      let userMessage = $('<div class="message sent"></div>').text(message);
      // Append the message to the messages container
      messages.append(userMessage);
      // Clear the input field
      input.val("");
      // Scroll the messages container to the bottom
      messages.scrollTop(messages[0].scrollHeight);

      // Simulate a bot response after 1 second
      setTimeout(() => {
        // Create an element for the bot response
        let botMessage = $('<div class="message received"></div>').text(
          `Bot response for chat ${chatId}: ${message}`
        );
        // Append the bot response to the messages container
        messages.append(botMessage);
        // Scroll down again
        messages.scrollTop(messages[0].scrollHeight);
      }, 1000);
    }
  });
});

/*
old code  for one chat

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

*/
