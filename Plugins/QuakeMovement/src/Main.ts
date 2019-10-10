import { EventsClient, EventHandler } from 'modloader64_api/EventHandler';
import { IModLoaderAPI, IPlugin } from 'modloader64_api/IModLoaderAPI';
import { InjectCore } from 'modloader64_api/CoreInjection';
import { IOOTCore, OotEvents } from 'modloader64_api/OOT/OOTAPI';
import { Vector3 } from './Vector3';

//Addresses
const FPSADDR = 0x801C6FA1;
const STATE1ADDR = 0x066C;
const STATE2ADDR = 0x0670;

//State1
const SWIMO = 0x08000000;
const CLIMBO = 0x00200000;
const JCLIMBO = 0x00000004;
const LEDGEO = 0x00002000;

//State2
const EPONAO = 0x00800000;
const CRAWLCO = 0x00040000; //Are these inaccurate?
const CRAWLO = 0x00040000;

//Vector3 offsets
const XO = 0x24;
const YO = XO + 4;
const ZO = YO + 4;
const VXO = 0x5C;
const VYO = VXO + 4;
const VZO = VYO + 4;

//Movement settings
const FRICTION = 4;
const ACCELERATE = 14;
const STOPSPEED = 10;
const WISHSPEED = 64;

let lastPosition : Vector3 = new Vector3();
let deltaTime : number = 0.05;
let lastTime : number = 0;
let time : number = 0;

let PlayerFriction = function(velocity : Vector3, currentSpeed : number) : Vector3
{
  var drop : number = (currentSpeed < STOPSPEED ? STOPSPEED : currentSpeed) * FRICTION * deltaTime;
  var newSpeed : number = currentSpeed - drop;
  newSpeed = newSpeed < 0 ? 0 : newSpeed;

  newSpeed = newSpeed / currentSpeed;

  return velocity.multiplyN(newSpeed);
}

let PlayerAccelerate = function(velocity : Vector3, wishDir : Vector3)
{
  var currentSpeed : number = velocity.dot(wishDir);
  var addSpeed : number = WISHSPEED - currentSpeed;

  if (addSpeed <= 0) return velocity;

  var accelSpeed = ACCELERATE * deltaTime * WISHSPEED;
  accelSpeed = accelSpeed > addSpeed ? addSpeed : accelSpeed;

  velocity = velocity.plus(wishDir.multiplyN(accelSpeed));

  return velocity;
}

export class QuakeMovement implements IPlugin {
  ModLoader = {} as IModLoaderAPI;
  name = 'QuakeMovement';

  @InjectCore() core!: IOOTCore;
  constructor() {}
  preinit(): void {}
  init(): void {}
  postinit(): void {}

  onTick(): void {
    //this.ModLoader.emulator.rdramWrite8(FPSADDR, 1);

    lastTime = time;
    time = time + (this.ModLoader.emulator.rdramRead8(FPSADDR) / 60.0);
    deltaTime = time - lastTime;

    let linkState1 = this.core.link.rdramRead32(STATE1ADDR);
    let linkState2 = this.core.link.rdramRead32(STATE2ADDR);

    let thisPosition = new Vector3(this.core.link.rdramReadF32(XO), this.core.link.rdramReadF32(YO), this.core.link.rdramReadF32(ZO));
    
    let thisVelocity = thisPosition.minus(lastPosition);
    let realVelocity = new Vector3(this.core.link.rdramReadF32(VXO), this.core.link.rdramReadF32(VYO), this.core.link.rdramReadF32(VZO));

    let wishDir = realVelocity.plus(new Vector3(0, 4, 0)).normalized();

    let newVelocity = PlayerFriction(thisVelocity, thisVelocity.magnitude());
    newVelocity = PlayerAccelerate(newVelocity, wishDir);

    let newPosition =  new Vector3();

    // Stop **most** of the stop-jitter. That's probably caused by floating point inaccuracy and realVelocity. Should get controller input and compute wishDir manually.
    if (newVelocity.magnitude() > 0) {
      newPosition = lastPosition.plus(newVelocity);

      switch(linkState1) {
        case SWIMO:
          newPosition.y = thisPosition.y;
          break;
        case CLIMBO:
          newPosition = thisPosition;
          break;
        case LEDGEO:
          newPosition.x = thisPosition.x
          newPosition.z = thisPosition.z
          break;
        case JCLIMBO:
          newPosition.x = thisPosition.x
          newPosition.z = thisPosition.z
          break;
      }

      switch(linkState2) {
        case EPONAO:
          newPosition = thisPosition;
          break;
        case CRAWLO:
          newPosition = thisPosition;
          break;
        case CRAWLCO:
          newPosition = thisPosition;
          break;
      }

    }
    else newPosition = thisPosition;

    this.core.link.rdramWriteF32(XO, newPosition.x);
    this.core.link.rdramWriteF32(YO, newPosition.y);
    this.core.link.rdramWriteF32(ZO, newPosition.z);

    lastPosition = thisPosition; 
  }

  @EventHandler(OotEvents.ON_SCENE_CHANGE) onSceneChange(scene: number) {
    lastPosition = new Vector3(this.core.link.rdramReadF32(XO), this.core.link.rdramReadF32(YO), this.core.link.rdramReadF32(ZO));
  }

  @EventHandler(EventsClient.ON_INJECT_FINISHED) onClient_InjectFinished(evt: any) {}
}
