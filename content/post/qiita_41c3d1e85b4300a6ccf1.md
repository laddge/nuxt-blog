---
title: 高校のクラスマッチの特設サイトを作った話
category: Qiita
tags:
  - Web
  - Python
  - 高校生
---

<note color="info">

オリジナルはこちら
https://qiita.com/laddge/items/41c3d1e85b4300a6ccf1

</note>

## はじめに
こんにちは、Laddgeです。今回は、9/28(水), 29(木)に自分の高校で行われたクラスマッチで、校内向けの特設サイトを作りました。

↓サンプル

<embed-link href="https://laddge.github.io/classmatch_site/"></embed-link>

<note color="danger">

本記事の内容は、学校に非公式で公開しているものです。
本記事に関する問い合わせを学校へ行う行為は**慎んでいただくようお願いいたします**。

</note>

<note color="warning">

一応ソースコードは[GitHub](https://github.com/laddge/classmatch_site)に上げてありますが、急いで作ってたのもあり、「動けばいいや〜」って感じでゴチャゴチャしてるので、この記事では細かいコードの説明はあまりせずに、おおまかなアイデア的なのを載せられたらと思います。
質問があれば、遠慮なくコメントか、TwitterのDMできいてください。

</note>

<embed-link href="https://github.com/laddge/classmatch_site"></embed-link>

## 動機
うちの高校では、春季、秋季のクラスマッチをそれぞれ6月と9月に行います。
(それぞれを「春クラ」、「秋クラ」と呼んでます。)

今回作るのは秋クラのサイトです。

僕は生徒会の情報という部署に属していて、春クラのときには、コロナ対策で観客が入れない室内競技を、生徒会の機材を使い、YouTubeライブで配信したりしていました。

ですが、クラスマッチは2日間の日程で行われるので、最低1回はYouTubeのリンクが変わってしまいます。

(実際には途中でトラブって落ちたりして何回か変わりました。)

そういったときに、いちいち全校にリンクを配るのは大変です。

そこで、YouTubeのリンクをまとめたサイトを作り、そのサイトを介してYouTubeを見れるようにしていました。

実際に作ったサイトが以下の感じです。

![Screenshot_20221004-111916.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/637875/ebdea7b2-2a1a-6b25-f9df-a0c5a5179df3.png)

一晩で作ったのでだいぶ雑です。

それでもちゃんと機能していました。

秋クラではこれを発展させたものを作ろうと思い、開発を行いました。

## 構想
まず、今回のサイトの要件を以下のように設定しました。

- 春クラのときの機能は継承する
- ライブ配信のリンクは外部に漏れるとまずいので、サイト自体も何らかの方法で限定公開にする
- 新機能として、クラスマッチのトーナメント表を結果込みで表示できるようにする
- 編集機能をつける

### 限定公開にする
今回のサイトは外部に漏れると大変まずいので、本来はbasic認証をつけるべきです。

春クラのときはbasic認証をつけていました。

ただ、basic認証をかけることにはいくつか問題があります。

#### LINEの内部ブラウザで開けない

LINEの内部ブラウザはbasic認証に対応していません。

体育委員を通してリンクを送ったりするのも多分LINEがメインなので、LINEで開けないのは困ります。

春クラのときは、ユーザーエージェントでLINEの内部ブラウザを判定して、LINEの内部ブラウザで開かれているときのみ、外部ブラウザで開くようにリダイレクトしていました。

でもこれは結構無理やりな方法で、リダイレクトのために内部ブラウザのときはbasic認証がかからないようにしていました。

こういうやり方はなんとなく嫌です。

#### リンクと共にユーザー名とパスワードも送らないといけない

人にシェアするときに、リンクとユーザー名とパスワードの3点セットを送る必要があります。

送られた側は、リンクからサイトに飛んで、さらにユーザー名とパスワードを入力しなければいけません。

各HRにサイトのQRコードも掲示しますが、それも読み取ったあとに入力が必要です。

これはなんとなくサイトを開くのが面倒だと思われてしまうんじゃないでしょうか？

(まあ一応、ユーザー名とパスワードをURLに含むやり方もありますが、あれは俺が好きじゃない)

そもそも、パスワードを平文でLINEで送るとか、教室に貼られたQRコードの下にパスワードが書かれてるとか、もう安全なのかよくわからなくなりますよね(なりますよね？？)

#### 今回のやり方
そこで今回は、basic認証はかけずに、サブドメインを十分な長さのランダム文字列にすることで、URLを知ってる人しか開けない、Googleがよくやる限定公開のサイトみたいなやり方にしようと思います。

![Untitled135_20221004120718.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/637875/2a82353f-2ebb-8914-c2b0-1518852bacfa.png)

32文字もあれば十分でしょう。

uuid生成サイトを使ってお手軽に生成しました。

### トーナメント表示
今回の新機能にして目玉のトーナメント表示です。

後でちゃんと説明しますが、こんな感じになります。

![Screenshot_20221004-121705.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/637875/49c567da-6fa9-d75b-1c90-9a96b0d4765b.png)

画像は使わずに全部htmlとcssで再現します。

試合結果は、クラスマッチの本部にいる体育委員に入力してもらいます。

各試合の審判が試合結果を本部に報告に来るので、そのタイミングで入れてもらいます。

### 編集機能

春クラのときのサイトは、YouTubeのリンクをテキストファイルに書いておいて、変更したら生成スクリプトでhtmlを生成するという感じで運用していました。

編集は僕がsshでサーバーに繋いでvimで編集という感じだったので、実質僕にしか編集できない状態でした。

今回は上記の通り、体育委員が結果を入力できるようにする必要があるので、ブラウザ上で編集する機能が求められます。

## 実装
いざいざ、実装していきます。

<note color="warning">

一応ソースコードは[GitHub](https://github.com/laddge/classmatch_site)に上げてありますが、急いで作ってたのもあり、「動けばいいや〜」って感じでゴチャゴチャしてるので、この記事では細かいコードの説明はあまりせずに、おおまかなアイデア的なのを載せられたらと思います。
質問があれば、遠慮なくコメントか、TwitterのDMできいてください。

</note>

<embed-link href="https://github.com/laddge/classmatch_site"></embed-link>

### 環境構築
サーバー用に、AWS(Amazon Web Service)のEC2を使いました。

これは、WindowsやLinuxのOSを動かせる仮想マシンで、制限はありますが、12ヶ月の無料枠が用意されています。

校内向けの小規模なサイトなら、無料枠のリソースで十分でしょう。

僕はUbuntu Serverをインストールして使っています。

![Screenshot_20221004-123941.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/637875/6bca6383-36c1-1f2c-7e95-c37fc975607e.png)

トーナメント表の生成にPythonを使いたいので、サーバーソフトウェアはApacheを選びました。

```
sudo apt install apache2
```

Apacheのバージョンは2.4.41でした。

Apacheの基本設定については割愛します。

ApacheでPythonを動かすために、`mod_wsgi`を導入します。

```
sudo apt install libapache2-mod-wsgi-py3
```

`/etc/apache2/mods-available/wsgi.conf`の`<IfModule>~</IfModule>`内の最後に、以下を追記します。

```wsgi.conf
    ...
    # ここから
    <FilesMatch \.py$>
        SetHandler wsgi-script
        Options +ExecCGI
    </FilesMatch>
    # ここまで
</IfModule>
```

保存したら、Apacheを再起動します。

```
sudo systemctl restart apache2
```

これで、拡張子が.pyのファイルをwsgiのスクリプトとして認識するようになります。

また、今回はランダム文字列のサブドメインを使って、デフォルトのサーバールートとは別の独立したサイトを建てたいので、ApacheのVirtual Hostという機能を使います。

これにより、ホスト名ごとに別のサーバールートを設定できます。

(Virtual Hostについての詳しい説明は割愛します。)

まずは、`/etc/apache2/sites-available`内のファイルがデフォルトで以下のようになっていたので、

```
/etc/apache2/sites-available
├── 000-default.conf
└── default-ssl.conf
```

優先順位を明確にするため、`default-ssl.conf`を`000-default-ssl.conf`にリネームします。

```
sudo a2dissite default-ssl
sudo mv /etc/apache2/sites-available/default-ssl.conf /etc/apache2/sites-available/000-default-ssl.conf
sudo a2ensite 000-default-ssl
sudo systemctl restart apache2
```

次に、クラスマッチのサイト用の設定を書きます。

`/etc/apache2/sites-available/100-classmatch.conf`を以下の内容で作成します。

```100-classmatch.conf
<VirtualHost *:443>
    ServerName {ランダム文字列}.laddge.net
    DocumentRoot /var/www/classmatch
    SSLEngine on
    SSLCertificateFile  /etc/ssl/certs/ssl-cert-snakeoil.pem  # 注
    SSLCertificateKeyFile /etc/ssl/private/ssl-cert-snakeoil.key  # 注
    SetEnv EDIT_KEY {編集画面用のランダム文字列}
    <Directory /var/www/classmatch>
        <Files ~ ".+">
            deny from all
        </Files>
        <Files ~ "^(index\.html|edit\.py|.*\.css)$">
            allow from all
        </Files>
    </Directory>
</VirtualHost>
```

ServerNameのところのランダム文字列は、サブドメインに使うやつを入れます。

編集画面用のランダム文字列というのは、編集画面を誰でも見れる状態を回避するために追加でクエリパラメータにくっつけて擬似的に認証します。

注がついているところは、`000-default-ssl.conf`からパクってきてます。

僕はCloudflareで無理やりHTTPSにしてるので、有効な証明書じゃなくても大丈夫でした。

denyとかallowとか書いてるのは、htmlやcssとかの必要なファイルだけを見える状態にするように制限しています。

設定を書いたら有効化します。

```
sudo a2enmod 100-classmatch
sudo systemctl restart apache2
```

また、Pythonでhtmlを生成する際に、テンプレートエンジンとしてJinja2を使いました。

```
sudo pip install jinja2
```

### トーナメント表を実装
トーナメント表は、体育委員会が作ったものをhtmlとcssで再現します。

体育委員会が作成したトーナメントは以下の感じです。

![1664862886641.jpg](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/637875/f99143d2-e14f-c45c-2763-020d3146d13d.jpeg)

Excelで作ってるのでしょう、よく見るとだんだん縦横の格子が見えてきます。

つまり、空のdiv要素を用意して、

- x, y の座標
- 中のテキスト
- 上の枠線
- 左の枠線

を設定すれば、一つ一つのセルを再現できそうです。

親要素に`position: relative;`、子要素に`position: absolute;`を設定すると相対的に場所を決められるので、座標で管理できるようになります。

```html
<div style="potision: relative;">
    <div style="height: 1em; width: 12.5%; position: absolute; top: 3em; left: 25%; border-top: 1px solid #000;"></div>
    ...
</div>
```

イメージとしては上の感じです。

(実際にはもっと細かくスタイルつけたりしています。)

あとは、それに合わせてデータを作ります。

それぞれのセルは、例えば以下のように表せます。

```
"36_2": {
    "border_top": 1,
    "border_left": 1
}
```

これは、36行目の2列目のセルに上の枠線と左の枠線をつける、という意味です。

これを延々と書きます。

非効率ですが他に思いつきませんでした。

あとは、各試合の結果が入力されたときの挙動も必要です。

が、説明が大変なので実際のデータを見てください。

<embed-link href="https://github.com/laddge/classmatch_site/blob/master/res/tournaments_base.json"></embed-link>

15000行近くあります。

これを手入力したのは狂気のSATAです。

### メイン画面の作成
![Screenshot_20221004-153824.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/637875/30f37500-3232-e839-66c0-fb9566e53557.png)

メイン画面は、たくさんの人が閲覧することが想定されるため、編集時に生成したhtmlを静的に配信するようにしました。

メイン画面については、サンプルを用意しました。

<embed-link href="https://laddge.github.io/classmatch_site/"></embed-link>

ぜひ触ってみてください。

### 編集画面の作成
試合結果の編集画面は、以下のように簡単にいじれるようにしました。

![Screenshot_20221004-160030~2.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/637875/4f82f13f-34bc-07e0-84ef-a948b8152033.png)
![Screenshot_20221004-160035~2.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/637875/aa5e63d2-dad5-7661-86d1-752eb7cc3280.png)

これなら、体育委員でも編集できるでしょう。

JavaScriptで入力値の数字判定などをしています。

YouTubeライブの埋め込み動画のリンクも、同じように編集画面を用意しました。

![Screenshot_20221004-160335.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/637875/53156c16-44f8-49aa-64a1-2188f899d58e.png)

### 追加機能
開発してる中で、色々足した機能があります。

#### フィードバック機能
データ入力の特性上、膨大なデータの中に間違いがあるかもしれなかったので、サイトを見た人たちが間違いや不具合を報告できる仕組みを作りました。

まず、Googleフォームで以下のようなフォームを作りました。
![Screenshot_20221004-173258.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/637875/cce9ad05-de32-39e4-87b8-f131c142f178.png)

そして、フォームに回答があったときに運営がすぐに気づけるように、回答内容をLINE Notifyで通知するようにしました。

<embed-link href="https://notify-bot.line.me/ja/"></embed-link>

スクリプトエディタを開いて適当にGASを書きます。

```js
function onFormSubmitted(e) {
  var content = e.response.getItemResponses()[0].getResponse();
  var url = 'https://notify-api.line.me/api/notify';
  var opt = {
    'method': 'POST',
    'payload': {'message': content},
    'headers': {'Authorization': 'Bearer {LINE Notifyのアクセストークン}'}
  };
  UrlFetchApp.fetch(url, opt);
}
```

あとは、トリガーの設定をします。
![Screenshot_20221004-180331.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/637875/b01e71cf-f360-058d-60e3-2f5e71159a7d.png)

実際に問い合わせが何件かありました。

![1664874302728.jpg](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/637875/36c68025-d5c6-338c-ce25-92aa1ade656e.jpeg)

この機能は体育委員会側も助かってたみたいです。

#### ダークモードに対応
必要か分からなかったけど、一応ダークモードに対応させました。

cssをライトテーマ用とダークテーマ用で分けて、それをメディアクエリとJavaScriptで振り分ける感じです。

好きな方を選べるようにスイッチも設置しました。

SessionStorageに保持して、リロードしても維持されるようにしました。

#### トーナメント表の得点表示を切り替えられるようにした
トーナメント表に常に得点を表示しているとゴチャゴチャして見づらいので、表示/非表示を切り替えるチェックボックスをつけました。

## 結果
実際に運用してみて、自分でもびっくりするくらいうまく動きました。

Google Analyticsを設置して計測していましたが、初日は775人ほどの人が見てくれました。

うちの高校は生徒が840人前後なので、先生方を含めたとしても、9割近くの人が見てくれたということになります。

正直こんなに見てもらえると思っていませんでした。

また、僕のことを知ってる人たちには、見やすいなどの感想を言ってくれる人もいました。

さらに、当日欠席していた友達からは、クラスマッチの様子をしれてよかったと言われました。

全体的に大成功で、やってよかったです。

## 反省
反省点としては、

- データの構造が複雑でミスが多い
- ↑によって、引き継ぎがしづらい
- 無駄が多い
- デザインが適当

などが挙げられます。

次の代の人たちにはよりよいものを作ってほしいです。

## 最後に
長くなってしまいすみません。

ここまで読んでいただきありがとうございました。

僕はこれから受験でしばらくこういうこともできませんが、高校卒業してからも色々作っていこうと思います。

