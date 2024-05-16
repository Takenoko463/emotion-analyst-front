# Emotion Analyzer
# アプリケーション概要
入力した文章に含まれる感情の割合をグラフで出力します。
# webサイト
[url](https://emotionanalyzer-c2d45.web.app/)
```
https://emotionanalyzer-c2d45.web.app/
```

# 利用方法
文章を入力すると、文章に含まれる感情を円グラフで出力する。

# アプリケーションを作成した背景
既存のapi形式アプリの内容理解を助けるためです。[感情を分析するアプリ](https://github.com/Takenoko463/emotion-analyst-api)を作成したものの、api形式であるためアプリの内容を直感的に理解できません。そこで、ホームページを作成し利便性を容易に理解できるようにしました。

# 工夫したポイント
このアプリではなく、apiを提供しているサーバー側でcorsが必要ないように設定しました。

# 開発環境
- フロントエンド:React,JavaScript
- インフラ:firebase
- テキストエディター:VScode

# Emotion Analyzer Manual
文章をフォームに入力し、実行ボタンを押します。すると、グラフ形式で感情の割合が出力されます。
[![Image from Gyazo](https://i.gyazo.com/c6d49f7641a5a22b7c6cff4d317c3af0.gif)](https://gyazo.com/c6d49f7641a5a22b7c6cff4d317c3af0)