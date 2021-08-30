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
export { MUPSaobracajnaApi, RegistrationIndex };
