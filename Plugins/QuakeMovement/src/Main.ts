import { EventsClient, EventHandler } from 'modloader64_api/EventHandler';
import { IModLoaderAPI, IPlugin } from 'modloader64_api/IModLoaderAPI';
import { InjectCore } from 'modloader64_api/CoreInjection';
import { IOOTCore, OotEvents } from 'modloader64_api/OOT/OOTAPI';
import { Vector3 } from '../../../Utility/Vector3';
import { Interpolator } from "../../../Utility/Interpolator";

//Addresses
const FPSADDR = 0x801C6FA1;
const CONTROLLERADDR = 0x801C84B4; // TODO: Get from context

//State1
const SWIMO = 0x08000000;
const CLIMBO = 0x00200000;
const JCLIMBO = 0x00000004;
const LEDGEO = 0x00002000;

//State2
const EPONAO = 0x00800000;
const CRAWLCO = 0x00040000; //Are these inaccurate?

//Offsets
const XO = 0x24;
const YO = XO + 4;
const ZO = YO + 4;
const VXO = 0x5C;
const VYO = VXO + 4;
const VZO = VYO + 4;

const STATE1ADDR = 0x066C;
const STATE2ADDR = 0x0670;

const JX = CONTROLLERADDR + 2;
const JY = JX + 1;

//Optimize
const MGRAV = new Vector3(0, 4, 0);

//Movement Settings
const FRICTION = 4;
const ACCELERATE = 10;
const FULLSPEED = 10;
const STOPSPEED = FULLSPEED * 0.68;

let wishSpeed : Interpolator = new Interpolator(); // Because we are using link's real velocity instead of directional vectors, friction doesn't stop the Player-Character smoothly. We will interpolate this until a better solution is found.

let lastPosition : Vector3 = new Vector3();
let realVelocity : Vector3 = new Vector3();

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

let PlayerAccelerate = function(velocity : Vector3, wishDir : Vector3, wishSpeed : number, logger : any = false) : Vector3
{
  var currentSpeed = velocity.dot(wishDir);
  var addSpeed = wishSpeed - currentSpeed;

  if (addSpeed <= 0) return velocity;

  var accelSpeed = ACCELERATE * deltaTime * wishSpeed;

  if (logger) logger.info("currentSpeed: " + currentSpeed.toString() + " addSpeed: " + addSpeed.toString() + " accelSpeed: " + accelSpeed.toString());

  accelSpeed = accelSpeed > addSpeed ? addSpeed : accelSpeed;

  var addVel = wishDir.multiplyN(accelSpeed);
  velocity = velocity.plus(addVel);

  return velocity;
}

export class QuakeMovement implements IPlugin {
  ModLoader = {} as IModLoaderAPI;
  name = 'QuakeMovement';

  @InjectCore() core!: IOOTCore;
  constructor() {}
  preinit(): void {}
  init(): void {}
  postinit(): void { wishSpeed.dampening = 14; }

  onTick(): void 
  {
    lastTime = time;
    time = time + (this.ModLoader.emulator.rdramRead8(FPSADDR) / 60.0);
    deltaTime = time - lastTime;

    var linkState1 = this.core.link.rdramRead32(STATE1ADDR);
    var linkState2 = this.core.link.rdramRead32(STATE2ADDR);

    var thisPosition = new Vector3(this.core.link.rdramReadF32(XO), this.core.link.rdramReadF32(YO), this.core.link.rdramReadF32(ZO));

    var thisVelocity = thisPosition.minus(lastPosition);
    var thisRealVelocity = new Vector3(this.core.link.rdramReadF32(VXO), this.core.link.rdramReadF32(VYO), this.core.link.rdramReadF32(VZO));
    if (Math.abs(thisRealVelocity.plus(MGRAV).magnitude()) > 0.001) realVelocity = thisRealVelocity.plus(MGRAV); //Store the last real direction we want to travel so we do not skid. This would be unneeded if we could compute the camera's forward vector.
    
    var h = this.ModLoader.emulator.rdramReadS8(JX) / 127;
    var v = this.ModLoader.emulator.rdramReadS8(JY) / 127;

    if (h > 0.62) h = 1;
    if (h < -0.62) h = -1;
    if (v > 0.62) v = 1;
    if (v < -0.62) v = -1;

    wishSpeed.targetPosition = Math.pow(h * h + v * v, 0.5) * FULLSPEED;
    var wishDir = realVelocity.normalized();

    var newVelocity = PlayerFriction(thisVelocity, thisVelocity.magnitude());
    newVelocity = PlayerAccelerate(newVelocity, wishDir, wishSpeed.GetPosition(time)); 

    var newPosition =  new Vector3();
    if (Math.abs(newVelocity.magnitude()) > 0.001) {
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
        case CRAWLCO:
          newPosition = thisPosition;
          break;
      }

    }
    else newPosition = thisPosition;

    this.core.link.rdramWriteF32(XO, newPosition.x);
    this.core.link.rdramWriteF32(YO, newPosition.y);
    this.core.link.rdramWriteF32(ZO, newPosition.z);

    lastPosition = newPosition; 
  }

  @EventHandler(OotEvents.ON_SCENE_CHANGE) onSceneChange(scene: number) { lastPosition = new Vector3(this.core.link.rdramReadF32(XO), this.core.link.rdramReadF32(YO), this.core.link.rdramReadF32(ZO)); }

  @EventHandler(EventsClient.ON_INJECT_FINISHED) onClient_InjectFinished(evt: any) {}
}



