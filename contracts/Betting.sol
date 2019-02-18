pragma solidity ^0.5.0;

contract Betting{

  mapping(address => bool) owners;

  address[] private admins;

    constructor () public payable {
       owners[msg.sender] = true;
       admins.push(msg.sender);
    }

    struct Gamer{
        uint id;
        uint idMatch;
        address payable player;
        string descriptions;
        uint256 valueWin;
        uint256 valueDraw;
        uint256 valueLose;
        bool isPay;
    }

    struct Match{
        uint id;
        string matchName;
        string dateTime;
        uint256 rateWin;
        uint256 rateDraw;
        uint256 rateLose;
        uint winer;
        uint status;
    }

    mapping (uint=> Gamer) public gamers;
    uint gamerCounter;

    mapping (uint=> Match) public matches;
    uint matchCounter;

      //Using dishplay match
      event LogMatch(
        uint indexed _id,
        string _MatchName,
        string _DateTime,
        uint256 _RateWin,
        uint256 _RateDraw,
        uint256 _RateLose
        );

        //Using dishplay history of player
        event LogHistory(
          uint indexed _address,
          uint _idMatch,
          string _DateTime,
          uint256 _RateWin,
          uint256 _RateDraw,
          uint256 _RateLose
          );

          event LogPlayerBet(
            uint indexed _id,
            address indexed _player,
            uint _idMatch,
            string _dateTime,
            uint256 _valueWin,
            uint256 _valueDraw,
            uint256 _valueLose
            );
    //Gamer place a bet
    function PlaceBet(uint _idMatch, string memory _descriptions, uint256 _valueWin, uint256 _valueDraw, uint256 _valueLose) public payable returns(bool){

        require(matches[_idMatch].status == 0);
        uint256 maxIfPay = getTotalValueHavePayIfLoseAll();
        maxIfPay += getMax((_valueWin*matches[_idMatch].rateWin)/100,(_valueDraw*matches[_idMatch].rateDraw)/100,(_valueLose*matches[_idMatch].rateLose)/100);

        require(address(this).balance >= maxIfPay);

        uint256 totalValue = _valueWin + _valueDraw + _valueLose;
        require(msg.sender.balance >= totalValue);
        bool isPay = false;
        gamerCounter++;
        gamers[gamerCounter] = Gamer(
          gamerCounter,
            _idMatch,
            msg.sender,
           _descriptions,
           _valueWin,
           _valueDraw,
           _valueLose,
           isPay
        );

       emit LogPlayerBet(gamerCounter, msg.sender, _idMatch, _descriptions, _valueWin, _valueDraw, _valueLose);
       return true;
           // add histories
    }
    //Get Macth for betting
    function getMatchToBet() public view returns ( uint[]  memory u){

      uint[] memory matchIds = new uint[](matchCounter);

      uint count = 0;
      for(uint i = 1; i <= matchCounter; i++){

        if (matches[i].status == 0){
          matchIds[count] =  matches[i].id;
          count++;
        }
      }
        uint[] memory fordishPlay = new uint[](count);

        for(uint j = 0; j < count; j++){
          fordishPlay[j] =  matchIds[j];
        }
      return fordishPlay;
    }

    //Get Macth for betting
    function getMatchToUpdate() external view returns ( uint[]  memory u){

      uint[] memory matchIds = new uint[](matchCounter);

      uint count = 0;
      for(uint i = 1; i <= matchCounter; i++){

        if (matches[i].status != 2){
          matchIds[count] =  matches[i].id;
          count++;
        }
      }
        uint[] memory fordishPlay = new uint[](count);

        for(uint j = 0; j < count; j++){
          fordishPlay[j] =  matchIds[j];
        }
      return fordishPlay;
    }
    //Get amount gamer
    function getAllPlayers() public view returns ( uint[]  memory u){

      uint[] memory gamerIds = new uint[](gamerCounter);

      uint count = 0;
      for(uint i = 1; i <= gamerCounter; i++){

        if (gamers[i].player != address(0x0)){
          gamerIds[count] =  gamers[i].id;
          count++;
        }
      }
        uint[] memory fordishPlay = new uint[](count);

        for(uint j=0; j < count; j++){
          fordishPlay[j] =  gamerIds[j];
        }
      return fordishPlay;
    }


    //Return array gamer play match;
    function getGamerOfMatch(uint _idMatch) public view returns(uint256[] memory list){

      uint256[] memory gamerIds = new uint[](gamerCounter);

      uint numberGamerOfMatch = 0;

      for(uint i = 1; i <= gamerCounter; i++){

        if (gamers[i].idMatch == _idMatch){
            gamerIds[numberGamerOfMatch] = gamers[i].id;
            numberGamerOfMatch++;
        }
      }
      uint256[] memory winerIds = new uint[](numberGamerOfMatch);

      //return smaller array
      for(uint j = 0; j <  numberGamerOfMatch; j++){
        winerIds[j] = gamerIds[j];
      }

      return winerIds;
    }


    //tranfer Eth from contract to Address
    function transferETHFromContract(address payable  _to, uint256 _value) payable public  onlyOwner {
      // allowance has big enough
      require(address(this).balance >= _value);
          _to.transfer(_value);
    }
//////////////////////////////Function Addmin////////////////////////////////////

//Update the match and payer for gamer if the match finish
function updateMatch(uint _idMatch, uint _status, uint _result) external onlyOwner returns(bool pay){
  require (matches[_idMatch].status != 2);
  matches[_idMatch].status = _status;
  require (_status == 2);
  matches[_idMatch].winer = _result;
  uint256[]  memory idgamers = getGamerOfMatch(_idMatch);
  for(uint i = 0; i < idgamers.length; i++){
    Gamer memory  gamer = gamers[idgamers[i]];
    payMoneyForGamerOfMatch(gamer, _idMatch);
  }
  return true;
}
  //Create a mtach
  function CreateMatch(string memory _matchName, string memory _dateTime, uint256 _rateWin, uint256 _rateDraw, uint256 _rateLose) public onlyOwner returns(bool){
      matchCounter++;
      uint _winer = 0;
      uint _status = 0;
      matches[matchCounter] = Match(
        matchCounter,
          _matchName,
          _dateTime,
         _rateWin,
         _rateDraw,
         _rateLose,
         _winer,
         _status
         );
        emit LogMatch(matchCounter, _matchName, _dateTime, _rateWin, _rateDraw,_rateLose);
  }



  //withdraw from smart cotract only admin
  function withdraw() public onlyOwner{
      msg.sender.transfer(address(this).balance);
  }
  //Add Onwer to admins
  function addOwners(address _newAddress) public onlyOwner returns(bool isadmin){
    require(_newAddress !=address(0x0) && !owners[_newAddress] && owners[msg.sender]);
    owners[_newAddress] = true;
    admins.push(_newAddress);
    return true;
  }

  //View Owners
  function viewOwners() public onlyOwner view returns (address[] memory list ){
    require(owners[msg.sender]);
    return admins;
  }
  //require Owner
  modifier onlyOwner(){
    require(owners[msg.sender]);
    _;
  }

  ///////////////////////////Sub function//////////////////////

  //Pay winer _money
  function payMoneyForGamerOfMatch(Gamer memory _gamer, uint _idMatch) private onlyOwner returns(bool ispay){

    Match memory  mat = matches[_idMatch];

    // if the match finish do smt else do not
        require(mat.status == 2);
        // calculate value pay for gamer
        int value = 0;
        if(mat.winer == 1)
          value = (int)(mat.rateWin * _gamer.valueWin - mat.rateDraw * _gamer.valueDraw - mat.rateLose * _gamer.valueLose)*(10**14);
        if(mat.winer == 2)
          value = (int) (mat.rateDraw * _gamer.valueDraw - mat.rateWin * _gamer.valueWin -mat.rateLose * _gamer.valueLose)*(10**14);
        if(mat.winer == 3)
          value = (int)(mat.rateWin * _gamer.valueWin - mat.rateDraw * _gamer.valueDraw - mat.rateLose * _gamer.valueLose)*(10**14);

        require(value > 0 && !_gamer.isPay);
        transferETHFromContract(_gamer.player, uint256(value));
        gamers[_gamer.id].isPay = true;
        return true;
  }

  function getTotalValueHavePayIfLoseAll() private view returns(uint256 total){
    uint256[]  memory idMatches = getMatchToBet();
    uint256 totalValue = 0;
    for(uint i = 0; i < idMatches.length; i++){
      totalValue += getMaxValueHavePayIfLose(idMatches[i]);
    }
    return totalValue;
  }
//get max value have to pay one match
  function getMaxValueHavePayIfLose(uint _idMatch) private view returns(uint256 max){

    Match memory  mat = matches[_idMatch];
    require(mat.status != 2);
    uint256[]  memory idgamers = getGamerOfMatch(_idMatch);
    uint256 valueWin = 0;
    uint256 valueDraw = 0;
    uint256 valueLose = 0;

    //Get total value if lose
    for(uint i = 0; i < idgamers.length; i++){
      Gamer memory  gamer = gamers[idgamers[i]];
      if(!gamer.isPay){
        valueWin += (mat.rateWin * gamer.valueWin)*(10**14);
        valueDraw += (mat.rateDraw * gamer.valueDraw)*(10**14);
        valueLose += (mat.rateLose * gamer.valueLose)*(10**14);
      }
    }

    return getMax(valueWin,valueDraw,valueLose );
  }

  //fucntion return max value
  function getMax(uint256 a,  uint256 b, uint256 c) private pure returns(uint256 max) {
    uint256 maxVal = a;
    if(maxVal < b)
      maxVal = b;
    if(maxVal < c)
      maxVal = c;
    return maxVal;
  }
}
