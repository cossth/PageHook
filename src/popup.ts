import { isValidUrl } from "./utils";

const getInputElement = () => document.getElementById('hook_url')! as HTMLInputElement;
const getErrorElement = () => document.getElementById('errorBox')!;

const onPopupMessage = ({msg, webHookUrl}: SendHookUri) => {
  if (msg === 'sendHookUri') {
    getInputElement().value = webHookUrl ?? '';
  }
}

function updateHookUri() {
  const url = getInputElement().value.trim();
  const errorElem = getErrorElement();
  if(isValidUrl(url)){
    const payload:UpdateHookUri = { msg: 'updateHookUri', url };
    chrome.runtime.sendMessage(payload);
    errorElem.innerText = "";
    errorElem.classList.add('hidden');
  }else{
    errorElem.classList.remove('hidden');
    errorElem.innerText = `Invalid URL : ${url}`;
  }
}

const initPopupMessaging = () => {
  chrome.runtime.onMessage.addListener(onPopupMessage);
}

document.onreadystatechange = function () {
  const saveBtn = document.getElementById('save')!;
  saveBtn.onclick = () => updateHookUri();
  initPopupMessaging();
  const payload: GetHookUri = { msg: 'getHookUri' };
  chrome.runtime.sendMessage(payload);
}