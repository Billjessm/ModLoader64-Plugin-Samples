let CheckIgnore = function (lhs : any, ignoreList : Array<any>){
  var i = 0;
  for (i = 0; i <= ignoreList.length; i++){
    if (lhs == ignoreList[i]) {return true;}
  }

  return false;
}

export class MemoryWatcher 
{
  public emulator : any;
  public logger : any;
  public addr : number;
  public size : number;
  public byteSize : number = 4;
  public ignoreList : number[];
  public searchIgnore: number[] = [];
  public firstCheck : boolean = true;

  private differenceCountList : number[];
  private lastDifferenceCountList : number[];
  private backBuffer : Buffer;

  public constructor(inAddr: number, inSize : number, inEmulator : any, inByteSize : number = 4, inIgnoreList : Array<number> = [], inLogger : any = false)
  {
    this.addr = inAddr;
    this.size = inSize;
    this.emulator = inEmulator;
    this.byteSize = inByteSize;
    this.ignoreList = inIgnoreList;

    this.differenceCountList = new Array<number>(inSize).fill(0);
    this.lastDifferenceCountList = new Array<number>(inSize).fill(0);
    this.backBuffer = this.emulator.rdramReadBuffer(inAddr, inSize);
    this.logger = inLogger;
  }

  private log(message ?: any, ... optionalParams: any[]) : void
  {
    if (this.logger) this.logger.warn(message, optionalParams);
  }

  public resetScan() : void 
  {
    this.firstCheck = true;
    this.lastDifferenceCountList = new Array<number>(this.size).fill(0);
    this.differenceCountList = new Array<number>(this.size).fill(0);
    this.searchIgnore = [];
    this.log("Resetting scan results.")
  }

  public newScan() : boolean
  {
    if (this.firstCheck) 
    {
      this.firstCheck = false;
      this.lastDifferenceCountList = this.differenceCountList;
      this.log("First Check, initializing variables.");
      return true;
    }
    return false;
  }

  public updateChangeCounters() : void 
  {
    var thisBuffer = this.emulator.rdramReadBuffer(this.addr, this.size);

    if (!thisBuffer.equals(this.backBuffer))
    {
      var i = 0;
      for (i = 0; i <= this.size; i += this.byteSize) 
      {
        var deltaBuffer0 = new Buffer(this.byteSize);
        var deltaBuffer1 = new Buffer(this.byteSize);

        var q = 0;
        for (q = 0; q < this.byteSize; q++) 
        {
          deltaBuffer0[q] = this.backBuffer[i + q];
          deltaBuffer1[q] = thisBuffer[i + q];
        }

        if (!deltaBuffer0.equals(deltaBuffer1))
        {
          this.lastDifferenceCountList = Object.assign([], this.differenceCountList); //I can't just set via = ?!
          this.differenceCountList[i] = this.differenceCountList[i] + 1;
          this.log("Differences!");
        }
      }
      this.backBuffer = thisBuffer;
    }
    this.log("Change Counters Updated.");
  }

  public scanChanged(changed : boolean = true) : void 
  {
    if (this.newScan()) return;

    this.updateChangeCounters();

    if (this.lastDifferenceCountList === this.differenceCountList) 
    {
      this.log("Search is completely unchanged!");
      return;
    }

    var fullString = changed ? "Changed: " : "Unchanged: ";

    var i = 0;
    for (i = 0; i < this.size; i += this.byteSize) 
    {
      if ( !CheckIgnore(i, this.searchIgnore) &&
        (changed ? this.differenceCountList[i] != this.lastDifferenceCountList[i]
        : this.differenceCountList[i] == this.lastDifferenceCountList[i])
        ) fullString = fullString + " 0x" + i.toString(16) + ": " + this.emulator.rdramReadS16(this.addr + i).toString();
      else this.searchIgnore.push(i);
    }
    this.log(fullString);
  }

  //TODO: Optimize
  public logDifferences(min : number = 0) : void 
  {
    let fullString = "";
    let outList = "[ ";
    let listSize = 0;

    var i = 0;
    for (i = 0; i < this.size; i += this.byteSize) 
    {
      if (this.differenceCountList[i] >= min && !CheckIgnore(i, this.ignoreList)) 
      {
        fullString = fullString + " 0x" + i.toString(16) + ": " + this.differenceCountList[i].toString();
        outList = outList + " 0x" + i.toString(16);

        if (i < this.size - this.byteSize) outList = outList + ",";
        listSize++;
      }
    }

    if (listSize > 0)
    {
      outList = outList + " ]";
      this.log(fullString + " | " + listSize.toString() + "\noutList: " + outList);
    }
  }


}



