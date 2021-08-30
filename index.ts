import SaobracajnaApi, { SaobracajnaApiResponseStatus } from "./models/api/api";

class MUPSaobracajnaApi {
    
}


/* EXAMPLE */
const smartcard = require("smartcard");
const devices = new smartcard.Devices();

devices.on("device-activated", (e: any) => {
  console.log("---Device:", e.device.name);
  console.log("Waiting for card...");
  const api = new SaobracajnaApi();
  let status;
  if (api.startup().status === SaobracajnaApiResponseStatus.OK) {
    console.log("Started.");
    status = api.selectReader(e.device.name).status;
    if (status === SaobracajnaApiResponseStatus.OK) {
      e.device.on("card-inserted", (e: any) => {
        console.log("---Card:", e.card.getAtr());

        status = api.processNewCard().status;
        if (status === SaobracajnaApiResponseStatus.OK) {
          const res = api.readDocumentData();
          if (res.status === SaobracajnaApiResponseStatus.OK) {
            console.log(res.data);
          } else {
            console.log(res.status);
          }
        } else {
          console.log(status);
        }
      });
    } else {
      console.log(status);
    }
  } else {
    console.log("ERROR");
  }
});
console.log("Waiting for device...");
