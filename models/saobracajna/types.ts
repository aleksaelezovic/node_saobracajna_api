import ref from "ref-napi";
const StructType = require("ref-struct-di")(ref);

const char = (bytes: number): ref.Type<any> => {
  return {
    indirection: 1,
    size: bytes,
    alignment: 4,
    name: "String",
    get: (buffer: Buffer, offset: number) => [buffer, offset],
    set: (buffer: Buffer, offset: number, value: string) => {
      const x = buffer.write(value, offset, "utf-8");
      return buffer;
    },
  };
};

const SD_DOCUMENT_DATA = StructType({
  stateIssuing: char(50),
  stateIssuingSize: ref.types.long,
  competentAuthority: char(50),
  competentAuthoritySize: ref.types.long,
  authorityIssuing: char(50),
  authorityIssuingSize: ref.types.long,
  unambiguousNumber: char(30),
  unambiguousNumberSize: ref.types.long,
  issuingDate: char(16),
  issuingDateSize: ref.types.long,
  expiryDate: char(16),
  expiryDateSize: ref.types.long,
  serialNumber: char(20),
  serialNumberSize: ref.types.long,
});

const SD_PERSONAL_DATA = StructType({
  ownersPersonalNo: char(20),
  ownersPersonalNoSize: ref.types.long,
  ownersSurnameOrBusinessName: char(100),
  ownersSurnameOrBusinessNameSize: ref.types.long,
  ownerName: char(100),
  ownerNameSize: ref.types.long,
  ownerAddress: char(200),
  ownerAddressSize: ref.types.long,
  usersPersonalNo: char(20),
  usersPersonalNoSize: ref.types.long,
  usersSurnameOrBusinessName: char(100),
  usersSurnameOrBusinessNameSize: ref.types.long,
  usersName: char(100),
  usersNameSize: ref.types.long,
  usersAddress: char(200),
  usersAddressSize: ref.types.long,
});

const SD_VEHICLE_DATA = StructType({
  dateOfFirstRegistration: char(16),
  dateOfFirstRegistrationSize: ref.types.long,
  yearOfProduction: char(5),
  yearOfProductionSize: ref.types.long,
  vehicleMake: char(100),
  vehicleMakeSize: ref.types.long,
  vehicleType: char(100),
  vehicleTypeSize: ref.types.long,
  commercialDescription: char(100),
  commercialDescriptionSize: ref.types.long,
  vehicleIDNumber: char(100),
  vehicleIDNumberSize: ref.types.long,
  registrationNumberOfVehicle: char(20),
  registrationNumberOfVehicleSize: ref.types.long,
  maximumNetPower: char(20),
  maximumNetPowerSize: ref.types.long,
  engineCapacity: char(20),
  engineCapacitySize: ref.types.long,
  typeOfFuel: char(100),
  typeOfFuelSize: ref.types.long,
  powerWeightRatio: char(20),
  powerWeightRatioSize: ref.types.long,
  vehicleMass: char(20),
  vehicleMassSize: ref.types.long,
  maximumPermissibleLadenMass: char(20),
  maximumPermissibleLadenMassSize: ref.types.long,
  typeApprovalNumber: char(50),
  typeApprovalNumberSize: ref.types.long,
  numberOfSeats: char(20),
  numberOfSeatsSize: ref.types.long,
  numberOfStandingPlaces: char(20),
  numberOfStandingPlacesSize: ref.types.long,
  engineIDNumber: char(100),
  engineIDNumberSize: ref.types.long,
  numberOfAxles: char(20),
  numberOfAxlesSize: ref.types.long,
  vehicleCategory: char(50),
  vehicleCategorySize: ref.types.long,
  colourOfVehicle: char(50),
  colourOfVehicleSize: ref.types.long,
  restrictionToChangeOwner: char(200),
  restrictionToChangeOwnerSize: ref.types.long,
  vehicleLoad: char(20),
  vehicleLoadSize: ref.types.long,
});

const SD_REGISTRATION_DATA = StructType({
  registrationData: char(4096),
  registrationDataSize: ref.types.long,
  signatureData: char(1024),
  signatureDataSize: ref.types.long,
  issuingAuthority: char(4096),
  issuingAuthoritySize: ref.types.long,
});

const LPCSTR = ref.types.CString;
const UINT_PTR = "uint*";

export const refTypeOf = ref.refType;
export const createRefOf = <T extends ref.TypeLike>(
  type: T,
  value?: ref.UnderlyingType<T>
): ref.Pointer<ref.UnderlyingType<T>> =>
  ref.ref(ref.alloc(type, value) as ref.Value<ref.UnderlyingType<T>>);
export const refGetVal = ref.get;
export interface Pointer<T> extends ref.Pointer<T> {}

export default {
  SD_DOCUMENT_DATA,
  SD_PERSONAL_DATA,
  SD_VEHICLE_DATA,
  SD_REGISTRATION_DATA,
  LPCSTR,
  UINT_PTR,
  refTypeOf,
  createRefOf,
  refGetVal,
};
