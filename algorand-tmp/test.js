const algosdk = require('algosdk');
const token = '67164c53fbb4e4a8facf2af171322c084862e6a28d166192bc0a8355ee3355eb';
const server = 'http://127.0.0.1';
const port = 8080;
const client = new algosdk.Algodv2(token, server, port);

(async () => {
  console.log(await client.status().do());
})().catch((e) => {
  console.log(e);
});
