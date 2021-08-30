"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refGetVal = exports.createRefOf = exports.refTypeOf = void 0;
var ref_napi_1 = __importDefault(require("ref-napi"));
var StructType = require("ref-struct-di")(ref_napi_1.default);
var char = function (bytes) {
    return {
        indirection: 1,
        size: bytes,
        alignment: 4,
        name: "String",
        get: function (buffer, offset) { return [buffer, offset]; },
        set: function (buffer, offset, value) {
            var x = buffer.write(value, offset, "utf-8");
            return buffer;
        },
    };
};
var SD_DOCUMENT_DATA = StructType({
    stateIssuing: char(50),
    stateIssuingSize: ref_napi_1.default.types.long,
    competentAuthority: char(50),
    competentAuthoritySize: ref_napi_1.default.types.long,
    authorityIssuing: char(50),
    authorityIssuingSize: ref_napi_1.default.types.long,
    unambiguousNumber: char(30),
    unambiguousNumberSize: ref_napi_1.default.types.long,
    issuingDate: char(16),
    issuingDateSize: ref_napi_1.default.types.long,
    expiryDate: char(16),
    expiryDateSize: ref_napi_1.default.types.long,
    serialNumber: char(20),
    serialNumberSize: ref_napi_1.default.types.long,
});
var SD_PERSONAL_DATA = StructType({
    ownersPersonalNo: char(20),
    ownersPersonalNoSize: ref_napi_1.default.types.long,
    ownersSurnameOrBusinessName: char(100),
    ownersSurnameOrBusinessNameSize: ref_napi_1.default.types.long,
    ownerName: char(100),
    ownerNameSize: ref_napi_1.default.types.long,
    ownerAddress: char(200),
    ownerAddressSize: ref_napi_1.default.types.long,
    usersPersonalNo: char(20),
    usersPersonalNoSize: ref_napi_1.default.types.long,
    usersSurnameOrBusinessName: char(100),
    usersSurnameOrBusinessNameSize: ref_napi_1.default.types.long,
    usersName: char(100),
    usersNameSize: ref_napi_1.default.types.long,
    usersAddress: char(200),
    usersAddressSize: ref_napi_1.default.types.long,
});
var SD_VEHICLE_DATA = StructType({
    dateOfFirstRegistration: char(16),
    dateOfFirstRegistrationSize: ref_napi_1.default.types.long,
    yearOfProduction: char(5),
    yearOfProductionSize: ref_napi_1.default.types.long,
    vehicleMake: char(100),
    vehicleMakeSize: ref_napi_1.default.types.long,
    vehicleType: char(100),
    vehicleTypeSize: ref_napi_1.default.types.long,
    commercialDescription: char(100),
    commercialDescriptionSize: ref_napi_1.default.types.long,
    vehicleIDNumber: char(100),
    vehicleIDNumberSize: ref_napi_1.default.types.long,
    registrationNumberOfVehicle: char(20),
    registrationNumberOfVehicleSize: ref_napi_1.default.types.long,
    maximumNetPower: char(20),
    maximumNetPowerSize: ref_napi_1.default.types.long,
    engineCapacity: char(20),
    engineCapacitySize: ref_napi_1.default.types.long,
    typeOfFuel: char(100),
    typeOfFuelSize: ref_napi_1.default.types.long,
    powerWeightRatio: char(20),
    powerWeightRatioSize: ref_napi_1.default.types.long,
    vehicleMass: char(20),
    vehicleMassSize: ref_napi_1.default.types.long,
    maximumPermissibleLadenMass: char(20),
    maximumPermissibleLadenMassSize: ref_napi_1.default.types.long,
    typeApprovalNumber: char(50),
    typeApprovalNumberSize: ref_napi_1.default.types.long,
    numberOfSeats: char(20),
    numberOfSeatsSize: ref_napi_1.default.types.long,
    numberOfStandingPlaces: char(20),
    numberOfStandingPlacesSize: ref_napi_1.default.types.long,
    engineIDNumber: char(100),
    engineIDNumberSize: ref_napi_1.default.types.long,
    numberOfAxles: char(20),
    numberOfAxlesSize: ref_napi_1.default.types.long,
    vehicleCategory: char(50),
    vehicleCategorySize: ref_napi_1.default.types.long,
    colourOfVehicle: char(50),
    colourOfVehicleSize: ref_napi_1.default.types.long,
    restrictionToChangeOwner: char(200),
    restrictionToChangeOwnerSize: ref_napi_1.default.types.long,
    vehicleLoad: char(20),
    vehicleLoadSize: ref_napi_1.default.types.long,
});
var SD_REGISTRATION_DATA = StructType({
    registrationData: char(4096),
    registrationDataSize: ref_napi_1.default.types.long,
    signatureData: char(1024),
    signatureDataSize: ref_napi_1.default.types.long,
    issuingAuthority: char(4096),
    issuingAuthoritySize: ref_napi_1.default.types.long,
});
var LPCSTR = ref_napi_1.default.types.CString;
var UINT_PTR = "uint*";
exports.refTypeOf = ref_napi_1.default.refType;
var createRefOf = function (type, value) {
    return ref_napi_1.default.ref(ref_napi_1.default.alloc(type, value));
};
exports.createRefOf = createRefOf;
exports.refGetVal = ref_napi_1.default.get;
exports.default = {
    SD_DOCUMENT_DATA: SD_DOCUMENT_DATA,
    SD_PERSONAL_DATA: SD_PERSONAL_DATA,
    SD_VEHICLE_DATA: SD_VEHICLE_DATA,
    SD_REGISTRATION_DATA: SD_REGISTRATION_DATA,
    LPCSTR: LPCSTR,
    UINT_PTR: UINT_PTR,
    refTypeOf: exports.refTypeOf,
    createRefOf: exports.createRefOf,
    refGetVal: exports.refGetVal,
};
