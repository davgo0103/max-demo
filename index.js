// API DOC: https://max.maicoin.com/documents/api
// NodeJS SDK: https://github.com/maicoin/max-exchange-api-node
// 
// Prerequisite: 
// - npm install max-exchange-api-node --save

const MAX = require('max-exchange-api-node')

//請自行填入API金鑰
const max = new MAX({
  accessKey: "4R8ZI1BkkPs43sEQGYivEmvwpgKjGHltiG2jD74L",
  secretKey: "3wH6VeP0udxxdaYsZXaCLxGUdjjqYu1udHu02uex",

});

//const max = new MAX({
//  accessKey: "your-key",
//  secretKey: "your-secret",
//});

const rest = max.rest() // default version is 2

console.log("\x1b[36m","歡迎使用量化虛擬貨幣交易程式\n即將開始讀取信箱郵件\n")
readmail();



async function buy() {
  //const supported = await rest.markets();
  //console.log('Supported markets:', supported);

  const market = 'ethtwd';

  // Step1 : 取得市價
  console.log("\x1b[0m",`Step1: 取得 ${market} 市價`)
  const tick = await rest.ticker({
    market,
  });
  console.log(`當前市價買入 ${market} >> ${tick.buy}`);
  console.log(`當前市價賣出 ${market} >> ${tick.sell}\n`);


  // Step2: 檢查帳號內的btc usdt 持有數量
  console.log("Step2: 檢查帳號內的持有數量")
  try {
    let ethAmount = await rest.account('eth');
    let twdAmount = await rest.account('twd');
    console.log(`當前餘額: ETH=${ethAmount.balance} TWD=${twdAmount.balance}\n`);
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
    console.log(`下單後伺服器回應:`, response);
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
    ethAmount = await rest.account('eth');
    twdAmount = await rest.account('twd');
    console.log(`當前餘額: ETH=${ethAmount.balance} TWD=${twdAmount.balance}\n`);
    readmail();
  } catch (error) {console.log("提供的金鑰無法讀取帳號財產");}
}



async function sell() {
  //const supported = await rest.markets();
  //console.log('Supported markets:', supported);

  const market = 'ethtwd';

  // Step1 : 取得市價
  console.log("\x1b[0m",`Step1: 取得 ${market} 市價`)
  const tick = await rest.ticker({
    market,
  });
  console.log(`當前市價買入 ${market} >> ${tick.buy}`);
  console.log(`當前市價賣出 ${market} >> ${tick.sell}\n`);


  // Step2: 檢查帳號內的btc usdt 持有數量
  console.log("Step2: 檢查帳號內的持有數量")
  try {
    let ethAmount = await rest.account('eth');
    let twdAmount = await rest.account('twd');
    console.log(`當前餘額: ETH=${ethAmount.balance} TWD=${twdAmount.balance}\n`);
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
    console.log(`下單後伺服器回應:`, response);
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
    ethAmount = await rest.account('eth');
    twdAmount = await rest.account('twd');
    console.log(`當前餘額: ETH=${ethAmount.balance} TWD=${twdAmount.balance}\n`);
    readmail();
  } catch (error) {console.log("提供的金鑰無法讀取帳號財產");}
}


function sleep(ms) {
  return new Promise( (resolve, reject) => {
     setTimeout( _ => resolve(), ms)
  })
}

function readmail() {
    var Today = new Date();
    var Imap = require('imap')
    var MailParser = require("mailparser").MailParser
    var fs = require("fs")
    var imap = new Imap({
        user: 'davvvgo@gmail.com', //你的郵箱賬號
        password: 'asdfghjkl0103', //你的郵箱密碼
        host: 'imap.gmail.com', //郵箱伺服器的主機地址
        port: 993, //郵箱伺服器的埠地址
        tls: true, //使用安全傳輸協議
        tlsOptions: { rejectUnauthorized: false } //禁用對證書有效性的檢查
    });
    function openInbox(cb) {
        imap.openBox('INBOX', false, cb);
    }
    
    imap.once('ready', function () {
        openInbox(function (err, box) {
            console.log("\x1b[36m","開啟郵箱")
            title = "";
            if (err) throw err;
            imap.search(['UNSEEN', ['SINCE', (Today.getMonth() + 1) + ' ' + (Today.getDate()-1) + ',' + Today.getFullYear()]], function (err, results) {//未讀的郵件
                if (err) throw err;
                try {
                    var f = imap.fetch(results, { bodies: '', markSeen: "true" });//抓取郵件（預設情況下郵件伺服器的郵件是未讀狀態）
                    f.on('message', function (msg, seqno) {
                        var mailparser = new MailParser();
                        msg.on('body', function (stream, info) {
                            stream.pipe(mailparser);//將為解析的資料流pipe到mailparser
                            //郵件頭內容
                            mailparser.on("headers", function (headers) {
                                console.log("\x1b[36m","郵件頭資訊>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
                                console.log("\x1b[36m","郵件主題: " + headers.get('subject'));
                                title = headers.get('subject');
                            });
    
                        });
  
                    });
                    f.once('error', function (err) {
                        console.log("\x1b[36m",'抓取出現錯誤: ' + err);
                    });
                    f.once('end', function () {
                        console.log("\x1b[36m",'所有郵件抓取完成!');
                        imap.end();
                    });
                } catch (error) {
                    console.log("\x1b[36m","無未讀郵件");
                    imap.end();
                }                
            });
        });
    });
    imap.once('error', function (err) {
        console.log(err);
    });
    imap.once('end', function () {
        console.log('\x1b[36m','關閉郵箱\n');
        if(title == "快訊： buy"){
          buy();
        }
        else if(title == "快訊： sell"){
          sell();
        }else{
          sleep(100)
        
          readmail();
        }
        
        
    });
    imap.connect();

}