import { EventsClient, EventHandler } from 'modloader64_api/EventHandler';
import { IModLoaderAPI, IPlugin } from 'modloader64_api/IModLoaderAPI';
import { InjectCore } from 'modloader64_api/CoreInjection';
import { IBKCore } from 'modloader64_api/BK/Imports';
import { Vector3 } from '../../../Utility/Vector3';
import { MoveTypes, AnimationTypes } from "./EnumNums";
import { Interpolator } from '../../../Interpolator';

//Addrs
const JOYXADDR = 0x802812BA;
const JOYYADDR = 0x802812BB;
const CAMROTXADDR = 0x8037D968;
const CAMROTYADDR = CAMROTXADDR + 4;
const CAMROTZADDR = CAMROTYADDR + 4;
const GAMESPEEDADDR = 0x80384484;
const FPSADDR = 0x80384480;
const PLAYERROTYADDR = 0x8037C0E0;

//Movement Settings
  //Ground
  const FRICTION = 4;
  const ACCELERATE = 11;
  const FULLSPEED = 22;
  const STOPSPEED = FULLSPEED * 0.68;

  //Air
  const AIRFRICTION = 0;
  const AIRACCELERATE = 128;
  const AIRADDSPEED = 2;
  const AIRSTOPSPEED = 0;

  //Water
  const WATERFRICTION = 5;
  const WATERACCELERATE = 9;
  const WATERSPEED = 20.5;
  const WATERSTOPSPEED = WATERSPEED * 0.8;

  //Talon Trot
  const TROTFRICTION = 2.5;
  const TROTACCELERATE = 16;
  const TROTSPEED = 28;
  const TROTSTOPSPEED = TROTSPEED * 0.432;

  //Hurt
  const HURTFRICTION = 10;
  const HURTACCELERATE = 10;
  const HURTSPEED = 14;
  const HURTSTOPSPEED = HURTSPEED * 0.95;

  //Dead
  const DEADFRICTION = 5;
  const DEADACCELERATE = 7;
  const DEADSPEED = 0;
  const DEADSTOPSPEED = 1;

  //Beak Barge
  const BARGEFRICTION = 0.1;
  const BARGEACCELERATE = 24;
  const BARGESPEED = TROTSTOPSPEED - 1;
  const BARGESTOPSPEED = 1;

  //Rat-a-Tat Rap
  const RAPADDSPEED = 0.4;

  //Roll
  const ROLLFRICTION = 0;

//Math
const DEG2RAD = 0.017453292;
const UP = new Vector3(0, 1, 0);

//Enums as nums
const MoveType : MoveTypes = new MoveTypes();
const AnimationType : AnimationTypes = new AnimationTypes();

//Backbuffer
let lastPosition : Vector3 = new Vector3();
let squareInput : Interpolator = new Interpolator();

//let scale : number = 1;
let deltaTime : number = 1 / 30;
let lastTime : number = 0;
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

export class BanjoKazooieQuakeMovement implements IPlugin {
  ModLoader = {} as IModLoaderAPI;
  name = 'BanjoKazooieQuakeMovement';

  @InjectCore() core!: IBKCore;

  constructor() {}
  preinit(): void {}
  init(): void {}
  postinit(): void { squareInput.dampening = 16; }

