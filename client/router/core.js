// import { tools } from "utils";


// console.log("tools", tools);

import { tools } from "utils";

export function getRoute(cfg) {
    let _cfg = $.extend(true, {}, {
        // default


    }, cfg);

    // onEnter
    _cfg.onEnter = function () {
        if (typeof _cfg.getComponent === "function") {
            tools.showLoading()
        }

        if (typeof cfg.onEnter === "function") {
            cfg.onEnter.apply(this, Array.prototype.slice.call(arguments));
        }
    }

    // onLeave
    _cfg.onLeave = function () {
        if (typeof cfg.onLeave === "function") {
            cfg.onLeave.apply(this, Array.prototype.slice.call(arguments));
        }
    }

    return _cfg;
}