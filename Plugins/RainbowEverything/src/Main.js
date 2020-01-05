"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const EventHandler_1 = require("modloader64_api/EventHandler");
const CoreInjection_1 = require("modloader64_api/CoreInjection");
const Color3_1 = require("./Color3");
const GAUNTADDR = 0xf7ae4;
const TUNICADDR = 0x000f7ad8;
const NAVIBASER_ADDR = 0x801E2155;
const NAVIBASEG_ADDR = 0x801E2159;
const NAVIBASEB_ADDR = 0x801E215D;
const NAVIBASEA_ADDR = 0x801E2155;
const NAVIOUTR_ADDR = 0x801E2161;
const NAVIOUTG_ADDR = 0x801E2165;
const NAVIOUTB_ADDR = 0x801E2169;
let colorTargets = [
    new Color3_1.Color3(255, 0, 255),
    new Color3_1.Color3(255, 0, 0),
    new Color3_1.Color3(255, 255, 0),
    new Color3_1.Color3(0, 255, 0),
    new Color3_1.Color3(0, 255, 255),
    new Color3_1.Color3(0, 0, 255),
    new Color3_1.Color3(255, 0, 255)
];
let currentTarget = 0;
let currentColor = new Color3_1.Color3();
let velocity = 15;
class RainbowEverything {
    constructor() {
        this.ModLoader = {};
        this.name = 'RainbowEverything';
    }
    preinit() { }
    init() { }
    postinit() { }
    onTick() {
        //this.ModLoader.emulator.rdramWrite32(global.ModLoader.save_context + 0x4, 0); Force Adult Link
        let SilverOffset = GAUNTADDR + (0 * 3);
        let GoldOffset = GAUNTADDR + (1 * 3);
        let tunicOffset = TUNICADDR + this.core.link.tunic * 3;
        let naviOffset1 = NAVIBASER_ADDR;
        let naviOffset2 = NAVIBASEG_ADDR;
        let naviOffset3 = NAVIBASEB_ADDR;
        let naviOffset4 = NAVIBASEA_ADDR;
        let naviOffset5 = NAVIOUTR_ADDR;
        let naviOffset6 = NAVIOUTG_ADDR;
        let naviOffset7 = NAVIOUTB_ADDR;
        var rScalar = colorTargets[currentTarget].r == 255 ? 1 : -1;
        var gScalar = colorTargets[currentTarget].g == 255 ? 1 : -1;
        var bScalar = colorTargets[currentTarget].b == 255 ? 1 : -1;
        currentColor.r = currentColor.r + (velocity * rScalar);
        currentColor.g = currentColor.g + (velocity * gScalar);
        currentColor.b = currentColor.b + (velocity * bScalar);
        currentColor = currentColor.clamped();
        if (currentColor.r == colorTargets[currentTarget].r
            && currentColor.g == colorTargets[currentTarget].g
            && currentColor.b == colorTargets[currentTarget].b)
            currentTarget = (currentTarget + 1) % (colorTargets.length - 1);
        this.ModLoader.emulator.rdramWriteBuffer(SilverOffset, Buffer.from([currentColor.r, currentColor.g, currentColor.b]));
        this.ModLoader.emulator.rdramWriteBuffer(GoldOffset, Buffer.from([currentColor.r, currentColor.g, currentColor.b]));
        this.ModLoader.emulator.rdramWriteBuffer(tunicOffset, Buffer.from([currentColor.r, currentColor.g, currentColor.b]));
        this.ModLoader.emulator.rdramWriteBuffer(naviOffset1, Buffer.from([currentColor.r]));
        this.ModLoader.emulator.rdramWriteBuffer(naviOffset2, Buffer.from([currentColor.g]));
        this.ModLoader.emulator.rdramWriteBuffer(naviOffset3, Buffer.from([currentColor.b]));
        this.ModLoader.emulator.rdramWriteBuffer(naviOffset4, Buffer.from([currentColor.r, currentColor.g, currentColor.b]));
        this.ModLoader.emulator.rdramWriteBuffer(naviOffset5, Buffer.from([currentColor.r]));
        this.ModLoader.emulator.rdramWriteBuffer(naviOffset6, Buffer.from([currentColor.g]));
        this.ModLoader.emulator.rdramWriteBuffer(naviOffset7, Buffer.from([currentColor.b]));
    }
    onClient_InjectFinished(evt) { }
}
__decorate([
    CoreInjection_1.InjectCore()
], RainbowEverything.prototype, "core", void 0);
__decorate([
    EventHandler_1.EventHandler(EventHandler_1.EventsClient.ON_INJECT_FINISHED)
], RainbowEverything.prototype, "onClient_InjectFinished", null);
exports.RainbowEverything = RainbowEverything;
//# sourceMappingURL=Main.js.map