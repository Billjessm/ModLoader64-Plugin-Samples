let CheckIgnore = function (lhs : any, ignoreList : Array<any>){
  var i = 0;
  for (i = 0; i <= ignoreList.length; i++){
    if (lhs == ignoreList[i]) {return true;}
  }

  return false;
}

class MemoryWatcher {
  public ignoreList : Array<number>;
  public differenceCountList : Array<number>;
  public backBuffer : Buffer;
  public emulator : any;
  public addr : number;
  public size : number;
  public byteSize : number = 4;

  public constructor(inAddr: number, inSize : number, inEmulator : any, inByteSize : number = 4, inIgnoreList : Array<number> = [])
  {
    this.addr = inAddr;
    this.size = inSize;
    this.emulator = inEmulator;
    this.byteSize = inByteSize;
    this.ignoreList = inIgnoreList;

    this.differenceCountList = new Array<number>(inSize).fill(0);
    this.backBuffer = this.emulator.rdramReadBuffer(inAddr, inSize);
  }

  

  check(logger: any = false) : void
  {
    var thisBuffer = this.emulator.rdramReadBuffer(this.addr, this.size);

    var i = 0;

    if (!thisBuffer.equals(this.backBuffer)){
      for (i = 0; i <= thisBuffer.length; i+= this.byteSize) {
        var deltaBuffer0 = new Buffer(this.byteSize);
        var deltaBuffer1 = new Buffer(this.byteSize);

        var q = 0;
        for (q = 0; q <= 3; q++) {
          deltaBuffer0[q] = this.backBuffer[i + q];
          deltaBuffer1[q] = thisBuffer[i + q];
        }

        if (!deltaBuffer0.equals(deltaBuffer1)) this.differenceCountList[i] = this.differenceCountList[i] + 1;

        if (logger) logger.info("Addr, Size: 0x" + this.addr.toString(16) + ", 0x" + this.size.toString(16) + " Offset: 0x" + i.toString(16) + " " + deltaBuffer0.toString('hex') + "->" + deltaBuffer1.toString('hex'));
      }
    }

    this.backBuffer = thisBuffer;
  }

  viewDifferences(min : number = 0, logger: any = false) : void {
    let fullString = "";
    let outList = "[ ";
    let listSize = 0;

    

    var i = 0;

    for (i=0; i < this.differenceCountList.length; i += this.byteSize) {
      if (this.differenceCountList[i] >= min && !CheckIgnore(i, this.ignoreList)) {
        fullString = fullString + " 0x" + i.toString(16) + ": " + this.differenceCountList[i].toString();
        outList = outList + " 0x" + i.toString(16);

        if (i < this.differenceCountList.length) outList = outList + ",";
        listSize++;
      }
    }

    if (listSize > 0){
      outList = outList + " ]";
      if (logger) {
        logger.info(fullString + " | " + listSize.toString() + "\noutList: " + outList);
      }
    }
  }


}

export { MemoryWatcher }


