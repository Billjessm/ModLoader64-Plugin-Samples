export class Actions  // Not sure how to use this
{
    ACT_FLAG_STATIONARY                  = /* 0x00000200 */ (1 <<  9)
    ACT_FLAG_MOVING                      = /* 0x00000400 */ (1 << 10)
    ACT_FLAG_AIR                         = /* 0x00000800 */ (1 << 11)
    ACT_FLAG_INTANGIBLE                  = /* 0x00001000 */ (1 << 12)
    ACT_FLAG_SWIMMING                    = /* 0x00002000 */ (1 << 13)
    ACT_FLAG_METAL_WATER                 = /* 0x00004000 */ (1 << 14)
    ACT_FLAG_SHORT_HITBOX                = /* 0x00008000 */ (1 << 15)
    ACT_FLAG_RIDING_SHELL                = /* 0x00010000 */ (1 << 16)
    ACT_FLAG_INVULNERABLE                = /* 0x00020000 */ (1 << 17)
    ACT_FLAG_BUTT_OR_STOMACH_SLIDE       = /* 0x00040000 */ (1 << 18)
    ACT_FLAG_DIVING                      = /* 0x00080000 */ (1 << 19)
    ACT_FLAG_ON_POLE                     = /* 0x00100000 */ (1 << 20)
    ACT_FLAG_HANGING                     = /* 0x00200000 */ (1 << 21)
    ACT_FLAG_IDLE                        = /* 0x00400000 */ (1 << 22)
    ACT_FLAG_ATTACKING                   = /* 0x00800000 */ (1 << 23)
    ACT_FLAG_ALLOW_VERTICAL_WIND_ACTION  = /* 0x01000000 */ (1 << 24)
    ACT_FLAG_CONTROL_JUMP_HEIGHT         = /* 0x02000000 */ (1 << 25)
    ACT_FLAG_ALLOW_FIRST_PERSON          = /* 0x04000000 */ (1 << 26)
    ACT_FLAG_PAUSE_EXIT                  = /* 0x08000000 */ (1 << 27)
    ACT_FLAG_SWIMMING_OR_FLYING          = /* 0x10000000 */ (1 << 28) // not checked by game
    ACT_FLAG_WATER_OR_TEXT               = /* 0x20000000 */ (1 << 29) // not checked by game
    ACT_FLAG_THROWING                    = /* 0x80000000 */ (1 << 31)
}

export class ActionGroups
{
    ACT_GROUP_IDLE = 0x000;
    ACT_GROUP_CRAWL_SLIDE_FALL = 0x040;
    ACT_GROUP_AIR = 0x80;
    ACT_GROUP_SWIM = 0x0C0;
    ACT_GROUP_CUTSCENE = 0x100;
    ACT_GROUP_NOCONTROL = 0x140;
    ACT_GROUP_GROUND = 0x180;
}


