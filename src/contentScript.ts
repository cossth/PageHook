const initEvent = () => {
  const data = {
    url: location.href,
  };
  const payload: SendHookRequest = { msg: "sendHookRequest", data };
  chrome.runtime.sendMessage(payload);
};

const onCSMessage = ({ msg, url}: UpdateHookUri) => {
  if (msg === "updateHookUri") {
    const payload: UpdateHookUri = { msg: "updateHookUri", url };
    chrome.runtime.sendMessage(payload);
  }
};

const initMessaging = () => {
  chrome.runtime.onMessage.addListener(onCSMessage);
};

function FC() {
  initEvent();
  initMessaging();
}

FC();
