import * as ERRORS from "../saobracajna/errors";

export enum SaobracajnaApiResponseStatus {
  OK = "OK",
  ERROR = "Unknown Error Occurred.",
  ERROR_NO_READERS = "No readers available",
  ERROR_NOT_INITIALIZED = "Not initialized.",
  ERROR_INVALID_PARAMETER = "Invalid parameter.",
  ERROR_READER = "Reader error.",
  ERROR_CARD_MISSING = "Cannot find a valid card.",
  ERROR_CARD_NOT_SUPPORTED = "Card not supported.",
  ERROR_INVALID_DATA = "Invalid data.",
  SERVICE_ALREADY_RUNNING = "Service already running.",
  ERROR_INSUFFICIENT_BUFFER = "Insufficient buffer provided.",
  ERROR_BAD_FORMAT = "Bad format.",
}

export const getSaobracajnaApiStatus = (
  code: number
): SaobracajnaApiResponseStatus => {
  switch (code) {
    case ERRORS.S_OK:
      return SaobracajnaApiResponseStatus.OK;
    case ERRORS.ERROR_SERVICE_ALREADY_RUNNING:
      return SaobracajnaApiResponseStatus.SERVICE_ALREADY_RUNNING;
    case ERRORS.ERROR_SERVICE_NOT_ACTIVE:
    case ERRORS.ERROR_INVALID_ACCESS:
      return SaobracajnaApiResponseStatus.ERROR_NOT_INITIALIZED;
    case ERRORS.SCARD_E_NO_READERS_AVAILABLE:
      return SaobracajnaApiResponseStatus.ERROR_NO_READERS;
    case ERRORS.ERROR_INVALID_PARAMETER:
    case ERRORS.E_POINTER:
      return SaobracajnaApiResponseStatus.ERROR_INVALID_PARAMETER;
    case ERRORS.SCARD_E_UNKNOWN_READER:
      return SaobracajnaApiResponseStatus.ERROR_READER;
    case ERRORS.SCARD_E_NO_SMARTCARD:
      return SaobracajnaApiResponseStatus.ERROR_CARD_MISSING;
    case ERRORS.SCARD_E_CARD_UNSUPPORTED:
      return SaobracajnaApiResponseStatus.ERROR_CARD_NOT_SUPPORTED;
    case ERRORS.ERROR_INVALID_DATA:
      return SaobracajnaApiResponseStatus.ERROR_INVALID_DATA;
    case ERRORS.SCARD_E_INSUFFICIENT_BUFFER:
      return SaobracajnaApiResponseStatus.ERROR_INSUFFICIENT_BUFFER;
    case ERRORS.ERROR_BAD_FORMAT:
      return SaobracajnaApiResponseStatus.ERROR_BAD_FORMAT;
    default:
      return SaobracajnaApiResponseStatus.ERROR;
  }
};

export type SaobracajnaApiResponse<T = any> = {
  status: SaobracajnaApiResponseStatus;
  data: T | null;
};

export const getResponse = <T = any>(
  code: number,
  data: T | null = null
): SaobracajnaApiResponse<T> => {
  const responseStatus = getSaobracajnaApiStatus(code);
  return {
    status: responseStatus,
    data: data,
  };
};
