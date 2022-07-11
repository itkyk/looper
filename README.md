# Looper

## Install
```aidl
$ npm i @itkyk/looper
```

## How to Use
### JavaScript
```app.js
import LoopContents from "@itkyk/looper";

const looperOptions = {
    // Option //
}
const target = document.querySelector("js-looper");
const looper = new LoopContents(target, looperOptions);
```

### HTML
```
<div class="js-looper">
    <div class="js-loop-contents">
        // Contents //
    </div>
</div> 
```

### CSS
```app.css
.js-looper {
    display:flex;
}
.js-loop-contents {
    flex-shank: 0;
}
```

## Options
| option | default | description | type |
|--------|---------|-------------|------|
| childName | .js-loop-contents | 複製するchildNodeのクラス名を指定します。 | string |
| direction　| left | 進む方向を指定します。 | string(right/left) |
| fps | 60 | フレームレートを指定できます。| number(integer) |
| speed | 1.2 | 移動するスピードを調整します。 | number(float/integer) |
| clone | 1 | childNodeの複製回数を指定します。 | number(integer) |