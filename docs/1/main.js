window.addEventListener('load', (event) => {
    document.addEventListener('selectionchange', ()=>{
        console.log('selectionchange', document.getSelection().focusOffset);
    });
    document.addEventListener('compositionstart', (event)=>{
        console.log('compositionstart', event);
    });
    document.addEventListener('compositionupdate', (event)=>{
        console.log('compositionupdate', event);
    });
    document.addEventListener('compositionend', (event)=>{
        console.log('compositionend', event);
        // IME入力確定がキャンセルできなかった。Chromium 86 で確認した。
        event.data = "";
        event.cancelable = true;
        event.preventDefault();
        return false;
    });
    document.querySelector("#editor").addEventListener('keydown', (event)=>{
        // IME入力中の処理をキャンセルできなかった。
        // https://qiita.com/saxxos/items/294b209fc6c7ecc07bd6
        if (event.keyCode == 229) {
            console.log('Cancel IME', event);
            event.preventDefault();
            return false;
        }
    });
});
