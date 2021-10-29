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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_context_selector_1 = require("react-context-selector");
var usePersistStorage_1 = __importDefault(require("./usePersistStorage"));
var createPersistContext = function (_a) {
    var storageKey = _a.storageKey, defaultData = _a.defaultData, options = _a.options;
    var createDefaultData = function () { return defaultData; };
    var Context = react_1.default.createContext([
        createDefaultData(),
        function () { },
        false,
    ]);
    var _b = react_context_selector_1.createContextSelector(Context), Cleaner = _b[0], useContextSelector = _b[1];
    var Provider = function (props) {
        var _a = usePersistStorage_1.default(storageKey, createDefaultData, __assign({ persist: props.persist }, options)), data = _a[0], setData = _a[1], restored = _a[2];
        return (react_1.default.createElement(Context.Provider, { value: [data, setData, restored] },
            react_1.default.createElement(Cleaner, null),
            props.children));
    };
    return {
        Provider: Provider,
        Context: Context,
        useData: useContextSelector,
    };
};
exports.default = createPersistContext;
