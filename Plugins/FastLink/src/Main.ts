import { EventsClient, EventHandler } from 'modloader64_api/EventHandler';
import { IModLoaderAPI, IPlugin } from 'modloader64_api/IModLoaderAPI';
import { InjectCore } from 'modloader64_api/CoreInjection';
import { IOOTCore, OotEvents } from 'modloader64_api/OOT/OOTAPI';
import { Vector3 } from './Vector3';

enum SleepState {
  Awake,
  ShouldSleep,
  Sleeping
}

const FPSADDR = 0x801C6FA1;
const XO = 0x24;
const YO = XO + 4;
const ZO = YO + 4;
const VXO = 0x5C;
const VYO = VXO + 4;
const VZO = VYO + 4;
const FRICTION = 4;

let lastPosition : Vector3 = new Vector3();
let lastTime : number = 0;
let time : number = 0;
let sleepState : SleepState = SleepState.Sleeping;

export class FastLink implements IPlugin {
  ModLoader = {} as IModLoaderAPI;
  name = 'FastLink';

  @InjectCore() core!: IOOTCore;
  constructor() {}
  preinit(): void {}
  init(): void {}
  postinit(): void {}

  onTick(): void {
    lastTime = time;
    time = time + (this.ModLoader.emulator.rdramRead8(FPSADDR) / 60.0);
    let deltaTime = time - lastTime;

    let thisPosition = new Vector3(this.core.link.rdramReadF32(XO), this.core.link.rdramReadF32(YO), this.core.link.rdramReadF32(ZO));
    let thisVelocity = thisPosition.minus(lastPosition);
    let realVelocity = new Vector3(this.core.link.rdramReadF32(VXO), this.core.link.rdramReadF32(VYO), this.core.link.rdramReadF32(VZO));


    if (sleepState == SleepState.Sleeping) thisVelocity = realVelocity.plus(new Vector3(0, 4, 0));
    if (sleepState == SleepState.ShouldSleep) sleepState = SleepState.Sleeping;  

    if ((realVelocity.x != 0 || realVelocity.z != 0 || realVelocity.y != -4))
    {
      sleepState = SleepState.Awake;
      let newVelocity = thisVelocity.normalized().multiplyN(14);
      
      let frict : Vector3 = new Vector3();
      frict = thisVelocity.normalized().multiplyN(-FRICTION);

      let newPosition = lastPosition.plus(newVelocity.plus(frict));

      this.core.link.rdramWriteF32(XO, newPosition.x);
      this.core.link.rdramWriteF32(YO, newPosition.y);
      this.core.link.rdramWriteF32(ZO, newPosition.z);
    }
    else
    {
      sleepState = SleepState.ShouldSleep;
    }
    
    lastPosition = thisPosition;

    
  }

  @EventHandler(OotEvents.ON_SCENE_CHANGE) onSceneChange(scene: number) {
    lastPosition = new Vector3(this.core.link.rdramReadF32(XO), this.core.link.rdramReadF32(YO), this.core.link.rdramReadF32(ZO));
  }

  @EventHandler(EventsClient.ON_INJECT_FINISHED) onClient_InjectFinished(evt: any) {}
}
