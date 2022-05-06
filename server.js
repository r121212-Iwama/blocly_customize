var express = require('express');
const app  = express();
const http = require("http").createServer(app);


app.use(express.static(__dirname + '/public/js'));
/**
 * "/"にアクセスがあったらindex.htmlを返却
*/
app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/node.html");
});

/**
 * 5000番でサーバを起動する
*/
const PORT = process.env.PORT || 5000;
http.listen(PORT, () => {
  console.log(`${PORT}番のポートで待機中です...`);
});