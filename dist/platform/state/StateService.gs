"use strict";
/// <reference path="../config/ConfigService.ts" />
var Platform;
(function (Platform) {
    var State;
    (function (State) {
        class StateService {
            constructor(namespace = '') {
                this.namespace = namespace;
            }
            scope(prefix) {
                return new StateService(this.namespace ? `${this.namespace}.${prefix}` : prefix);
            }
            get(key) {
                const fullKey = this.getFullKey(key);
                return PropertiesService.getScriptProperties().getProperty(fullKey);
            }
            set(key, value) {
                const fullKey = this.getFullKey(key);
                PropertiesService.getScriptProperties().setProperty(fullKey, value);
            }
            getJson(key) {
                const val = this.get(key);
                if (!val)
                    return null;
                try {
                    return JSON.parse(val);
                }
                catch (e) {
                    console.warn(`Failed to parse state for key ${key}`, e);
                    return null;
                }
            }
            setJson(key, value) {
                this.set(key, JSON.stringify(value));
            }
            delete(key) {
                const fullKey = this.getFullKey(key);
                PropertiesService.getScriptProperties().deleteProperty(fullKey);
            }
            getFullKey(key) {
                return this.namespace ? `${this.namespace}.${key}` : key;
            }
        }
        State.StateService = StateService;
    })(State = Platform.State || (Platform.State = {}));
})(Platform || (Platform = {}));
