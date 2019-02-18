

document.getElementById("form-create-match").addEventListener("submit", async function (e) {

  e.preventDefault();
  let matchName = document.getElementById("match-name-input").value;
  let datetime = document.getElementById("datetime-input").value;
  let d = new Date(datetime);
  let srtDate = d.getMonth() + "/" + d.getDate() + "-" + d.getHours() + ":" +d.getMinutes();
  let rateWin = document.getElementById("rate-win").value;
  let rateDraw = document.getElementById("rate-draw").value;
  let rateLose = document.getElementById("rate-lose").value;
  let _rateWin = rateWin * decemailRate;
  let _rateDraw = rateDraw * decemailRate;
  let _rateLose = rateLose * decemailRate;
  await contract.methods.CreateMatch(matchName, srtDate, _rateWin, _rateDraw, _rateLose).send({
    from: (await web3.eth.getAccounts())[0],
    gas: 1000000,
    gasPrice: '25000000000'
  }).then(()=>{
    alert("Success");
  }).catch((e)=>{
    console.log(e);
  })
});

reloadMatch();

function reloadMatch(){
  let matchrow = document.getElementById("tbody-match-view");
  matchrow.innerHTML = "";
  contract.events.LogMatch({
    filter: {},
    fromBlock:0})
  .on('data', (data) => {
    let buffer = "<tr>";
    buffer += "<td>" + data.returnValues._DateTime +"</td>";
    buffer += "<td>" + data.returnValues._MatchName +"</td>";
    buffer += "<td>" + data.returnValues._RateWin/decemailRate +"</td>";
    buffer += "<td>" + data.returnValues._RateDraw/decemailRate +"</td>";
    buffer += "<td>" + data.returnValues._RateLose/decemailRate +"</td>";
    buffer+="</tr>";
    matchrow.innerHTML += buffer;
  })
}
