var express = require('express');
const app  = express();
const http = require("http").createServer(app);
const io   = require("socket.io")(http);

//-----------------------------------------------
// グローバル変数
//-----------------------------------------------
// worksapceにあるすべてのブロックの情報(string)
var worksapceBlock = "";

app.use(express.static(__dirname + '/public/js'));
/**
 * "/"にアクセスがあったらindex.htmlを返却
*/
app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/node.html");
});

/**
 * [イベント] ユーザーが接続
*/
io.on("connection", (socket)=>{
    console.log("ユーザーが接続しました");
    console.log(worksapceBlock);
    io.emit("workspace-post", worksapceBlock);

    socket.on("workspace", (msg)=>{
        if(worksapceBlock == msg){
        return
        }
        worksapceBlock = msg;
        console.log(worksapceBlock);
        io.emit("workspace-post", worksapceBlock);
        // console.log(msg);
        // console.log(typeof(msg));
    });

});

/**
 * 5000番でサーバを起動する
*/
const PORT = process.env.PORT || 5000;
http.listen(PORT, () => {
  console.log(`${PORT}番のポートで待機中です...`);
});