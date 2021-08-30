import path from "path";

export const SAOBRACAJNAAPI_DLL_PATH = path.resolve(
  __dirname,
  "..",
  // "..", // because of dist folder
  "saobracajnaAPI",
  "eVehicleRegistrationAPI.dll"
);
