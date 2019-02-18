document.getElementById("form-create-match").addEventListener("submit", async function (e) {

  e.preventDefault();

  //Create gamer when user bet
  if(document.querySelector('input[name="groupMatch"]:checked') != null){

    let idMatch = document.querySelector('input[name="groupMatch"]:checked').value;
    let rateWin = document.getElementById(idMatch).getElementsByClassName("rate-win")[0].value;
    let rateDraw = document.getElementById(idMatch).getElementsByClassName("rate-draw")[0].value;
    let rateLose = document.getElementById(idMatch).getElementsByClassName("rate-lose")[0].value;
    let _rateWin = rateWin * decemailRate;
    let _rateDraw = rateDraw * decemailRate;
    let _rateLose = rateLose * decemailRate;
    let descript = new Date().toLocaleTimeString();

    //if not fill value bet do not nothing
    if(_rateWin == 0 && _rateDraw == 0 && _rateLose == 0){
      alert("You do not bet any value!");
      return;
    }
    //convert to wei value
    let moneyBet = web3.utils.toWei((parseFloat(rateWin) + parseFloat(rateDraw) + parseFloat(rateLose)).toString()	,"ether");

    let playerAdress = (await web3.eth.getAccounts())[0];
    var isValueContractEnough = await _isBalanceOfContractEnough(idMatch, rateWin, rateDraw, rateLose);
    if (isValueContractEnough) {
      contract.methods.PlaceBet(idMatch, descript, _rateWin, _rateDraw, _rateLose).send({
        value: moneyBet,
        from: playerAdress,
        gas: 1000000,
        gasPrice: '25000000000'
      }).then((gamerCounter)=>{
        console.log(gamerCounter);
      }).catch((e)=>{
        console.log(e);
      });
    } else{
      alert("Contract don't have enough balance")
    }
  }
});


//Dishplay bet when load
function reloadMatchToBet(){
   contract.methods.getMatchToBet().call().then((results)=>{
     for (var i = 0; i < results.length; i++) {
       var idMatch = results[i];
       contract.methods.matches(idMatch).call().then((match)=>{
          renderMatch(match);
       });
     }
   })
}
//Dishplay history of player
 async function reloadHistory() {
  let playerAdress = (await web3.eth.getAccounts())[0];
  contract.events.LogPlayerBet({
     filter: {_player: playerAdress}, // Using an array means OR: e.g. 20 or 23
     fromBlock: 0
   }).on('data', (data)=> {
     renderHistory(data);
   })
};

//dishplay history of address
async	function renderHistory(data){
  let historyrow = document.getElementById("tbody-history-view");
  let buffer = '<tr>';
  let match = await contract.methods.matches(data.returnValues._idMatch).call();
  buffer += '<td><span class="match-date" name="match-time">' + data.returnValues._dateTime + "</span></td>";
  buffer += '<td><span class="match-name" name="match-name">'+ match.matchName + "</span></td>";
  buffer += '<td><span class="match-rate">' + (data.returnValues._valueWin)/decemailRate + '</span></div></td>';
  buffer += '<td><span class="match-rate">' + data.returnValues._valueDraw/decemailRate  +'</span></div></td>';
  buffer += '<td><span class="match-rate">' + data.returnValues._valueLose/decemailRate  +'</span></td>';
  buffer+="</tr>";
  historyrow.innerHTML += buffer;
}

//dishplay a match
 renderMatch = (match)=>{
    let matchrow = document.getElementById("tbody-match-view");
    let buffer = '<tr id="' + match.id + '">';
    buffer += '<td ><span class="match-date" name="match-time">' + match.dateTime +"</span></td>";
    buffer += '<td><span class="match-name" name="match-name">'+ match.matchName +"</span></td>";
    buffer += '<td><span class="match-rate">' + match.rateWin/decemailRate+'</span><div><input class="form-control rate-win" type="number" value="0.00" name="rate-win" step="0.01"><span class="eth-label"> ETH</span></div></td>';
    buffer += '<td><span class="match-rate">' + match.rateDraw/decemailRate +'</span><div><input class="form-control rate-draw" type="number" value="0.00" name="rate-draw" step="0.01"><span class="eth-label"> ETH</span></div></td>';
    buffer += '<td><span class="match-rate">' + match.rateLose/decemailRate +'</span><div><input class="form-control rate-lose" type="number" value="0.00" name="rate-lose" step="0.01"><span class="eth-label"> ETH</span></div></td>';
    buffer += '<td><input type="radio" class="form-check-input" value="' + match.id + '" name="groupMatch"></td>';
    buffer+="</tr>";

    matchrow.innerHTML += buffer;
}
function TestEvent() {
  contract.once('LogPlayerBet', {
  filter: {playerAdress: 0x820B2950f0908B1035564E7B06ce5BE172503E05}, // Using an array means OR: e.g. 20 or 23
  fromBlock: 0
  }, (error, event) => { console.log(event); });
}


// Check the balance of contract : if balance >= max bet => return true; else return false;
async function _isBalanceOfContractEnough(idMacth, rateWin, rateDraw, rateLose){

  let balance = await web3.eth.getBalance(contract._address);
  let arrayIdGamers = await contract.methods.getGamerOfMatch(idMacth).call();
  let match = await contract.methods.matches(idMacth).call();

  let totalValueBetWin = 0;
  let totalValueBetDraw = 0;
  let totalValueBetLose = 0;

  for (var i = 0; i < arrayIdGamers.length; i++) {
    var id = arrayIdGamers[i];
    let player = await	contract.methods.gamers(id).call();
    totalValueBetWin += parseInt(web3.utils.toWei(((player.valueWin/decemailRate) * (match.rateWin/decemailRate)).toString(),"ether"));
    totalValueBetDraw += parseInt(web3.utils.toWei(((player.valueDraw/decemailRate) * (match.rateDraw/decemailRate)).toString(),"ether"));
    totalValueBetLose += parseInt(web3.utils.toWei(((player.valueLose/decemailRate) * (match.rateLose/decemailRate)).toString(),"ether"));
  }

  //Add money bet of current player
  totalValueBetWin += parseInt(web3.utils.toWei((parseFloat(rateWin)*(match.rateWin/decemailRate)).toString(), "ether"));
  totalValueBetDraw += parseInt(web3.utils.toWei((parseFloat(rateDraw)*(match.rateWin/decemailRate)).toString()	,"ether"));
  totalValueBetLose +=   parseInt(web3.utils.toWei((parseFloat(rateLose)*(match.rateWin/decemailRate)).toString(),"ether"));

  let maxValue = getMaxValue(totalValueBetWin,totalValueBetDraw,totalValueBetLose);

  if (parseInt(balance) >= parseInt(maxValue)) {
    return true;
  }
  return false;
}
//private function
 getMaxValue = (a, b,c) =>{
   let max = a;
    if(max < b)
      max =b
    if(max < c)
    max = c;
    return max;
}
