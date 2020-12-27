// API DOC: https://max.maicoin.com/documents/api
// NodeJS SDK: https://github.com/maicoin/max-exchange-api-node
// 
// Prerequisite: 
// - npm install max-exchange-api-node --save

const MAX = require('max-exchange-api-node')

const max = new MAX({
  accessKey: "4R8ZI1BkkPs43sEQGYivEmvwpgKjGHltiG2jD74L",
  secretKey: "3wH6VeP0udxxdaYsZXaCLxGUdjjqYu1udHu02uex",

});

//const max = new MAX({
//  accessKey: "your-key",
//  secretKey: "your-secret",
//});

const rest = max.rest() // default version is 2

start();

async function start() {
  //const supported = await rest.markets();
  //console.log('Supported markets:', supported);

  const market = 'btctwd';

  // Step1 : Get current price of btcusdt
  console.log(`Step1: 取得 ${market} 市價`)
  const tick = await rest.ticker({
    market,
  });
  console.log(`當前買入 ${market} >> ${tick.buy}`);
  console.log(`當前賣出 ${market} >> ${tick.sell}\n`);

}

function sleep(ms) {
  return new Promise( (resolve, reject) => {
     setTimeout( _ => resolve(), ms)
  })
}