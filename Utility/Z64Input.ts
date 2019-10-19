export enum ButtonState {
    Up = 0,
    Pressed = 1,
    Down = 2
}

export class Button 
{
    public state : ButtonState = 0;
    public invokeTime : number = 0;

    public constructor(inState : ButtonState = 0, inTime : number = 0) {
        this.state = inState;
        this.invokeTime = inTime;
    }
}

export class Z64Input 
{
    public Buttons:Button[] = new Array<Button>(15).fill(new Button());
    private ButtonFlags:number[] = [
        0x0001, //CRight
        0x0002, //CLeft
        0x0004, //CDown
        0x0008, //CUp
        0x0010, //RB
        0x0020, //LB
        0x1000, //Start
        0x2000, //Z
        0x8000, //A
        0x4000, //B
        0x0100, //Dpad Left
        0x0200, //Dpad Right
        0x0400, //Dpad Down
        0x0800 //Dpad Up
    ];
   
    public get CRight() : Button {
        return this.Buttons[0];
    }

    public get CLeft() : Button {
        return this.Buttons[1];
    }

    public get CDown() : Button {
        return this.Buttons[2];
    }

    public get CUp() : Button {
        return this.Buttons[3];
    }

    public get RB() : Button {
        return this.Buttons[4]
    }

    public get LB() : Button {
        return this.Buttons[5]
    }

    public get Start() : Button {
        return this.Buttons[6]
    }

    public get Z() : Button {
        return this.Buttons[7]
    }

    public get A() : Button {
        return this.Buttons[8]
    }

    public get B() : Button {
        return this.Buttons[9]
    }

    public get DRight() : Button {
        return this.Buttons[10]
    }

    public get DLeft() : Button {
        return this.Buttons[11]
    }

    public get DDown() : Button {
        return this.Buttons[12]
    }

    public get DUp() : Button {
        return this.Buttons[13]
    }

    public joystickX : number = 0;
    public joystickY : number = 0;

    private lastTime : number = 0;
    

    public get scaledJoyX() : number
    {
        return this.joystickX / 127;
    }

    public get scaledJoyY() : number
    {
        return this.joystickY / 127;
    }

    public emulator : any;
    public controllerPtr : number = 0;

    public constructor(inEmulator: any, inAddr: number)
    {
        this.emulator = inEmulator;
        this.controllerPtr = inAddr;
        this.Buttons = new Array<Button>(15).fill(new Button());
    }

    public step(time: number, logger : any = false)
    {
        var deltaTime = time - this.lastTime;
        this.lastTime = time;

        var buttonInput = this.emulator.rdramRead16(this.controllerPtr);
        this.joystickX = this.emulator.rdramReadS8(this.controllerPtr + 2);
        this.joystickY = this.emulator.rdramReadS8(this.controllerPtr + 3);

        var i = 0;
        for (i = 0; i < this.Buttons.length; i++)
        {
            if ((buttonInput & this.ButtonFlags[i]) === 0) this.Buttons[i] = new Button();
            if ((buttonInput & this.ButtonFlags[i]) === this.ButtonFlags[i]) 
            {
                if (this.Buttons[i].state === ButtonState.Up) this.Buttons[i] = new Button(ButtonState.Pressed, deltaTime);  
                else if (this.Buttons[i].state === ButtonState.Pressed) this.Buttons[i] = new Button(ButtonState.Down, this.Buttons[i].invokeTime + deltaTime);
            }  
        }
    }
}



