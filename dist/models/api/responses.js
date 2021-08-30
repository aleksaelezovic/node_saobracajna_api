"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResponse = exports.getSaobracajnaApiStatus = exports.SaobracajnaApiResponseStatus = void 0;
var ERRORS = __importStar(require("../saobracajna/errors"));
var SaobracajnaApiResponseStatus;
(function (SaobracajnaApiResponseStatus) {
    SaobracajnaApiResponseStatus["OK"] = "OK";
    SaobracajnaApiResponseStatus["ERROR"] = "Unknown Error Occurred.";
    SaobracajnaApiResponseStatus["ERROR_NO_READERS"] = "No readers available";
    SaobracajnaApiResponseStatus["ERROR_NOT_INITIALIZED"] = "Not initialized.";
    SaobracajnaApiResponseStatus["ERROR_INVALID_PARAMETER"] = "Invalid parameter.";
    SaobracajnaApiResponseStatus["ERROR_READER"] = "Reader error.";
    SaobracajnaApiResponseStatus["ERROR_CARD_MISSING"] = "Cannot find a valid card.";
    SaobracajnaApiResponseStatus["ERROR_CARD_NOT_SUPPORTED"] = "Card not supported.";
    SaobracajnaApiResponseStatus["ERROR_INVALID_DATA"] = "Invalid data.";
    SaobracajnaApiResponseStatus["SERVICE_ALREADY_RUNNING"] = "Service already running.";
    SaobracajnaApiResponseStatus["ERROR_INSUFFICIENT_BUFFER"] = "Insufficient buffer provided.";
    SaobracajnaApiResponseStatus["ERROR_BAD_FORMAT"] = "Bad format.";
})(SaobracajnaApiResponseStatus = exports.SaobracajnaApiResponseStatus || (exports.SaobracajnaApiResponseStatus = {}));
var getSaobracajnaApiStatus = function (code) {
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
exports.getSaobracajnaApiStatus = getSaobracajnaApiStatus;
var getResponse = function (code, data) {
    if (data === void 0) { data = null; }
    var responseStatus = exports.getSaobracajnaApiStatus(code);
    return {
        status: responseStatus,
        data: data,
    };
};
exports.getResponse = getResponse;
