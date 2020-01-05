import { IModLoaderAPI, IPlugin } from 'modloader64_api/IModLoaderAPI';
import { IOOTCore } from 'modloader64_api/OOT/OOTAPI';
export declare class RainbowGauntlets implements IPlugin {
    ModLoader: IModLoaderAPI;
    name: string;
    core: IOOTCore;
    constructor();
    preinit(): void;
    init(): void;
    postinit(): void;
    onTick(): void;
    onClient_InjectFinished(evt: any): void;
}
