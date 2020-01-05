"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DEG2RAD = 0.017453292;
class Color3 {
    constructor(_r = 0, _g = 0, _b = 0) {
        this.r = 0;
        this.g = 0;
        this.b = 0;
        this.r = _r;
        this.g = _g;
        this.b = _b;
    }
    toPercent() {
        return new Color3(this.r / 255, this.g / 255, this.b / 255);
    }
    clamped() {
        return new Color3(this.r > 255 ? 255 : this.r < 0 ? 0 : this.r, this.g > 255 ? 255 : this.g < 0 ? 0 : this.g, this.b > 255 ? 255 : this.b < 0 ? 0 : this.b);
    }
    toString() {
        return "( " + this.r.toString() + ", " + this.g.toString() + ", " + this.b.toString() + " )";
    }
}
exports.Color3 = Color3;
//# sourceMappingURL=Color3.js.map