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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSaobracajnaApiLib = void 0;
var ffi_napi_1 = __importDefault(require("ffi-napi"));
var types_1 = __importStar(require("./types"));
var get_saobracajnaApi_path_1 = require("../../util/get-saobracajnaApi-path");
var createSaobracajnaApiLib = function () {
    return ffi_napi_1.default.Library(get_saobracajnaApi_path_1.SAOBRACAJNAAPI_DLL_PATH, {
        sdStartup: ["longlong", ["int"]],
        sdCleanup: ["longlong", []],
        GetReaderName: ["longlong", ["long", types_1.default.LPCSTR, "long*"]],
        SelectReader: ["longlong", [types_1.default.LPCSTR]],
        sdProcessNewCard: ["longlong", []],
        sdReadDocumentData: ["longlong", [types_1.refTypeOf(types_1.default.SD_DOCUMENT_DATA)]],
        sdReadVehicleData: ["longlong", [types_1.refTypeOf(types_1.default.SD_VEHICLE_DATA)]],
        sdReadPersonalData: ["longlong", [types_1.refTypeOf(types_1.default.SD_PERSONAL_DATA)]],
        sdReadRegistration: [
            "longlong",
            [types_1.refTypeOf(types_1.default.SD_REGISTRATION_DATA), "long"],
        ],
        // long sdStartup(long version);
        // long sdCleanup();
        // long GetReaderName(long index, char* readerName, long* nameSize);
        // long SelectReader(char* reader);
        // long sdProcessNewCard();
        // long sdReadDocumentData(SD_DOCUMENT_DATA* data);
        // long sdReadVehicleData(SD_VEHICLE_DATA* data);
        // long sdReadPersonalData(SD_PERSONAL_DATA* data);
        // long sdReadRegistration(SD_REGISTRATION_DATA* data, long index);
    });
};
exports.createSaobracajnaApiLib = createSaobracajnaApiLib;
