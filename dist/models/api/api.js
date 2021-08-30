"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaobracajnaApiResponseStatus = exports.SaobracajnaApi = void 0;
var lib_1 = require("../saobracajna/lib");
var responses_1 = require("./responses");
Object.defineProperty(exports, "SaobracajnaApiResponseStatus", { enumerable: true, get: function () { return responses_1.SaobracajnaApiResponseStatus; } });
var types_1 = __importDefault(require("../saobracajna/types"));
var converter_1 = require("../converter");
var SaobracajnaApi = /** @class */ (function () {
    function SaobracajnaApi() {
        this.saobracajnaApiLib = lib_1.createSaobracajnaApiLib();
    }
    SaobracajnaApi.prototype.startup = function (apiVersion) {
        if (apiVersion === void 0) { apiVersion = 1; }
        // TRENUTNA (AVG 2021) VERZIJA API-ja je: 1
        return responses_1.getResponse(this.saobracajnaApiLib.sdStartup(apiVersion));
    };
    SaobracajnaApi.prototype.cleanup = function () {
        return responses_1.getResponse(this.saobracajnaApiLib.sdCleanup());
    };
    SaobracajnaApi.prototype.selectReader = function (readerName) {
        return responses_1.getResponse(this.saobracajnaApiLib.SelectReader(readerName));
    };
    SaobracajnaApi.prototype.processNewCard = function () {
        return responses_1.getResponse(this.saobracajnaApiLib.sdProcessNewCard());
    };
    SaobracajnaApi.prototype.readDocumentData = function () {
        var pData = new types_1.default.SD_DOCUMENT_DATA();
        var res = this.saobracajnaApiLib.sdReadDocumentData(pData.ref());
        return responses_1.getResponse(res, converter_1.convertStruct(pData));
    };
    SaobracajnaApi.prototype.readVehicleData = function () {
        var pData = new types_1.default.SD_VEHICLE_DATA();
        var res = this.saobracajnaApiLib.sdReadVehicleData(pData.ref());
        return responses_1.getResponse(res, converter_1.convertStruct(pData));
    };
    SaobracajnaApi.prototype.readPersonalData = function () {
        var pData = new types_1.default.SD_PERSONAL_DATA();
        var res = this.saobracajnaApiLib.sdReadPersonalData(pData.ref());
        return responses_1.getResponse(res, converter_1.convertStruct(pData));
    };
    SaobracajnaApi.prototype.readRegistration = function (index) {
        var pData = new types_1.default.SD_REGISTRATION_DATA();
        var res = this.saobracajnaApiLib.sdReadRegistration(pData.ref(), index);
        return responses_1.getResponse(res, converter_1.convertStruct(pData));
    };
    return SaobracajnaApi;
}());
exports.SaobracajnaApi = SaobracajnaApi;
exports.default = SaobracajnaApi;
