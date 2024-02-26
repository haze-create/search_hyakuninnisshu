
//複数の関数をまたがって使う変数を定義しておく
let prhases_JSON='';
let phrases='';
let text='';
let ul='';
let li='';
let li_element='';

//検索結果で使う変数
let keyword='';
let number='';
let simo_phrase='';
let kami_phrase='';
let sakusya_name='';
let foundList='';

//JSでの処理を行う↓
window.addEventListener('load',function(){

    ul=document.getElementById('searchtext');

    //データ（JSONファイル）を取得する
    getdata();
    
    //検索ボタンが押されたらsearch関数を実行
    document.getElementById('input-button-kami').addEventListener('click',search_by_kami);
    document.getElementById('input-button-simo').addEventListener('click',search_by_simo);

});

function getdata(){

    //hyakunin.json.jsの変数listを取得する
    prhases_JSON=list;
    console.log(prhases_JSON);

    //JSONファイルをオブジェクト型に変換する
    //※JSONをデータのまま渡すとエラーが出るのでJSON.stringifyで文字化する
    phrases=JSON.parse(JSON.stringify(prhases_JSON));

};

//配列の中から前方一致検索をする（by上の句）
function search_by_kami(){
    
    keyword=document.getElementById('searchword').value;

    //indexOfは何番目にその文字列が見つかったかを表してくれるので、これで前方一致が作れる
    //!==-1とすれば-1(一致しなかった)になったもの以外を表せるので、部分一致が作れる
    foundList=phrases.filter(function(phrase){
        return phrase.kami_kana.indexOf(keyword)==0;
    });

    search();

};

//配列の中から前方一致検索をする（by下の句）
function search_by_simo(){
    
    keyword=document.getElementById('searchword').value;

    //indexOfは何番目にその文字列が見つかったかを表してくれるので、これで前方一致が作れる
    //!==-1とすれば-1(一致しなかった)になったもの以外を表せるので、部分一致が作れる
    foundList=phrases.filter(function(phrase){
        return phrase.simo_kana.indexOf(keyword)==0;
    });

    search();

};

function search(){

    //ulの子要素が存在する限り、それの削除を繰り返す
    while(ul.firstChild){
        ul.removeChild(ul.firstChild);
    };

    li='';

    //結果を表示する
    if (foundList.length>0){

        const list_length=foundList.length;

        //mapメソッドを使いオブジェクト型の配列からデータを取り出す（反復処理）
        foundList.map(function(event){

            //オブジェクト型配列の中から値を取り出し変数に保存
            number=String(event.no);
            kami_phrase=String(event.kami);
            simo_phrase=String(event.simo);
            sakusya_name=String(event.sakusya);
            
            //リストに表示するテキストを作成
            li_element='<li><span style="color:#1d993e">'+number+'番歌：'+sakusya_name+'</span>'+'<br>'+kami_phrase+'<br>'+simo_phrase+'</li>';
            //リストを作成
            li=li+li_element

        });

        ul.innerHTML=li;
        console.log(ul.firstChild);
        document.getElementById('searchresult').textContent=list_length+'句見つかりました';
        
    }else{
        document.getElementById('searchresult').textContent='見つかりませんでした';
    };

};
