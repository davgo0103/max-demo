// API DOC: https://max.maicoin.com/documents/api
// NodeJS SDK: https://github.com/maicoin/max-exchange-api-node
// 
// Prerequisite: 
// - npm install max-exchange-api-node --save

const MAX = require('max-exchange-api-node')

const max = new MAX({
  accessKey: "4R8ZI1BkkPs43sEQGYivEmvwpgKjGHltiG2jD74L",//請填入申請的accessKey
  secretKey: "3wH6VeP0udxxdaYsZXaCLxGUdjjqYu1udHu02uex",//請填入申請的secretKey

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

  const market = 'btcusdt';

  // Step1 : 取得市價
  console.log(`Step1: 取得 ${market} 市價`)
  const tick = await rest.ticker({
    market,
  });
  console.log(`當前市價買入 ${market} 是 ${tick.buy}`);
  console.log(`當前市價賣出 ${market} 是 ${tick.sell}\n`);


  // Step2: 檢查帳號內的btc usdt 持有數量
  console.log("Step2: 檢查帳號內的持有數量")
  let btcAmount = await rest.account('btc');
  let usdtAmount = await rest.account('usdt');
  console.log(`Current balance: btc=${btcAmount.balance} usdt=${usdtAmount.balance}\n`);

  //Step3: Buy 0.001 btc in usdt at best ask price
  console.log("Step3: Buy 0.001 btc in usdt at best ask price")
  const response = await rest.placeOrder({
    market,
    price: tick.sell,
    volume: '0.001',
    side: 'buy',
    ord_type: 'limit',
  });
  console.log(`The response of placing order:`, response);
  console.log("")

  await sleep(1000);

  // Step4: Get order history
  console.log("Step4: Get order history")
  const history = await rest.orders({ market, state: ['wait', 'convert', 'done'] });
  console.log('Order history:', history.pop())

  // Step5: If the order is executed successfully, you should see balance change.
  console.log("Step5: If the order is executed successfully, you should see balance change.")
  btcAmount = await rest.account('btc');
  usdtAmount = await rest.account('usdt');
  console.log(`Current balance: btc=${btcAmount.balance} usdt=${usdtAmount.balance}\n`);
}

function sleep(ms) {
  return new Promise( (resolve, reject) => {
     setTimeout( _ => resolve(), ms)
  })
}