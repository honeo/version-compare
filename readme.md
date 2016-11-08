# version-compare
* [honeo/version-compare](https://github.com/honeo/version-compare)  
* [@honeo/version-compare](https://www.npmjs.com/package/@honeo/version-compare)

## なにこれ
バージョン比較するやつ。

## 使い方
```sh
$ npm i -S @honeo/version-compare
```
```js
import versionCompare from '@honeo/version-compare';

versionCompare('2.0.0', '>', '1.0.0');
> true

versionCompare('1.0.0', '<=', '2.0.0');
> true

versionCompare('1.2.3.4', '===', '1.2.3');
> false
```
