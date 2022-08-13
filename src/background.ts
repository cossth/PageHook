import { isValidUrl } from "./utils";

class HookRef {
  private static hookUri = "";

  constructor() {
    chrome.storage.local.get(["webHookUri"], (result) => {
      const { webHookUri } = result;
      HookRef.Uri = webHookUri;
    });
  }

  public static get Uri(): string {
    return HookRef.hookUri;
  }

  public static set Uri(v: string) {
    HookRef.hookUri = v;

    const storageObject: ChStorageObject = { webHookUri: v };
    chrome.storage.local.set(storageObject, () => {
      HookRef.Uri = v;
    });
  }
}
const onBackgroundMessage = (request: HookEvents) => {
  switch (request.msg) {
    case "updateHookUri":
      HookRef.Uri = request.url;
      break;
    case "sendHookRequest":
      sendWebHookRequest(request.data);
      break;
    case "getHookUri":
        chrome.runtime.sendMessage({ msg: "sendHookUri", webHookUrl: HookRef.Uri });
      break;
  }
};

const sendWebHookRequest = (data: unknown) => {
  const webHookUrl =  HookRef.Uri;
  if (isValidUrl(webHookUrl)) {
    send(webHookUrl, data);
  } else {
    console.log(`Invalid URL : ${webHookUrl}`);
  }
};

const send = (webHookUrl: string, data: unknown) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const options: RequestInit = {
    method: "POST",
    headers,
    mode: "cors",
    body: JSON.stringify(data),
  };

  fetch(webHookUrl, options);
};


const initBackgroundMessaging = () => {
  chrome.runtime.onMessage.addListener(onBackgroundMessage);
};

initBackgroundMessaging();
