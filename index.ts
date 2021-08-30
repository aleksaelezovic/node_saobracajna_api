import SaobracajnaApi, { SaobracajnaApiResponseStatus } from "./models/api/api";
import { RegistrationIndex } from "./models/api/types";

export default class MUPSaobracajnaApi {
  private api: SaobracajnaApi;
  device: string = "";
  constructor(
    device = "",
    private cacheEnabled = false,
    private isInit = false
  ) {
    this.api = new SaobracajnaApi();
    this.start();
    if (device) this.selectReaderSync(device);
  }

  private start() {
    const status = this.api.startup().status;
    if (status !== SaobracajnaApiResponseStatus.OK) throw new Error(status);
    this.isInit = true;
  }
  private selectReaderSync(device: string) {
    const status = this.api.selectReader(device).status;
    if (status !== SaobracajnaApiResponseStatus.OK) throw new Error(status);
  }
  async processNewCard() {
    const status = this.api.processNewCard().status;
    if (status !== SaobracajnaApiResponseStatus.OK) throw new Error(status);
  }
  async readAllData() {
    if (!this.cacheEnabled) {
      await this.processNewCard();
    }

    const res = await Promise.all([
      this.readDocumentData(false),
      this.readPersonalData(false),
      this.readVehicleData(false),
    ]);
    return { ...res[0], ...res[1], ...res[2] };
  }
  async readDocumentData(forceRead = !this.cacheEnabled) {
    if (forceRead) await this.processNewCard();
    const res = this.api.readDocumentData();
    if (res.status !== SaobracajnaApiResponseStatus.OK)
      throw new Error(res.status);
    return res.data!;
  }
  async readVehicleData(forceRead = !this.cacheEnabled) {
    if (forceRead) await this.processNewCard();
    const res = this.api.readVehicleData();
    if (res.status !== SaobracajnaApiResponseStatus.OK)
      throw new Error(res.status);
    return res.data!;
  }
  async readPersonalData(forceRead = !this.cacheEnabled) {
    if (forceRead) await this.processNewCard();
    const res = this.api.readPersonalData();
    if (res.status !== SaobracajnaApiResponseStatus.OK)
      throw new Error(res.status);
    return res.data!;
  }
  async readRegistration(
    regInd: RegistrationIndex,
    forceRead = !this.cacheEnabled
  ) {
    if (forceRead) await this.processNewCard();
    const res = this.api.readRegistration(regInd);
    if (res.status !== SaobracajnaApiResponseStatus.OK)
      throw new Error(res.status);
    return res.data!;
  }
  async end() {
    if (!this.isInit) return;
    const status = this.api.cleanup().status;
    if (status !== SaobracajnaApiResponseStatus.OK) throw new Error(status);
    this.isInit = false;
  }
}
export {MUPSaobracajnaApi, RegistrationIndex }

/* EXAMPLE */
const smartcard = require("smartcard");
const devices = new smartcard.Devices();

devices.on("device-activated", (e: any) => {
  console.log("---Device:", e.device.name);
  console.log("Waiting for card...");

  e.device.on("card-inserted", (e: any) => {
    console.log("---Card:", e.card.getAtr());

    _test(e.device.name);
  });
});
console.log("Waiting for device...");

const _test = async (device: string) => {
  console.log("---START---");
  const celik = new MUPSaobracajnaApi(device);
  try {
    const data = await celik.readAllData();
    console.log(data);
    // const reg = await celik.readRegistration(RegistrationIndex.EF_Registration_A);
    // console.log(reg);
  } catch (e: any) {
    console.log(e.message ?? new Error(e));
  } finally {
    await celik.end();
    console.log("---END---");
    process.exit();
  }
};
