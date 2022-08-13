interface SendHookRequest {
  msg: "sendHookRequest";
  data: { url: string };
}
interface UpdateHookUri {
  msg: "updateHookUri";
  url: string;
}
interface SendHookUri {
  msg: "sendHookUri";
  webHookUrl: string;
}
interface GetHookUri {
  msg: "getHookUri";
}
type HookEvents = SendHookRequest | UpdateHookUri | SendHookUri | GetHookUri;

interface ChStorageObject{
    webHookUri: string;
}