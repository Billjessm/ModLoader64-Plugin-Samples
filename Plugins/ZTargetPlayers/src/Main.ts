import { EventsClient, EventHandler } from 'modloader64_api/EventHandler';
import { IModLoaderAPI, IPlugin } from 'modloader64_api/IModLoaderAPI';
import { InjectCore } from 'modloader64_api/CoreInjection';
import { IOOTCore, OotEvents } from 'modloader64_api/OOT/OOTAPI';

let puppets : number[] = [];

export class ZTargetPlayers implements IPlugin {
  ModLoader = {} as IModLoaderAPI;
  name = 'ZTargetPlayers';

  @InjectCore() core!: IOOTCore;
  constructor() {}
  preinit(): void {}
  init(): void {}
  postinit(): void {}
  onTick(): void {}

  @EventHandler(EventsClient.ON_INJECT_FINISHED) onClient_InjectFinished(evt: any) {}

  @EventHandler("OotOnline:onPlayerPuppetSpawned") onPuppetSpawned(evt: any) {
    var ptr = evt.data.pointer;
    puppets.push(ptr);
    let flags = ptr + 0x04;
    this.ModLoader.emulator.rdramWrite32(flags, 0x00000001);
  }

  @EventHandler("OotOnline:onPlayerPuppetDespawned") onPuppetDespawned(evt: any) {
    var ptr = evt.data.pointer;
    var i = 0;
    for (i = 0; i < puppets.length; i++){
      if (ptr == puppets[i]){
        puppets.splice(i, 1);
      }
    }
  }
}
