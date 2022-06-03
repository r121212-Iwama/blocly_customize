var express = require('express');
const app  = express();
const http = require("http").createServer(app);
const io   = require("socket.io")(http);
const bodyParser = require('body-parser');
var git = require( 'simple-git' );
var fs = require( 'fs' );


//-----------------------------------------------
// グローバル変数
//-----------------------------------------------
// worksapceにあるすべてのブロックの情報(string)
var worksapceBlock = "";

app.use(express.static(__dirname + '/public/js'));
app.use(express.static(__dirname + '/public/css'));
app.use(bodyParser.urlencoded({extended: true}));
/**
 * "/"にアクセスがあったらindex.htmlを返却+git操作
*/

var git_url = 'https://github.com/r121212-Iwama/blockly-data.git';
var local_folder = 'work';
var txt_tmp = '';

//. clone
git().clone( git_url, local_folder );

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/login.html");
});

app.post("/blockly", (req, res)=>{
    console.log(req.body);
    txt_tmp = req.body["name"] + "-" + req.body["proname"] + "-" + req.body["propass"] ;
    var proname = "";
    proname = req.body["proname"];
    const path = "work/"+ proname;
 
    if( fs.existsSync( path ) ){
        console.log( "存在します。");
        res.sendFile(__dirname + "/error.html");
    }else{
        console.log( "存在しません。");
        fs.mkdir(path,  (e) =>  {
            if(e)console.error(e);
        });

        fs.writeFile(path + '/test.txt', txt_tmp, function (err) {
            if (err) { throw err; }
            console.log('test.txtが作成されました');
        });
        
        //. pull, add, commit, and push
        git( local_folder )
          .add( __dirname + '/work'  )
          .commit( 'README.md updated.' )
          .push( [ '-u', 'origin', 'main' ]);

        res.sendFile(__dirname + "/index.html");
    }
    
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