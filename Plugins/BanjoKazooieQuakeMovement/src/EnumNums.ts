export class MoveTypes 
{
    BEAK_BARGE : number = 0x00;
    BEAK_BOMB : number = 0x01;
    BEAK_BUSTER : number = 0x01;
    CAMERA_CONTROLS : number = 0x03;
    BEAR_PUNCH : number = 0x04;
    CLIMB_POLES : number = 0x05;
    EGGS : number = 0x06;
    FEATHERY_FLAP : number = 0x07;
    FLIP_FLAP : number = 0x08;
    FLYING : number = 0x09;
    VARIABLE_JUMP_HEIGHT : number = 0x0a;
    RAT_A_TAT_RAP : number = 0x0b;
    ROLL : number = 0x0c;
    SHOCK_SPRING_JUMP : number = 0x0d;
    WADDING_BOOTS : number = 0x0e;
    DIVE : number = 0x0f;
    TALON_TROT : number = 0x10;
    TURBO_TALON_TRAINERS : number = 0x11;
    WONDERWING : number = 0x12;
    NOTE_DOOR_MOLE_HILL : number = 0x13;
}

export class AnimationTypes 
{
    UNKNOWN : number = 0x0000;
    BANJO_DUCKING : number = 0x0001;
    BANJO_WALKING_SLOW : number = 0x0002;
    BANJO_WALKING : number = 0x0003;
    // 0x0004 X
    BANJO_PUNCHING : number = 0x0005;
    // 0x0006 X
    BANJO_TALON_TROT_END : number = 0x0007;
    BANJO_JUMPING : number = 0x0008;
    BANJO_DYING : number = 0x0009;
    BANJO_CLIMBING : number = 0x000a;
    // 0x000B
    BANJO_RUNNING : number = 0x000c;
    // 0x000D
    BANJO_SKIDDING : number = 0x000e;
    BANJO_HURT : number = 0x000f;
    BIGBUTT_CHARGING : number = 0x0010;
    BANJO_WONDERWING_RUNNING : number = 0x0011;
    // 0x0012 X
    // 0x0013 X
    // 0x0014 X
    BANJO_TALON_TROT_WALKING : number = 0x0015;
    BANJO_TALON_TROT_START : number = 0x0016;
    BANJO_FLUTTER : number = 0x0017;
    BANJO_FEATHERY_FLAP : number = 0x0018;
    BANJO_RATATAT_RAP : number = 0x0019;
    BANJO_RATATAT_RAP_START : number = 0x001a;
    BANJO_WONDERWING_JUMPING : number = 0x001b;
    BANJO_BEAK_BARGE : number = 0x001c;
    BANJO_BEAK_BUSTER : number = 0x001d;
    // 0x001E X
    // 0x001F X
    // 0x0020 X
    BIGBUTT_SKIDDING : number = 0x0021;
    BANJO_WONDERWING_START : number = 0x0022;
    BANJO_WONDERWING : number = 0x0023;
    YUMYUM_HOPPING : number = 0x0024;
    // 0x0025 X
    BANJO_TALON_TROT : number = 0x0026;
    BANJO_TALON_TROT_JUMPING : number = 0x0027;
    TERMITE_HURT : number = 0x0028;
    TERMITE_DYING : number = 0x0029;
    BANJO_SHOOTING_EGG : number = 0x002a;
    BANJO_POOPING_EGG : number = 0x002b;
    SNIPPET_WALKING : number = 0x002c;
    JINJO_IDLE : number = 0x002d;
    BANJO_JIGGY_JIG : number = 0x002e;
    JINJO_HELP : number = 0x002f;
    HELD_JIGGY_JIGGY_JIG : number = 0x0030;
    JINJO_HOPPING : number = 0x0031;
    BIGBUTT_ATTACKING : number = 0x0032;
    BIGBUTT_EATING : number = 0x0033;
    BIGBUTT_DYING : number = 0x0034;
    BIGBUTT_ALERTED : number = 0x0035;
    BIGBUTT_WALKING : number = 0x0036;
    // 0037
    BANJO_FLYING : number = 0x0038;
    BANJO_SWIMMING_SURFACE : number = 0x0039;
    // 003A X
    // 003B X
    BANJO_DIVING : number = 0x003c;
    BANJO_SHOCK_SPRING_JUMP_1 : number = 0x003d;
    BANJO_FLYING_CRASH : number = 0x003e;
    BANJO_SWIMMING_UNDERWATER_B : number = 0x003f;
    BANJO_WADING_BOOTS_START : number = 0x0040;
    BANJO_WADING_BOOTS : number = 0x0041;
    BANJO_WADING_BOOTS_WALKING : number = 0x0042;
    BANJO_BEAKBOMB_START : number = 0x0043;
    BANJO_TURBO_TALON_TRAINERS : number = 0x0044;
    BANJO_FLYING_START : number = 0x0045;
    // 0046 X
    BANJO_BEAKBOMB : number = 0x0047;
    BANJO_SHOCK_SPRING_JUMP_START : number = 0x0048;
    BANJO_SHOCK_SPRING_JUMP_2 : number = 0x0049;
    // 004A X
    BANJO_FLAP_FLIP : number = 0x004b;
    BANJO_FLAP_FLIP_TRANSISTION : number = 0x004c;
    BANJO_HURT_2 : number = 0x004d;
    MM_MUDHUT_SMASHING : number = 0x004e;
    BANJO_WATER_SPLASH : number = 0x004f;
    // 0050 X
    CONGA_IDLE : number = 0x0051;
    CONGA_HURT : number = 0x0052;
    CONGA_DEFEATED : number = 0x0053;
    CONGA_THROWING : number = 0x0054;
    CONGA_BEATING_CHEST : number = 0x0055;
    CONGA_RAISING_ARMS : number = 0x0056;
    BANJO_SWIMMING_UNDERWATER : number = 0x0057;
    BANJO_SWIMMING_UNDERWATER_A : number = 0x0058;
    BANJO_SLIDING_BACK : number = 0x0059;
    BANJO_SLIDING_FRONT : number = 0x005a;
    CHIMPY_HOPPING : number = 0x005b;
    CHIMPY_IDLE : number = 0x005c;
    CHIMPY_WALKING : number = 0x005d;
    TICKER_IDLE : number = 0x005e;
    TICKER_WALKING : number = 0x005f;
    TERMITE_JUMPING : number = 0x0060;
    BANJO_FLAP_FLIP_END : number = 0x0061;
    GRUBLIN_IDLE : number = 0x0062;
    GRUBLIN_WALKING : number = 0x0063;
    GRUBLIN_JUMPING : number = 0x0064;
    BEEHIVE_DYING : number = 0x0065;
    BANJO_TALON_TROT_HURT : number = 0x0066;
    WADING_BOOTS_IDLE : number = 0x0067;
    BANJO_FALLING : number = 0x0068;
    BANJO_ON_TUMBLAR : number = 0x0069;
    MUMBO_SLEEPING : number = 0x006a;
    MUMBO_WALKING : number = 0x006b;
    MUMBO_IDLE : number = 0x006c;
    MUMBO_TRANSFORMING : number = 0x006d;
    MUMBO_UNKNOWN_6E : number = 0x006e;
    BANJO_IDLE : number = 0x006f;
    BANJO_SWIMMING_UNDERWATER_2 : number = 0x0070;
    BANJO_SWIMMING_SLOW : number = 0x0071;
    BANJO_CARRYING_ITEM : number = 0x0072;
    BANJO_CARRYING_ITEM_WALKING : number = 0x0073;
    // 0074 X
    // 0075 X
    // 0076
    BANJO_LOSING_MINIGAME : number = 0x0077;
    SNACKER_SWIMMING : number = 0x0078;
    CS_CONCERT_MUMBO_PLAYING : number = 0x0079;
    CS_CONCERT_BANJO_ANGRY : number = 0x007a;
    CS_CONCERT_BANJO_PLAYING : number = 0x007b;
    CS_CONCERT_BANJO_END : number = 0x007c;
    CS_CONCERT_TOOTY_START : number = 0x007d;
    CS_CONCERT_BANJO_START : number = 0x007e;
    CS_CONCERT_CUTSCENE : number = 0x007f;
    CS_CONCERT_TIMER : number = 0x0080;
    CS_CONCERT_UNKNOWN_0x81 : number = 0x0081;
    CS_CONCERT_MUMBO_DANCING : number = 0x0082;
    CS_CONCERT_TOOTY_DANCING : number = 0x0083;
    TOOTY_HOPPING : number = 0x0084;
    // 0085
    // 0086 X
    // 0087 X
    // 0088 X
    // 0089 X
    // 008A X
    // 008B X
    RAREWARE_LOGO_FALLING : number = 0x008c;
    // 008D X
    // 008E X
    NINTENDO_CUBE_WALKING : number = 0x008f;
    NINTENDO_CUBE_SHRUGGING : number = 0x0090;
    CS_CONCERT_FROG_HOPPING : number = 0x0091;
    SHRAPNEL_CHASING : number = 0x0092;
    TOOTY_RUNNING : number = 0x0093;
    GRUBLIN_DYING : number = 0x0094;
    BANJO_IDLE_KAZOOIE_TAUNT : number = 0x0095;
    SNIPPET_RECOVERING : number = 0x0096;
    SNIPPET_DYING : number = 0x0097;
    // 0098
    // 0099
    RIPPER_IDLE : number = 0x009a;
    RIPPER_CHASING : number = 0x009b;
    // 009C X
    NIBBLY_CHASING : number = 0x009d;
    TEEHEE_IDLE : number = 0x009e;
    TEEHEE_ALERTED : number = 0x009f;
    PUMPKIN_WALKING : number = 0x00a0;
    PUMPKIN_JUMPING : number = 0x00a1;
    CONGA_THROWING_2 : number = 0x00a2;
    NAPPER_SLEEPING : number = 0x00a3;
    NAPPER_LOOKING_AROUND : number = 0x00a4;
    NAPPER_WALKING : number = 0x00a5;
    NAPPER_ALERTED : number = 0x00a6;
    MOTZHAND_IDLE : number = 0x00a7;
    MOTZHAND_PLAYING : number = 0x00a8;
    POT : number = 0x00a9;
    YUMYUM_IDLE : number = 0x00aa;
    YUMYUM_EATING : number = 0x00ab;
    TEEHEE_CHASING : number = 0x00ac;
    NIBBLY_FLYING_START : number = 0x00ad;
    NIBBLY_IDLE : number = 0x00ae;
    // 00AF X
    BANJO_FALLING_2 : number = 0x00b0;
    BANJO_CLIMBING_2 : number = 0x00b1;
    BANJO_CLIMBING_FREEZE : number = 0x00b2;
    CHOMPA_IDLE : number = 0x00b3;
    CHOMPA_ATTACKING : number = 0x00b4;
    BLUBBER_WALKING : number = 0x00b5;
    BLUBBER_CRYING : number = 0x00b6;
    BLUBBER_DANCING : number = 0x00b7;
    BLUBBER_RUNNING : number = 0x00b8;
    BANJO_DROWNING : number = 0x00b9;
    // 00BA X
    // 00BB X
    LOCKUP_IDLE : number = 0x00bc;
    NIPPER_VULNERABLE : number = 0x00bd;
    NIPPER_HURT : number = 0x00be;
    NIPPER_ATTACKING : number = 0x00bf;
    NIPPER_IDLE : number = 0x00c0;
    // 00C1  Littlebounce
    // 00C2  Wobblybounce
    CLANKER_IDLE : number = 0x00c3;
    CLANKER_MOUTH_OPEN : number = 0x00c4;
    GRABBA_APPEARING : number = 0x00c5;
    GRABBA_HIDING : number = 0x00c6;
    GRABBA_IDLE : number = 0x00c7;
    GRABBA_DEFEATED : number = 0x00c8;
    MAGIC_CARPET : number = 0x00c9;
    GLOOP_SWIMMING : number = 0x00ca;
    GLOOP_BLOWING_BUBBLE : number = 0x00cb;
    BANJO_BEAKBOMB_END : number = 0x00cc;
    // 00CD Green Grate near RBB… (4B1)
    RUBEE_IDLE : number = 0x00ce;
    HISTUP_RAISED : number = 0x00cf;
    HISTUP_RAISING : number = 0x00d0;
    HISTUP_IN_POT : number = 0x00d1;
    BANJO_GETTING_UP : number = 0x00d2; // ;-)
    BANJO_BEAKBOMB_HURT : number = 0x00d3;
    SWITCH_DOWN : number = 0x00d4;
    SWITCH_UP : number = 0x00d5;
    TURBO_TALON_TRAINERS_IDLE : number = 0x00d6;
    // 00D7
    // 00D8
    GOBI_IDLE : number = 0x00d9;
    GOBI_PULLING_ON_CHAIN : number = 0x00da;
    FLIBBIT_HOPPING : number = 0x00db;
    GOBIS_ROPE_PULLING : number = 0x00dc;
    GOBIS_ROPE_IDLE : number = 0x00dd;
    // 00DE X
    RUBEE_PETTING_TOOTS : number = 0x00df;
    CROC_WALKING : number = 0x00e0;
    CROC_IDLE : number = 0x00e1;
    HISTUP_PEEKING : number = 0x00e2;
    RUBEE_IDLE_2 : number = 0x00e3;
    RUBEE_PLAYING : number = 0x00e4;
    GRABBA_SHADOW_SPAWNING : number = 0x00e5;
    GRABBA_SHADOW_IDLE : number = 0x00e6;
    GRABBA_SHADOW_HIDING : number = 0x00e7;
    GRABBA_SHADOW_DEFEATED : number = 0x00e8;
    SLAPPA_APPEARING : number = 0x00e9;
    SLAPPA_MOVING : number = 0x00ea;
    SLAPPA_SLAPPING : number = 0x00eb;
    SLAPPA_GETTING_UP : number = 0x00ec;
    ANCIENT_ONE_ENTER_EXIT : number = 0x00ed;
    SLAPPA_DYING : number = 0x00ee;
    SLAPPA_HURT : number = 0x00ef;
    MINIJINXY_EATING : number = 0x00f0;
    MAGIC_CARPET_2 : number = 0x00f1;
    // 00F2 X
    // 00F3 X
    GOBI_RELAXING : number = 0x00f4;
    // 00F5
    BANJO_IDLE_PULLING_KAZOOIE : number = 0x00f6;
    GOBI_HAPPY : number = 0x00f7;
    GOBI_RUNNING : number = 0x00f8;
    BUZZBOMB_FLYING : number = 0x00f9;
    FLIBBIT_IDLE : number = 0x00fa;
    FLIBBIT_TURNING : number = 0x00fb;
    GOBI_GIVING_WATER : number = 0x00fc;
    GOBI_GETTING_UP : number = 0x00fd;
    TRUNKER_SHORT : number = 0x00fe;
    TRUNKER_GROWING : number = 0x00ff;
    // 0100
    TANKTUP_HEAD_IDLE : number = 0x0101;
    TANKTUP_HEAD_POUNDED : number = 0x0102;
    TANKTUP_LEG_BACK_LEFT_HIT : number = 0x0103;
    TANKTUP_LEG_FRONT_LEFT_HIT : number = 0x0104;
    TANKTUP_LEG_FRONT_RIGHT_HIT : number = 0x0105;
    TANKTUP_LEG_BACK_RIGHT_HIT : number = 0x0106;
    TANKTUP_SPAWNING_JIGGY : number = 0x0107;
    SIR_SLUSH_IDLE : number = 0x0108;
    SIR_SLUSH_ATTACKING : number = 0x0109;
    // 010A X
    // 010B
    BANJO_DUCKING_TURNING : number = 0x010c;
    BANJO_FLYING_HIT : number = 0x010d;
    BUZZBOMB_PREPARING_CHARGE : number = 0x010e;
    BUZZBOMB_CHARGING : number = 0x010f;
    BUZZBOMB_FALLING : number = 0x0110;
    BUZZBOMB_DYING : number = 0x0111;
    FLIBBIT_DYING_START : number = 0x0112;
    FLIBBIT_DYING_END : number = 0x0113;
    // 0114 X
    // 0115 X
    BANJO_DUCKING_LOOKING : number = 0x0116;
    // 0117 Jellyfish (Unknown) 0x117
    // 0118 X
    // 0119 X
    // 011A X
    BANJO_CARRYING_ITEM_THROWING : number = 0x011b;
    CROC_JUMPING : number = 0x011c;
    CROC_HURT : number = 0x011d;
    CROC_DYING : number = 0x011e;
    WALRUS_IDLE : number = 0x011f;
    WALRUS_WALKING : number = 0x0120;
    WALRUS_JUMPING : number = 0x0121;
    CROC_BITING : number = 0x0122;
    CROC_EAT_WRONG_THING : number = 0x0123;
    MR_VILE_EATING : number = 0x0124;
    YUMBLIE_APPEARING : number = 0x125;
    YUMBLIE_LEAVING : number = 0x0126;
    YUMBLIE_IDLE : number = 0x0127;
    GRUMBLIE_APPEARING : number = 0x0128;
    GRUMBLIE_LEAVING : number = 0x0129;
    GRUMBLIE_IDLE : number = 0x012a;
    TIPTUP_LOOKING_AROUND_SHRUGGING : number = 0x012b;
    TIPTUP_TAPPING : number = 0x012c;
    TIPTUP_CHOIR_MEMBER_IDLE : number = 0x012d;
    TIPTUP_CHOIR_MEMBER_SINGING : number = 0x012e;
    TIPTUP_CHOIR_MEMBER_HURT : number = 0x012f;
    JINJO_CIRCLING_START : number = 0x0130;
    JINJO_CIRCLING_END : number = 0x0131;
    FLOATSAM_BOUNCING : number = 0x0132;
    NIPPER_DYING : number = 0x0133;
    // 0134
    // 0135
    // 0136
    GRIMLET_ATTACKING : number = 0x0137;
    TEXT_BACKDROP_APPEARING : number = 0x0138;
    BOTTLES_DISAPPEARING : number = 0x0139;
    BOTTLES_APPEARING : number = 0x013a;
    BOTTLES_SCRATCHING : number = 0x13b;
    BOTTLES_MOLEHILL_IDLE_1 : number = 0x013c;
    BOTTLES_MOLEHILL_IDLE_2 : number = 0x013d;
    SNORKEL_SWIMMING : number = 0x013e;
    SNORKEL_STUCK : number = 0x013f;
    // 0140
    // 0141
    RBB_ANCHOR_IDLE : number = 0x0141;
    RBB_ANCHOR_RISING : number = 0x0142;
    BUTTON : number = 0x0143;
    JINXY_SNIFFING : number = 0x0144;
    JINXY_SNEEZING : number = 0x0145;
    BOSS_BOOMBOX_APPEARING : number = 0x0146;
    BOOMBOX_HOPPING : number = 0x0147;
    BOOMBOX_EXPLODING : number = 0x0148;
    BANJO_FALL_DAMAGE : number = 0x0149;
    BANJO_LISTENING : number = 0x014a;
    CROCTUS_IDLE : number = 0x014b;
    BOGGY_IDLE : number = 0x014c;
    BOGGY_HIT : number = 0x014d;
    BOGGY_LAYING_DOWN : number = 0x14e;
    BOGGY_RUNNING : number = 0x014f;
    BOGGY_ON_SLED_IDLE : number = 0x0150;
    RACE_FLAG_HIT : number = 0x0151;
    RACE_FLAG_IDLE : number = 0x0152;
    GOLD_CHEST_SPAWNING : number = 0x0153;
    SNACKER_EATING : number = 0x0154;
    SNIPPET_GET_UP : number = 0x0155;
    MUTIE_SNIPPET_WALKING : number = 0x0156;
    MUTIE_SNIPPET_UPSIDEDOWN_START : number = 0x0157;
    MUTIE_SNIPPET_UPSIDEDOWN : number = 0x0158;
    MUTIE_SNIPPET_UPSIDEDOWN_END : number = 0x0159;
    GRILLE_CHOMPA_ATTACKING : number = 0x015a;
    GRILLE_CHOMPA_DYING : number = 0x015b;
    WHIPLASH_IDLE : number = 0x015c;
    WHIPLASH_ATTACKING : number = 0x015d;
    // 015E
    CS_CONCERT_BANJO_OFF_SCREEN : number = 0x015f;
    CS_CONCERT_BUG_CRAWLING : number = 0x0160;
    // 0161
    TOOTS_IDLE : number = 0x0162;
    CS_CONCERT_BUZZBOMB_HITTING_LOGO : number = 0x0163;
    // 0164
    BEEHIVE_IDLE : number = 0x0165;
    GOLD_CHEST_BOUNCING : number = 0x0166;
    // 0167 Banjo/MoveVeryLittle (used in small cutscenes)
    // 0168
    // 0169
    // 016A
    SNAREBEAR_SNAPPING : number = 0x016b;
    SNAREBEAR_IDLE : number = 0x016c;
    TWINKLY_BOX_OPENING : number = 0x016d;
    MUMBO_RECLINING : number = 0x016e;
    ZUBBA_FLYING : number = 0x016f;
    ZUBBA_IDLE : number = 0x0170;
    ZUBBA_FALLING : number = 0x0171;
    ZUBBA_LANDING : number = 0x0172;
    FLOWER_SPRING_GROWING : number = 0x0173;
    FLOWER_SUMMER_GROWING : number = 0x0174;
    FLOWER_AUTUMN_GROWING : number = 0x0175;
    GOBI_YAWNING : number = 0x0176;
    GOBI_SLEEPING : number = 0x0177;
    TWINKLY_APPEARING : number = 0x0178;
    BOGGY_ON_SLED_TAUNTING : number = 0x0179;
    BOGGY_ON_SLED_LOOKING_BACK : number = 0x017a;
    // 017B
    TWINKLY_TWINKLING : number = 0x017c;
    BOOGYS_CHILDREN_HAPPY : number = 0x017d;
    BOOGYS_CHILDREN_SAD : number = 0x017e;
    MUMBO_SWEEPING : number = 0x017f;
    MUMBO_ROTATION : number = 0x0180;
    FLOWER_SPRING_IDLE : number = 0x0181;
    FLOWER_SUMMER_IDLE : number = 0x0182;
    FLOWER_AUTUMN_IDLE : number = 0x0183;
    BIG_CLUCKER_ATTACKING_SHORT : number = 0x0184;
    BIG_CLUCKER_ATTACKING_LONG : number = 0x0185;
    BIG_CLUCKER_DYING : number = 0x0186;
    // 0187
    PUMPKIN_DYING : number = 0x0188;
    FLOATSAM_DYING : number = 0x0189;
    FP_PRESENT_IDLE : number = 0x018a;
    // 018B X
    // 018C X
    // 018D
    // 018E
    EYRIE_SPRING_FALLING_ASLEEP : number = 0x018f;
    EYRIE_SPRING_SLEEPING : number = 0x0190;
    EYRIE_SUMMER_IDLE : number = 0x0191;
    EYRIE_SUMMER_GROWING : number = 0x0192;
    EYRIE_SUMMER_FALLING_ASLEEP : number = 0x0193;
    EYRIE_SUMMER_SLEEPING : number = 0x0194;
    EYRIE_AUTUMN_IDLE : number = 0x0195;
    EYRIE_AUTUMN_GROWING : number = 0x0196;
    EYRIE_AUTUMN_FALLING_ASLEEP : number = 0x0197;
    EYRIE_AUTUMN_SLEEPING : number = 0x0198;
    EYRIE_WINTER_IDLE : number = 0x0199;
    EYRIE_WINTER_FLYING : number = 0x019a;
    BANJO_TRANSFORMING : number = 0x019b;
    WALRUS_HURT : number = 0x019c;
    WALRUS_DYING : number = 0x019d;
    WALRUS_ON_SLED : number = 0x019e;
    WALRUS_LOST_RACE_START : number = 0x019f;
    // 01A0 Unknown Dying (0x1A0)
    SLED_IDLE : number = 0x01a1;
    NABNUT_SLEEPING : number = 0x01a2;
    NABNUT_IDLE : number = 0x01a3;
    NABNUT_EATING : number = 0x01a4;
    // 01A5 X
    GNAWTY_IDLE : number = 0x01a6;
    GNAWTY_HAPPY : number = 0x01a7;
    GNAWTY_WALKING : number = 0x01a8;
    WALRUS_LOST_RACE : number = 0x01a9;
    BOGGY_WON_RACE : number = 0x01aa;
    BOGGY_LOST_RACE : number = 0x01ab;
    WOZZA_WITH_JIGGY_IDLE : number = 0x01ac;
    WOZZA_THROWING_JIGGY : number = 0x01ad;
    WOZZA_WALKING : number = 0x01ae;
    TWINKLY_MUNCHER_DYING : number = 0x01af;
    TWINKLY_MUNCHER_APPEARING : number = 0x01b0;
    TWINKLY_MUNCHER_IDLE : number = 0x01b1;
    TWINKLY_MUNCHER_MUNCHING : number = 0x01b2;
    WOZZA_BEFORE_STOP : number = 0x01b3;
    WOZZA_SCARED : number = 0x01b4;
    WOZZA_GIVING_JIGGY : number = 0x01b5;
    WOZZA_HALF_THROW_FREEZE : number = 0x01b6;
    CS_INTRO_GREEN_MIST_IDLE : number = 0x01b7;
    CS_INTRO_DOOR_OPENING : number = 0x01b8;
    CS_INTRO_GRUNTY_IDLE : number = 0x01b9;
    // 01BA
    CS_INTRO_GRUNTY_PICKING_NOSE : number = 0x01bb;
    // 01BC
    CS_INTRO_GRUNTY_ANGRY_AT_DINGPOT : number = 0x01bd;
    CS_INTRO_GRUNTY_THROWING_BOOGER : number = 0x01be;
    CS_INTRO_GRUNTY_SHOCKED_CONFUSED : number = 0x01bf;
    CS_INTRO_GRUNTY_WALKING : number = 0x01c0;
    // 01C1
    CS_INTRO_DOOR_CLOSING : number = 0x01c2;
    // 01C3
    CS_INTRO_GRUNTYS_BROOM_FLYING : number = 0x01c4;
    GRUNTY_FLYING : number = 0x01c5;
    // 01C6
    CS_INTRO_BANJO_SLEEPING : number = 0x01c7;
    CS_INTRO_BANJO_WAKING_UP : number = 0x01c8;
    CS_INTRO_BEDSHEETS_BANJO_SLEEPING : number = 0x01c9;
    CS_INTRO_BEDSHEETS_BANJO_AWAKE : number = 0x01ca;
    CS_INTRO_KAZOOIE_ON_COAT_RACK_APPEARING : number = 0x01cb;
    // 01CC
    CS_INTRO_KAZOOIE_ON_COAT_RACK_IDLE : number = 0x01cd;
    CS_INTRO_CURTAIN : number = 0x01ce;
    CS_INTRO_KAZOOIE_ON_COAT_RACK_UNEASY : number = 0x01cf;
    TOOTY_IDLE : number = 0x01d0;
    // 01D1
    // 01D2
    CS_INTRO_KAZOOIE_ON_COAT_RACK_WAKING_BANJO : number = 0x01d3;
    CS_INTRO_KAZOOIE_ON_COAT_RACK_FALLING : number = 0x01d4;
    TOOTY_SCARE : number = 0x01d5;
    GRUBLIN_WALKING_2 : number = 0x01d6;
    GRUBLIN_ALERTED : number = 0x01d7;
    GRUBLIN_CHASING : number = 0x01d8;
    GRUBLIN_DYING_2 : number = 0x01d9;
    SNIPPET_IDLE : number = 0x01da;
    MUTIE_SNIPPET_IDLE : number = 0x01db;
    BEE_FLYING : number = 0x01dc;
    BEE_WALKING : number = 0x01dd;
    BEE_IDLE : number = 0x01de;
    BEE_UNKNOWN_0X1DF : number = 0x01df;
    BEE_HURT : number = 0x01e0;
    BEE_DYING : number = 0x01e1;
    BEE_JUMPING : number = 0x01e2;
    GV_BRICK_WALL_SMASHING : number = 0x01e3;
    LIMBO_IDLE : number = 0x01e4;
    LIMBO_ALERTED : number = 0x01e5;
    LIMBO_CHASING : number = 0x01e6;
    LIMBO_BREAKING : number = 0x01e7;
    LIMBO_RECOVERING : number = 0x01e8;
    MUMMUM_IDLE : number = 0x01e9;
    MUMMUM_CURLING : number = 0x01ea;
    MUMMMUM_UNCURLING : number = 0x01eb;
    // 01EC
    RIPPER_HURT : number = 0x01ed;
    RIPPER_DYING : number = 0x01ee;
    // 01EF
    // 01F0  Web (Floor)
    // 01F1  Web Dying (Floor)
    // 01F2  Web (Wall)
    // 01F3  Web Dying (Wall)
    SHRAPNEL_IDLE : number = 0x01f4;
    // 01F5
    // Jiggy Transition
    // 01F6
    // 01F7  Kazooie Feathers Poof (End intro)
    // 01F8  Bottles PointAtGrunty
    // 01F9  Tooty Confused
    SEXY_GRUNTY_WALKING : number = 0x01fa;
    SEXY_GRUNTY_CHECKING_SELF_OUT : number = 0x01fb;
    UGLY_TOOTY_WALKING : number = 0x01fc;
    UGLY_TOOTY_PUNCHING : number = 0x01fd;
    // 01FE  Machine Door Opening
    // 01FF  Machine Door Closing
    // 0200  Static Machine Door Up
    KLUNGO_WALKING : number = 0x0201;
    KLUNGO_PUSHING_BUTTON : number = 0x0202;
    // 0203 X
    GRUNTY_FALLING : number = 0x0204;
    // 0205  Dingpot wap
    // 0206  Dingpot
    // 0207  Grunty Crammed in Machine
    ROYSTEN_IDLE : number = 0x0208;
    CUCKOO_CLOCK_IDLE : number = 0x0209;
    CUCKOO_CLOCK_CHIMING : number = 0x020a;
    // 020B  Grunty Falling
    // 020C
    KLUNGO_PULLING_LEVER : number = 0x020d;
    // 020E Machine Lever down
    KLUNGO_LAUGHING : number = 0x020f;
    // 0210  Machine
    // 0211
    WARP_CAULDRON_ACTIVATING : number = 0x0212;
    WARP_CAULDRON_SLEEPING : number = 0x0213;
    WARP_CAULDRON_IDLE : number = 0x0214;
    WARP_CAULDRON_TELEPORTING : number = 0x0215;
    WARP_CAULDRON_REJECTING : number = 0x0216;
    // 0217  Transform Pad
    // 0218
    // 0219
    EYRIE_SUMMER_EATING : number = 0x021a;
    EYRIE_AUTUMN_EATING : number = 0x021b;
    // 021C
    EYRIE_FLYING : number = 0x021d;
    EYRIE_WINTER_POOPING_JIGGY : number = 0x021e;
    // 021F X
    // 0220  Sir. Slush
    // 0221  Wozza (in cave)
    // 0222  Boggy Sleeping
    TOPPER_IDLE : number = 0x0223;
    TOPPER_DYING : number = 0x0224;
    // 0225  Colliwobble
    // 0226  Bawl
    // 0227  Bawl Dying
    // 0228
    // 0229  Whipcrack Attacking
    // 022A  Whipcrack
    NABNUT_FAT : number = 0x022b;
    NABNUT_CRYING : number = 0x022c;
    NABNUT_HAPPY : number = 0x022d;
    NABNUT_IDLE_2 : number = 0x022e;
    NABNUT_RUNNING : number = 0x022f;
    MRS_NABNUT_SLEEPING : number = 0x0230;
    NABNUTS_BEDSHEETS : number = 0x0231;
    // 0232  X
    // 0233  Chinker
    // 0234  Snare-Bear (Winter)
    // 0235  Sarcophagus (GV Lobby)
    PUMPKIN_HURT : number = 0x0236;
    // 0237  Twinkly Present
    LOGGO_IDLE : number = 0x0238;
    // 0239  Leaky Hop
    // 023A  Gobi Fly
    // 023B  Gobi Fly Prepare Attack
    // 023C  Gobi Fly Charge
    // 023D  Gobi Fly Dying
    // 023E Portrait Chompa (Picture Monster)
    // 023F  Portrait
    LOGGO_FLUSHING : number = 0x0240;
    // 0241
    // 0242  Gobi Relaxing
    GRUBLIN_HOOD_IDLE : number = 0x0243;
    GRUBLIN_HOOD_ALERTED : number = 0x0244;
    GRUBLIN_HOOD_CHASING : number = 0x0245;
    GRUBLIN_HOOD_DYING : number = 0x0246;
    // 0247
    // 0248
    // 0249
    FS_BANJO_COOKING_IDLE : number = 0x024a;
    FS_BANJO_COOKING_SELECTED : number = 0x024b;
    FS_BANJO_COOKING_SPIN : number = 0x024c;
    FS_BANJO_SLEEPING_IDLE : number = 0x024d;
    FS_BANJO_SLEEPING_SELECTED : number = 0x024e;
    FS_BANJO_SLEEPING_SPRING : number = 0x024f;
    FS_BANJO_PLAYING_GAMEBOY_IDLE : number = 0x0250;
    FS_BANJO_PLAYING_GAMEBOY_THUMBSUP : number = 0x0251;
    FS_BANJO_PLAYING_GAMEBOY_SPRING : number = 0x0252;
    BIGBUTT_HURT : number = 0x0253;
    BIGBUTT_DEFEATED_START : number = 0x0254;
    BIGBUTT_RECOVERING : number = 0x0255;
    // 0256
    // 0257  Grunty Green Spell (flying)
    // 0258  Grunty Hurt
    // 0259  Grunty Hurt
    // 025A  Grunty Fireball Spell
    ACORN_IDLE : number = 0x025b;
    // 025C  Grunty Phase 1 Swooping
    // 025D  Grunty Entring Final Phase
    // 025E  Grunty Phase 1 Vulnerable
    // 025F  Grunty
    // 0260  Grunty Fireball Spell
    // 0261  Grunty Green Spell
    JINJO_STATUE_RISING : number = 0x0262;
    // 0263  Grunty Fall off Broom
    JINJO_STATUE_ACTIVATING : number = 0x0264;
    JINJO_STATUE_IDLE : number = 0x0265;
    // 0266  Grunty/Falling down tower
    // 0267  Big Blue Egg
    // 0269  Big Red Feather
    // 026A  Big Gold Feather
    BRENTILDA_IDLE : number = 0x026b;
    BRENTILDA_HANDS_ON_HIPS : number = 0x026c;
    GRUNTLING_IDLE : number = 0x026d;
    GRUNTLING_ALERTED : number = 0x026e;
    GRUNTLING_CHASING : number = 0x026f;
    GRUNTLING_DYING : number = 0x0270;
    // 0271  Door of Grunty
    CHEATO_IDLE : number = 0x0272;
    SNACKER_HURT : number = 0x0273;
    SNACKER_DYING : number = 0x0274;
    // 0275  Jinjonator Activating
    // 0276  Jinjonator Charging
    // 0277
    // 0278  Jinjonator Recoil
    // 0279  Grunty JawDrop > Shiver
    // 027A  Grunty Hurt by Jinjonator
    // 027B  Jinjonator? (spin spin spin; stop far way; shake)
    // 027C  Jinjonator Charging
    // 027D  Jinjonator Final Hit
    // 027E  Jinjonator Taking Flight
    // 027F  Jinjonator Circling
    // 0280  Jinjonator Attacking
    // 0281  Wishy-Washy-Banjo 'Doooohh….'
    // 0282  Banjo Unlocking Note Door
    // 0283  Grunty Chattering Teeth
    // 0284  PRESS START Appearing
    // 0285  PRESS START
    // 0286  NO CONTROLLER Appearing
    // 0287  NO CONTROLLER
    FLIBBIT_HURT : number = 0x0288;
    GNAWTY_SWIMMING : number = 0x0289;
    FF_WASHING_MACHINE : number = 0x028a;
    // 028B Grunty
    GRUNTY_DOLL : number = 0x028c;
    // 028D  Grunty Walking
    // 028E  Tooty Looking Around
    // 028F  Dingpot
    // 0290  Dingpot Shooting
    // 0291  Mumbo Flipping Food
    // 0292  Food Flipping
    // 0293  Banjo Drinking
    // 0294  Mumbo Screaming
    // 0295  Banjo's Chair Breaking
    // 0296  Bottles Eating corn
    // 0297  Mumbo Skidding/Giving Flower
    // 0298
    // 0299  Bottles Falling off chair
    // 029A  Banjo Drunk
    // 029B  Kazooie Hits Banjo
    // 029C  Yellow Jinjo Waving & Whistling
    // 029D  Melon Babe Walking
    // 029E  Blubber On Jetski
    // 029F  Blubber Cheering on JetSki
    // 02A0  Curtains (Bottles Bonus)
    // 02A1  Banjo's Hand Dropping Jiggy
    // 02A2  Banjo's Hand
    // 02A3  Banjo's Hand Turning Jiggy (Right)
    // 02A4  Banjo's Hand Turning Jiggy (Left)
    // 02A5  Banjo's Hand Grabbing Jiggy
    // 02A6  Banjo's Hand Thumbs Up
    // 02A7  Banjo's Hand Placing Jiggy
    // 02A8  Banjo's Hand Thumbs Down
    // 02A9  Nibbly Falling
    // 02AA  Nibbly Dying
    // 02AB  Tee-Hee Dying
    // 02AC  Grunty Upset
    // 02AD  Grunty Looking
    // 02AE  Tree Shaking (Mumbo)
    // 02AF  Mumbo Sliding down tree
    // 02B0  Mumbo on tree (waving pictures)
    // 02B1  Mumbo falling from tree
    // 02B2  Bottles Eating watermelon
    // 02B3  Mumbo Hit by Coconuts
    // 02B4  Mumbo shake head sitting down
    // 02B5  Mumbo Jumping > Running
    // 02B6  Klungo Pushing rock
    // 02B7  Klungo Tired
    // 02B8  Tooty Drinking
    // 02B9  Grunty's Rock
    // 02BA  Kazooie Talking
    // 02BB  Mumbo Running After Melon Babe
    // 02BC  Mumbo Talking
    // 02BD
    // 02BE
    // 02BF
    // 02C0  Piranha Dying
    // 02C1
    // 02C2
    // 02C3
    // 02C4
    // 02C5  Grunty Preparing charge
    // 02C6  Mumbo's Hand
    // 02C7  Mumbo's Hand Appearing
    // 02C8  Mumbo's Hand Leaving
    BANJO_ROLLING = 0x4F;
  }