  onTick(): void 
  {
    var frametime = this.ModLoader.emulator.rdramReadF32(FPSADDR);
    time = time + frametime;
    deltaTime = time - lastTime;
    lastTime = time;
    //scale = this.ModLoader.emulator.rdramReadF32(0x80384480) * frametime;

    if (!this.core.isPlaying() || this.core.runtime.is_cutscene() || this.core.runtime.is_loading()) return;

    var inWater = false;
    var replaceRotY = false;
    var frict = FRICTION;
    var accel = ACCELERATE;
    var speed = FULLSPEED;
    var stopSpeed = STOPSPEED;

    let trot = function() {
      speed = TROTSPEED;
      accel = TROTACCELERATE;
      frict = TROTFRICTION;
      stopSpeed = TROTSTOPSPEED;
    }

    let air = function(base : number = speed) {
      speed = base + AIRADDSPEED;
        accel = AIRACCELERATE;
        frict = AIRFRICTION;
        stopSpeed = AIRSTOPSPEED;
    }

    let water = function() {
      speed = WATERSPEED;
      accel = WATERACCELERATE;
      frict = WATERFRICTION;
      stopSpeed = WATERSTOPSPEED;
      inWater = true;
    }

    let other = function(s : number, a : number, f : number, ss : number) {
      speed = s;
      accel = a;
      frict = f;
      stopSpeed = ss;
    }

    var thisPosition = new Vector3(this.core.player.pos_x, this.core.player.pos_y, this.core.player.pos_z);

    if (lastScene != this.core.runtime.current_scene)
    {
      lastPosition = thisPosition;
      lastScene = this.core.runtime.current_scene;
    }

    var h = -(this.ModLoader.emulator.rdramReadS8(JOYXADDR) / 127);
    var v = -(this.ModLoader.emulator.rdramReadS8(JOYYADDR) / 127);

    if (h > 0.62) h = 1;
    if (h < -0.62) h = -1;
    if (v > 0.62) v = 1;
    if (v < -0.62) v = -1;

    squareInput.targetPosition = Math.pow(v * v + h * h, 0.5);

    var fwd = fwdFromYaw(this.ModLoader.emulator.rdramReadF32(CAMROTYADDR) * DEG2RAD).normalized();
    var rgh = fwd.cross(UP).normalized();

    var velocity = thisPosition.minus(lastPosition);
    var newPosition = thisPosition;
    var newVelocity = velocity;

    var anim = this.core.player.anim_id;
    var state = this.core.player.movement_state;

    switch(anim)
    {
      case (AnimationType.BANJO_ROLLING):
        trot();
        frict = ROLLFRICTION;
        replaceRotY = true;
        break;
      case (AnimationType.BANJO_TALON_TROT):
        trot();
        break;
      case (AnimationType.BANJO_TALON_TROT_END):
        trot();
        break;
      case (AnimationType.BANJO_TALON_TROT_START):
        trot();
        break;
      case (AnimationType.BANJO_TALON_TROT_WALKING):
        trot();
        break;
      case (AnimationType.BANJO_BEAK_BARGE):
        other(BARGESPEED, BARGEACCELERATE, BARGEFRICTION, BARGESTOPSPEED);
        replaceRotY = true;
        break;
      case (AnimationType.BANJO_BEAK_BUSTER):
        trot();
        replaceRotY = true;
        break;
      case (AnimationType.BANJO_WONDERWING):
        trot();
        break;
      case (AnimationType.BANJO_WONDERWING_RUNNING):
        trot();
        break;
      case (AnimationType.BANJO_WONDERWING_START):
        trot();
        break;
      case (AnimationType.BANJO_JUMPING):
        air();
        break;
      case (AnimationType.BANJO_FLUTTER):
        air();
        break;
      case (AnimationType.BANJO_FEATHERY_FLAP):
        air();
        break;
      case (AnimationType.BANJO_WONDERWING_JUMPING):
        air();
        break;
      case (AnimationType.BANJO_TALON_TROT_JUMPING):
        air(TROTSPEED);
        break;
      case (AnimationType.BANJO_SHOCK_SPRING_JUMP_1):
        air();
        break;
      case (AnimationType.BANJO_SHOCK_SPRING_JUMP_2):
        air();
        break;
      case (AnimationType.BANJO_SHOCK_SPRING_JUMP_START):
        air(TROTSTOPSPEED);
        break;
      case (AnimationType.BANJO_FALLING):
        air();
        break;
      case (AnimationType.BANJO_FALLING_2):
        air();
        break;
      case (AnimationType.BANJO_RATATAT_RAP):
        air(FULLSPEED + RAPADDSPEED);
        replaceRotY = true;
        break;
      case (AnimationType.BANJO_RATATAT_RAP_START):
        air(FULLSPEED + RAPADDSPEED);
        replaceRotY = true;
        break;
      case (AnimationType.BANJO_DIVING):
        air(WATERSPEED)
        frict = WATERFRICTION;
        break;
      case (AnimationType.BANJO_FLAP_FLIP):
        air(WATERSPEED);
        break;
      case (AnimationType.BANJO_FLAP_FLIP_END):
        air(WATERSPEED);
        break;
      case (AnimationType.BANJO_FLAP_FLIP_TRANSISTION):
        air(WATERSPEED);
        break;
      case (AnimationType.BANJO_SLIDING_BACK):
        air();
        break;
      case (AnimationType.BANJO_SLIDING_BACK):
        air();
        break;
      case (AnimationType.BANJO_SWIMMING_UNDERWATER_A):
        water();
        break;
      case (AnimationType.BANJO_SWIMMING_UNDERWATER_B):
        water();
        break;
      case (AnimationType.BANJO_SWIMMING_UNDERWATER):
        water();
        break;
      case (AnimationType.BANJO_SWIMMING_UNDERWATER_2):
        water();
        break;
      case (AnimationType.BANJO_SWIMMING_SLOW):
        water();
        break;
      case (AnimationType.BANJO_SWIMMING_SURFACE):
        water();
        inWater = false;
        break;
      case (AnimationType.BANJO_SKIDDING):
        water();
        inWater = false;
        break;
      case (AnimationType.WADING_BOOTS_IDLE):
        water();
        inWater = false;
        break;
      case (AnimationType.BANJO_WADING_BOOTS):
        water();
        inWater = false;
        break;
      case (AnimationType.BANJO_WADING_BOOTS_WALKING):
        water();
        inWater = false;
        break;
      case (AnimationType.BANJO_WADING_BOOTS_START):
        other(HURTSPEED, HURTACCELERATE, HURTFRICTION, HURTSTOPSPEED);
        break;
      case (AnimationType.BANJO_PUNCHING):
        other(HURTSPEED, HURTACCELERATE, HURTFRICTION, HURTSTOPSPEED);
        break;
      case (AnimationType.BANJO_HURT):
        other(HURTSPEED, HURTACCELERATE, HURTFRICTION, HURTSTOPSPEED);
        break;
      case (AnimationType.BANJO_HURT_2):
        other(HURTSPEED, HURTACCELERATE, HURTFRICTION, HURTSTOPSPEED);
        break;
      case (AnimationType.BANJO_TALON_TROT_HURT):
        other(HURTSPEED, HURTACCELERATE, HURTFRICTION, HURTSTOPSPEED);
        break;
      case (AnimationType.BANJO_GETTING_UP):
        other(HURTSPEED, HURTACCELERATE, HURTFRICTION, HURTSTOPSPEED);
        break;
      case (AnimationType.BANJO_BEAKBOMB_HURT):
        other(HURTSPEED, HURTACCELERATE, HURTFRICTION, HURTSTOPSPEED);
        break;
      case (AnimationType.BANJO_FALL_DAMAGE):
        other(HURTSPEED, HURTACCELERATE, HURTFRICTION, HURTSTOPSPEED);
        break;
      case (AnimationType.BANJO_FLYING_CRASH):
        other(HURTSPEED, HURTACCELERATE, HURTFRICTION, HURTSTOPSPEED);
        break;
      case (AnimationType.BANJO_TRANSFORMING):
        other(DEADSPEED, DEADACCELERATE, DEADFRICTION, DEADSTOPSPEED);
        break;
      case (AnimationType.BANJO_SHOOTING_EGG):
        other(DEADSPEED, DEADACCELERATE, DEADFRICTION, DEADSTOPSPEED);
        break;
      case (AnimationType.BANJO_POOPING_EGG):
        other(DEADSPEED, DEADACCELERATE, DEADFRICTION, DEADSTOPSPEED);
        break;
      case (AnimationType.BANJO_LISTENING):
        other(DEADSPEED, DEADACCELERATE, DEADFRICTION, DEADSTOPSPEED);
        break;
      case (AnimationType.BANJO_DYING):
        other(DEADSPEED, DEADACCELERATE, DEADFRICTION, DEADSTOPSPEED);
        break;
      case(AnimationType.BANJO_DROWNING):
        other(DEADSPEED, DEADACCELERATE, DEADFRICTION, DEADSTOPSPEED);
        break;
    }

    speed = speed * squareInput.GetPosition(time);
    var wishDir = new Vector3();

    if (Math.abs(speed) > 0.001)
    {
      if (!inWater)
      {
        wishDir = fwd.multiplyN(v).plus(rgh.multiplyN(h)).normalized();
      }
      else
      {
        //var up = fwd.cross(rgh);
        //wishDir = up.multiplyN(v).plus(rgh.multiplyN(h)).normalized();
        wishDir = rgh.multiplyN(h).normalized();
      }

      newVelocity = PlayerFriction(velocity, velocity.magnitude(), stopSpeed, frict);
      newVelocity = PlayerAccelerate(newVelocity, wishDir, speed, accel);

      /*this.ModLoader.logger.info("h: " + h.toString() + ", v: " + v.toString()
      + " scale: " + scale.toString() + " deltatime: " + deltaTime.toString() + " ft: " + frametime.toString() + " time: " + time.toString()
      + " speed: " + newVelocity.magnitude().toString());*/

      if (Math.abs(newVelocity.magnitude()) > 0.001) newPosition = lastPosition.plus(newVelocity);
    }
    else
    {
      newVelocity = PlayerFriction(velocity, velocity.magnitude(), stopSpeed, frict);
      newPosition = lastPosition.plus(newVelocity);     
    }

    if (replaceRotY && wishDir.isNaN() != true && Math.abs(wishDir.magnitude()) > 0.001)
    {
      var Yaw = Math.atan2(wishDir.x, wishDir.z) / DEG2RAD;
      this.core.player.rot_y = Yaw; // Game overwrites this before it's next read
    }

    this.core.player.pos_x = newPosition.x;
    this.core.player.pos_y = newPosition.y;
    this.core.player.pos_z = newPosition.z;

    lastPosition = newPosition;
  }

  @EventHandler(EventsClient.ON_INJECT_FINISHED)
  onClient_InjectFinished(evt: any) 
  {
    if (true) this.core.runtime.goto_scene(0x91, 0x00);
  }
}
