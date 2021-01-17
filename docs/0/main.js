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
        // IME確定キャンセルできない。文字を入力させないようにしたかった。
        event.data = "";
        event.cancelable = true;
        event.preventDefault();
        return true;
    });
});
