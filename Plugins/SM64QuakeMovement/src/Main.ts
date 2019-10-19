import { EventsClient, EventHandler } from 'modloader64_api/EventHandler';
import { IModLoaderAPI, IPlugin } from 'modloader64_api/IModLoaderAPI';
import { InjectCore } from 'modloader64_api/CoreInjection';
import { ISM64Core } from 'modloader64_api/SM64/Imports';
import { Vector3 } from '../../../Utility/Vector3';
import { Actions, ActionGroups } from './Actions';

const XADDR = 0x8033B1AC;
const YADDR = XADDR + 4;
const ZADDR = YADDR + 4;

const CAMROTXADDR = 0x8033C6E4;
const CAMROTYADDR = CAMROTXADDR + 2;
const MARIOROTYADDR = 0x8033B19E;
const HUDFLAGADDR = 0x8033B26A;

const JOYXADDR = 0x80367056;
const JOYYADDR = JOYXADDR + 1;

const ACTIONADDR = 0x8033B17C;
const LVLADDR = 0x8032DDF8;

//Movement settings
const FRICTION = 4;
const ACCELERATE = 11;
const FULLSPEED = 22;
const STOPSPEED = FULLSPEED * 0.68;

//Crouch Slide Fall
const CSFFRICTION = 0;
const CSFACCELERATE = 14;
const CSFSPEED = 23;
const CSFSTOPSPEED = 0.5;

//Air
const AIRFRICTION = 0;
const AIRACCELERATE = 1000;
const AIRADDSPEED = 4;
const AIRSTOPSPEED = 0;

//Water
const WATERFRICTION = 7;
const WATERACCELERATE = 9;
const WATERSPEED = 20.5;
const WATERSTOPSPEED = WATERSPEED * 0.9;

//No control
const NOCOFRICTION = 0;
const NOCOACCELERATE = 1;
const NOCOSPEED = 0;
const NOCOSTOPSPEED = 0;

const DEG2RAD = 0.017453292;
const SDEG2RAD = Math.PI / 32768;
const UP = new Vector3(0, 1, 0);

const Action = new Actions();
const ActGroup = new ActionGroups();

let lastPosition : Vector3 = new Vector3();

let deltaTime : number = 1 / 30;
let time : number = 0;
let lastScene : number = 0;

let fwdFromYaw = function(yaw : number) : Vector3
{
  return new Vector3(
    Math.sin(yaw),
    0,
    Math.cos(yaw)
  );
}

let PlayerFriction = function(velocity : Vector3, currentSpeed : number, stopSpeed : number, friction : number): Vector3
{
  var drop : number = (currentSpeed < stopSpeed ? stopSpeed : currentSpeed) * friction * deltaTime;
  var newSpeed : number = currentSpeed - drop;
  newSpeed = newSpeed < 0 ? 0 : newSpeed;

  newSpeed = newSpeed / currentSpeed;

  return velocity.multiplyN(newSpeed);
}

let PlayerAccelerate = function(velocity : Vector3, wishDir : Vector3, wishSpeed : number, acceleration : number, logger : any = false) : Vector3
{
  var currentSpeed = velocity.dot(wishDir);
  var addSpeed = wishSpeed - currentSpeed;

  if (addSpeed <= 0) return velocity;

  var accelSpeed = acceleration * deltaTime * wishSpeed;

  if (logger) logger.info("currentSpeed: " + currentSpeed.toString() + " addSpeed: " + addSpeed.toString() + " accelSpeed: " + accelSpeed.toString());

  accelSpeed = accelSpeed > addSpeed ? addSpeed : accelSpeed;

  var addVel = wishDir.multiplyN(accelSpeed);
  velocity = velocity.plus(addVel);

  return velocity;
}

export class SM64QuakeMovement implements IPlugin {
  ModLoader = {} as IModLoaderAPI;
  name = 'SM64QuakeMovement';

