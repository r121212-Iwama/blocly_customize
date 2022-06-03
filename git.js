var git = require( 'simple-git' );
var fs = require( 'fs' );

var git_url = 'https://github.com/r121212-Iwama/blockly-data.git';
var local_folder = 'work';

//. clone
git().clone( git_url, local_folder );

// fs.mkdir('test', (err) => {
//     if (err) { throw err; }
//     fs.writeFile('test/test.txt', 'Hello!', function (err) {
//         if (err) { throw err; }
//         console.log('test/test.txtが作成されました');
//     });
// });

// fs.readdir('./' + local_folder , (e, result) =>  (e)  ? console.error(e): console.log(result));
const path = "work/test";
 
if( fs.existsSync( path ) ){
    console.log( "存在します。");
}else{
    console.log( "存在しません。");
    fs.mkdir('work/test',  (e) =>  {
        if(e)console.error(e);
    });
}


fs.writeFile('work/test/test.txt', 'Hello!', function (err) {
    if (err) { throw err; }
    console.log('test.txtが作成されました');
});

//. pull, add, commit, and push
git( local_folder )
  .add( __dirname + '/work' )
  .commit( 'README.md updated.' )
  .push( [ '-u', 'origin', 'main' ]);