//'use strict';   //厳格モード　宣言後の記述ミスをエラーとして表示してくれる機能を呼び出す

const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定したHTML要素の子要素をすべて削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

userNameInput.onkeydown = (event) => {
    if (event.key == 'Enter') {
        assessmentButton.onclick();
    }
}
assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length == 0) {
        return;
    }

    //結果表示エリア
    removeAllChildren(resultDivided);
    /*
    while (resultDivided.firstChild) {  //  .firstChild →　先頭の子要素を取得
        resultDivided.removeChild(resultDivided.firstChild);
    }
    */

    const header = document.createElement('h3');
    // createElement('タグ名')→JavaScriptからhtmlタグを作成
    header.innerText = '診断結果';
    resultDivided.appendChild(header);     // .appendChild(追加要素)→子要素を追加

    const result = assessment(userName);

    const paragraph = document.createElement('p');
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);


    //tweetエリア
    removeAllChildren(tweetDivided);

    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
         + encodeURIComponent('あなたのいいところ') + '&ref_src=twsrc%5Etfw';
    
    anchor.setAttribute('href', hrefValue);     // setAttribute('属性名', 値)
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ'

    tweetDivided.appendChild(anchor);
   
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
    // htmlにscriptタグを残して、こっちにtwttr.widgets.load(); でも可
   
}



const answers = [   // const→定数　上書き不可
'{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
'{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
'{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
'{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
'{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
'{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
'{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
'{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
'{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
'{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
'{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
'{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
'{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
'{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
'{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
'{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
];

/**　← *2つは関数の説明（慣習）
 * 名前の文字列を渡すと診断結果を返す
 * @param {String} userName ユーザー名
 * @return {String} 診断結果
 */
function assessment(userName) {
    let sumOfCharCode = 0;
    //　全文字のコード番号を取得してそれを足し合わせる
    for (let i = 0; i < userName.length; i++) {
        sumOfCharCode += userName.charCodeAt(i);
    }
    let index = sumOfCharCode % answers.length;
    let result = answers[index];
    result = result.replace(/\{userName\}/g, userName);
    return result;
}

console.assert(
    assessment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);

console.assert(
    assessment('太郎') == assessment('太郎'), 
    '同じ名前なら同じ診断結果を出力する処理が正しくありません。'
);
