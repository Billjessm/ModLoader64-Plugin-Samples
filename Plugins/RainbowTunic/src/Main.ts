import { EventsClient, EventHandler } from 'modloader64_api/EventHandler';
import { IModLoaderAPI, IPlugin } from 'modloader64_api/IModLoaderAPI';
import { InjectCore } from 'modloader64_api/CoreInjection';
import { IOOTCore } from 'modloader64_api/OOT/OOTAPI';

const TUNICADDR = 0x000f7ad8;

enum CurrentColor{
  r,
  g,
  b
}

let cCol = CurrentColor.r;
let velocity = 4;
let r = 0;
let g = 0;
let b = 0;

export class RainbowTunic implements IPlugin {
  ModLoader = {} as IModLoaderAPI;
  name = 'RainbowTunic';
  
  @InjectCore() core!: IOOTCore;
  constructor() {}
  preinit(): void {}
  init(): void {}
  postinit(): void {}

  onTick(): void {
    let tunicOffset = TUNICADDR + this.core.link.tunic * 3;

    if (cCol == CurrentColor.r){
      r = r + velocity;
      if (r < 0) r = 0;
      if (r > 255) r = 255;
      cCol = (r == 255 || r == 0) ? CurrentColor.g : cCol;
    }
    else if(cCol == CurrentColor.g){
      g = g + velocity;
      if (g < 0) g = 0;
      if (g > 255) g = 255;
      cCol = (g == 255 || g == 0) ? CurrentColor.b : cCol;
    }
    else{
      b = b + velocity;
      if (b < 0) b = 0;
      if (b > 255) b = 255;
      if (b == 255 || b == 0){
        cCol = CurrentColor.r;
        velocity = velocity * -1;
      }
    }

    this.ModLoader.emulator.rdramWriteBuffer(tunicOffset, Buffer.from([r, g, b]));
  }

  @EventHandler(EventsClient.ON_INJECT_FINISHED)
  onClient_InjectFinished(evt: any) {}
}
