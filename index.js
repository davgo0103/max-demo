// API DOC: https://max.maicoin.com/documents/api
// NodeJS SDK: https://github.com/maicoin/max-exchange-api-node
// 
// Prerequisite: 
// - npm install max-exchange-api-node --save

const MAX = require('max-exchange-api-node')

//請自行填入API金鑰
const max = new MAX({
  accessKey: process.env.MAX_API_KEY,
  secretKey: process.env.MAX_API_SECRET,

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
  console.log(`當前市價買入 ${market} >> ${tick.buy}`);
  console.log(`當前市價賣出 ${market} >> ${tick.sell}\n`);


  // Step2: 檢查帳號內的btc usdt 持有數量
  console.log("Step2: 檢查帳號內的持有數量")
  try {
    let btcAmount = await rest.account('btc');
    let usdtAmount = await rest.account('usdt');
    console.log(`Current balance: btc=${btcAmount.balance} usdt=${usdtAmount.balance}\n`);
  } catch (error) {console.log("提供的金鑰無法讀取帳號財產")}
  

  //Step3: 購買虛擬貨幣
  console.log("Step3: 買入 0.001 顆 btc")
  try {
    const response = await rest.placeOrder({
      market,
      price: tick.sell,
      volume: '0.001',
      side: 'buy',
      ord_type: 'limit',
    });
    console.log(`The response of placing order:`, response);
    console.log("")
  } catch (error) {console.log("提供的金鑰無法進行虛擬貨幣交易")}
  

  await sleep(1000);

  // Step4: 取得歷史訂單
  console.log("Step4: 取得交易結果")
  try {
    const history = await rest.orders({ market, state: ['wait', 'convert', 'done'] });
    console.log('交易結果:', history.pop())
  } catch (error) {console.log("提供的金鑰無法讀取帳號資料");}
  

  // Step5: 如果訂單成功執行應該會看到資產餘額變化
  console.log("Step5: 如果訂單成功執行應該會看到資產餘額變化")
  try {
    btcAmount = await rest.account('btc');
    usdtAmount = await rest.account('usdt');
    console.log(`當前餘額: btc=${btcAmount.balance} usdt=${usdtAmount.balance}\n`);
  } catch (error) {console.log("提供的金鑰無法讀取帳號財產");}
}

function sleep(ms) {
  return new Promise( (resolve, reject) => {
     setTimeout( _ => resolve(), ms)
  })
}