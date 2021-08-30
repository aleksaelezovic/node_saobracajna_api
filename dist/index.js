"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrationIndex = exports.MUPSaobracajnaApi = void 0;
var api_1 = __importStar(require("./models/api/api"));
var types_1 = require("./models/api/types");
Object.defineProperty(exports, "RegistrationIndex", { enumerable: true, get: function () { return types_1.RegistrationIndex; } });
var MUPSaobracajnaApi = /** @class */ (function () {
    function MUPSaobracajnaApi(device, cacheEnabled, isInit) {
        if (device === void 0) { device = ""; }
        if (cacheEnabled === void 0) { cacheEnabled = false; }
        if (isInit === void 0) { isInit = false; }
        this.cacheEnabled = cacheEnabled;
        this.isInit = isInit;
        this.device = "";
        this.api = new api_1.default();
        this.start();
        if (device)
            this.selectReaderSync(device);
    }
    MUPSaobracajnaApi.prototype.start = function () {
        var status = this.api.startup().status;
        if (status !== api_1.SaobracajnaApiResponseStatus.OK)
            throw new Error(status);
        this.isInit = true;
    };
    MUPSaobracajnaApi.prototype.selectReaderSync = function (device) {
        var status = this.api.selectReader(device).status;
        if (status !== api_1.SaobracajnaApiResponseStatus.OK)
            throw new Error(status);
    };
    MUPSaobracajnaApi.prototype.processNewCard = function () {
        return __awaiter(this, void 0, void 0, function () {
            var status;
            return __generator(this, function (_a) {
                status = this.api.processNewCard().status;
                if (status !== api_1.SaobracajnaApiResponseStatus.OK)
                    throw new Error(status);
                return [2 /*return*/];
            });
        });
    };
    MUPSaobracajnaApi.prototype.readAllData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.cacheEnabled) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.processNewCard()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, Promise.all([
                            this.readDocumentData(false),
                            this.readPersonalData(false),
                            this.readVehicleData(false),
                        ])];
                    case 3:
                        res = _a.sent();
                        return [2 /*return*/, __assign(__assign(__assign({}, res[0]), res[1]), res[2])];
                }
            });
        });
    };
    MUPSaobracajnaApi.prototype.readDocumentData = function (forceRead) {
        if (forceRead === void 0) { forceRead = !this.cacheEnabled; }
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!forceRead) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.processNewCard()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        res = this.api.readDocumentData();
                        if (res.status !== api_1.SaobracajnaApiResponseStatus.OK)
                            throw new Error(res.status);
                        return [2 /*return*/, res.data];
                }
            });
        });
    };
    MUPSaobracajnaApi.prototype.readVehicleData = function (forceRead) {
        if (forceRead === void 0) { forceRead = !this.cacheEnabled; }
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!forceRead) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.processNewCard()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        res = this.api.readVehicleData();
                        if (res.status !== api_1.SaobracajnaApiResponseStatus.OK)
                            throw new Error(res.status);
                        return [2 /*return*/, res.data];
                }
            });
        });
    };
    MUPSaobracajnaApi.prototype.readPersonalData = function (forceRead) {
        if (forceRead === void 0) { forceRead = !this.cacheEnabled; }
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!forceRead) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.processNewCard()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        res = this.api.readPersonalData();
                        if (res.status !== api_1.SaobracajnaApiResponseStatus.OK)
                            throw new Error(res.status);
                        return [2 /*return*/, res.data];
                }
            });
        });
    };
    MUPSaobracajnaApi.prototype.readRegistration = function (regInd, forceRead) {
        if (forceRead === void 0) { forceRead = !this.cacheEnabled; }
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!forceRead) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.processNewCard()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        res = this.api.readRegistration(regInd);
                        if (res.status !== api_1.SaobracajnaApiResponseStatus.OK)
                            throw new Error(res.status);
                        return [2 /*return*/, res.data];
                }
            });
        });
    };
    MUPSaobracajnaApi.prototype.end = function () {
        return __awaiter(this, void 0, void 0, function () {
            var status;
            return __generator(this, function (_a) {
                if (!this.isInit)
                    return [2 /*return*/];
                status = this.api.cleanup().status;
                if (status !== api_1.SaobracajnaApiResponseStatus.OK)
                    throw new Error(status);
                this.isInit = false;
                return [2 /*return*/];
            });
        });
    };
    return MUPSaobracajnaApi;
}());
exports.MUPSaobracajnaApi = MUPSaobracajnaApi;
exports.default = MUPSaobracajnaApi;
/* EXAMPLE */
var smartcard = require("smartcard");
var devices = new smartcard.Devices();
devices.on("device-activated", function (e) {
    console.log("---Device:", e.device.name);
    console.log("Waiting for card...");
    e.device.on("card-inserted", function (e) {
        console.log("---Card:", e.card.getAtr());
        _test(e.device.name);
    });
});
console.log("Waiting for device...");
var _test = function (device) { return __awaiter(void 0, void 0, void 0, function () {
    var celik, data, e_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log("---START---");
                celik = new MUPSaobracajnaApi(device);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, 4, 6]);
                return [4 /*yield*/, celik.readAllData()];
            case 2:
                data = _b.sent();
                console.log(data);
                return [3 /*break*/, 6];
            case 3:
                e_1 = _b.sent();
                console.log((_a = e_1.message) !== null && _a !== void 0 ? _a : new Error(e_1));
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, celik.end()];
            case 5:
                _b.sent();
                console.log("---END---");
                process.exit();
                return [7 /*endfinally*/];
            case 6: return [2 /*return*/];
        }
    });
}); };
