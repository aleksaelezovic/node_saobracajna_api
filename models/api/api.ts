import { createSaobracajnaApiLib } from "../saobracajna/lib";
import {
  getResponse,
  SaobracajnaApiResponse,
  SaobracajnaApiResponseStatus,
} from "./responses";
import API_TYPES, { Pointer } from "../saobracajna/types";
import { RegistrationIndex } from "./types";
import { convertStruct } from "../converter";

class SaobracajnaApi {
  private saobracajnaApiLib;
  constructor() {
    this.saobracajnaApiLib = createSaobracajnaApiLib();
  }

  startup(apiVersion = 3): SaobracajnaApiResponse {
    // TRENUTNA (AVG 2021) VERZIJA API-ja je: 3
    return getResponse(this.saobracajnaApiLib.sdStartup(apiVersion));
  }
  cleanup(): SaobracajnaApiResponse {
    return getResponse(this.saobracajnaApiLib.sdCleanup());
  }
  selectReader(readerName: string): SaobracajnaApiResponse {
    return getResponse(this.saobracajnaApiLib.SelectReader(readerName));
  }
  processNewCard(): SaobracajnaApiResponse {
    return getResponse(this.saobracajnaApiLib.sdProcessNewCard());
  }
  readDocumentData(): SaobracajnaApiResponse {
    const pData = new API_TYPES.SD_DOCUMENT_DATA();
    const res = this.saobracajnaApiLib.sdReadDocumentData(pData.ref());
    return getResponse(res, convertStruct(pData));
  }
  readVehicleData(): SaobracajnaApiResponse {
    const pData = new API_TYPES.SD_VEHICLE_DATA();
    const res = this.saobracajnaApiLib.sdReadVehicleData(pData.ref());
    return getResponse(res, convertStruct(pData));
  }
  readPersonalData(): SaobracajnaApiResponse {
    const pData = new API_TYPES.SD_PERSONAL_DATA();
    const res = this.saobracajnaApiLib.sdReadPersonalData(pData.ref());
    return getResponse(res, convertStruct(pData));
  }
  readRegistration(index: RegistrationIndex): SaobracajnaApiResponse {
    const pData = new API_TYPES.SD_REGISTRATION_DATA();
    const res = this.saobracajnaApiLib.sdReadRegistration(pData.ref(), index);
    return getResponse(res, convertStruct(pData));
  }
}

export { SaobracajnaApi, SaobracajnaApiResponseStatus };
export default SaobracajnaApi;