  @InjectCore() core!: ISM64Core;
  constructor() {}
  preinit(): void {}
  init(): void {}
  postinit(): void {}
  onTick(): void 
  {
    time = time + deltaTime;

    if (!this.core.mario.exists) return;

    var frict = FRICTION;
    var accel = ACCELERATE;
    var speed = FULLSPEED;
    var stopSpeed = STOPSPEED;

    var act = this.ModLoader.emulator.rdramRead32(ACTIONADDR) & 0x1C0;
    var replaceRotY = false;

    switch(act)
    {
      case (ActGroup.ACT_GROUP_CRAWL_SLIDE_FALL):
        frict = CSFFRICTION;
        accel = CSFACCELERATE;
        speed = CSFSPEED;
        stopSpeed = CSFSTOPSPEED;
        break;
      case (ActGroup.ACT_GROUP_AIR):
        frict = AIRFRICTION;
        accel = AIRACCELERATE;
        speed = speed + AIRADDSPEED;
        stopSpeed = AIRSTOPSPEED;
        replaceRotY = true;
        break;
      case (ActGroup.ACT_GROUP_SWIM):
        frict = WATERFRICTION;
        accel = WATERACCELERATE;
        speed = WATERSPEED;
        stopSpeed = WATERSTOPSPEED;
        break;
      case (ActGroup.ACT_GROUP_CUTSCENE):
        frict = NOCOFRICTION;
        accel = NOCOACCELERATE;
        speed = NOCOSPEED;
        stopSpeed = NOCOSTOPSPEED;
        break;
      case (ActGroup.ACT_GROUP_NOCONTROL):
        frict = NOCOFRICTION;
        accel = NOCOACCELERATE;
        speed = NOCOSPEED;
        stopSpeed = NOCOSTOPSPEED;
        break;
    }

    var thisPosition = new Vector3( // Fixed in core but this for compatability
      this.ModLoader.emulator.rdramReadF32(XADDR),
      this.ModLoader.emulator.rdramReadF32(YADDR),
      this.ModLoader.emulator.rdramReadF32(ZADDR)
    );

    if (lastScene != this.ModLoader.emulator.rdramRead16(LVLADDR))
    {
      lastScene = this.ModLoader.emulator.rdramRead16(LVLADDR)
      lastPosition = thisPosition;
    }

    var h = this.ModLoader.emulator.rdramReadS8(JOYXADDR) / 127;
    var v = this.ModLoader.emulator.rdramReadS8(JOYYADDR) / 127;

    if (h > 0.62) h = 1;
    if (h < -0.62) h = -1;
    if (v > 0.62) v = 1;
    if (v < -0.62) v = -1;

    var squareInput = Math.pow(v * v + h * h, 0.5);

    var fwd = fwdFromYaw(this.ModLoader.emulator.rdramReadS16(CAMROTYADDR) * SDEG2RAD).normalized();
    var rgh = fwd.cross(UP).normalized();

    var velocity = thisPosition.minus(lastPosition);
    var newPosition = thisPosition;
    var newVelocity = velocity;

    speed = speed * squareInput;
    var wishDir = new Vector3();

    if (Math.abs(speed) > 0.001)
    {
      wishDir = fwd.multiplyN(v).plus(rgh.multiplyN(h));

      newVelocity = PlayerFriction(velocity, velocity.magnitude(), stopSpeed, frict);
      newVelocity = PlayerAccelerate(newVelocity, wishDir, speed, accel);

      /*this.ModLoader.logger.info("H: " + h.toString() + " V: " + v.toString() 
      + " CamRot: " + new Vector3(this.ModLoader.emulator.rdramReadS16(CAMROTXADDR) * SDEG2RAD, this.ModLoader.emulator.rdramReadS16(CAMROTYADDR) * SDEG2RAD, 0)
      + " thisPosition: " + thisPosition.toString());*/
    }
    else
    {
      newVelocity = PlayerFriction(velocity, velocity.magnitude(), stopSpeed, frict);
    }

    if (Math.abs(newVelocity.magnitude()) > 0.001) newPosition = lastPosition.plus(newVelocity);

    if (replaceRotY && wishDir.isNaN() != true && Math.abs(wishDir.magnitude()) > 0.001)
    {
      var Yaw = Math.atan2(wishDir.x, wishDir.z) / SDEG2RAD;
      this.ModLoader.emulator.rdramWrite16(MARIOROTYADDR, Yaw);
    }

    this.ModLoader.emulator.rdramWriteF32(XADDR, newPosition.x);
    this.ModLoader.emulator.rdramWriteF32(YADDR, newPosition.y);
    this.ModLoader.emulator.rdramWriteF32(ZADDR, newPosition.z);

    lastPosition = newPosition;
  }

  @EventHandler(EventsClient.ON_INJECT_FINISHED)
  onClient_InjectFinished(evt: any) {}
}
