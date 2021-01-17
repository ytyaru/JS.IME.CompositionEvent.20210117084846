# 範囲選択

　任意の範囲選択ができない。

## 範囲選択

* https://developer.mozilla.org/en-US/docs/Web/API/Range/setStart

　以下の仕様であることが難しい原因である。

* テキストノードのとき：文字数で範囲を指定する
* エレメントノードのとき：子要素のインデックス位置を指定する

　HTMLの内容が以下の２パターンある。条件分けして位置指定せねばならない。

* テキストノードのみ
* エレメントノード混在

　めんどうすぎる。やめよう。

## 情報源

```javascript
document.selection().getRangeAt(0)
document.selection().createRange()
```

[]:
[]:


