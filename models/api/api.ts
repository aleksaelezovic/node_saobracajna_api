import { createSaobracajnaApiLib } from "../saobracajna/lib";
import {
  getResponse,
  SaobracajnaApiResponse,
  SaobracajnaApiResponseStatus,
} from "./responses";
import API_TYPES from "../saobracajna/types";
import {
  RegistrationIndex,
  sdDocumentData,
  sdPersonalData,
  sdRegistrationData,
  sdVehicleData,
} from "./types";
import { convertStruct } from "../converter";

class SaobracajnaApi {
  private saobracajnaApiLib;
  constructor() {
    this.saobracajnaApiLib = createSaobracajnaApiLib();
  }

  startup(apiVersion = 1): SaobracajnaApiResponse {
    // TRENUTNA (AVG 2021) VERZIJA API-ja je: 1
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
  readDocumentData(): SaobracajnaApiResponse<sdDocumentData> {
    const pData = new API_TYPES.SD_DOCUMENT_DATA();
    const res = this.saobracajnaApiLib.sdReadDocumentData(pData.ref());
    return getResponse(res, convertStruct(pData) as sdDocumentData);
  }
  readVehicleData(): SaobracajnaApiResponse<sdVehicleData> {
    const pData = new API_TYPES.SD_VEHICLE_DATA();
    const res = this.saobracajnaApiLib.sdReadVehicleData(pData.ref());
    return getResponse(res, convertStruct(pData) as sdVehicleData);
  }
  readPersonalData(): SaobracajnaApiResponse<sdPersonalData> {
    const pData = new API_TYPES.SD_PERSONAL_DATA();
    const res = this.saobracajnaApiLib.sdReadPersonalData(pData.ref());
    return getResponse(res, convertStruct(pData) as sdPersonalData);
  }
  readRegistration(
    index: RegistrationIndex
  ): SaobracajnaApiResponse<sdRegistrationData> {
    const pData = new API_TYPES.SD_REGISTRATION_DATA();
    const res = this.saobracajnaApiLib.sdReadRegistration(pData.ref(), index);
    return getResponse(res, convertStruct(pData) as sdRegistrationData);
  }
}

export { SaobracajnaApi, SaobracajnaApiResponseStatus };
export default SaobracajnaApi;
