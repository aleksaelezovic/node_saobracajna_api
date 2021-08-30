export type sdDocumentData = {
  stateIssuing: string;
  competentAuthority: string;
  authorityIssuing: string;
  unambiguousNumber: string;
  issuingDate: string;
  expiryDate: string;
  serialNumber: string;
};
export type sdPersonalData = {
  ownersPersonalNo: string;
  ownersSurnameOrBusinessName: string;
  ownerName: string;
  ownerAddress: string;
  usersPersonalNo: string;
  usersSurnameOrBusinessName: string;
  usersName: string;
  usersAddress: string;
};
export type sdVehicleData = {
  dateOfFirstRegistration: string;
  yearOfProduction: string;
  vehicleMake: string;
  vehicleType: string;
  commercialDescription: string;
  vehicleIDNumber: string;
  registrationNumberOfVehicle: string;
  maximumNetPower: string;
  engineCapacity: string;
  typeOfFuel: string;
  powerWeightRatio: string;
  vehicleMass: string;
  maximumPermissibleLadenMass: string;
  typeApprovalNumber: string;
  numberOfSeats: string;
  numberOfStandingPlaces: string;
  engineIDNumber: string;
  numberOfAxles: string;
  vehicleCategory: string;
  colourOfVehicle: string;
  restrictionToChangeOwner: string;
  vehicleLoad: string;
};
export type sdRegistrationData = {
  registrationData: string;
  signatureData: string;
  issuingAuthority: string;
};

export enum RegistrationIndex {
  EF_Registration_A = 1,
  EF_Registration_B = 2,
  EF_Registration_C = 3,
}

export default {
  RegistrationIndex,
};
