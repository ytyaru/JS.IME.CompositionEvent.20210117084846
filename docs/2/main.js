window.addEventListener('load', (event) => {
    let SELECTED = null; // contenteditable要素がselectionchangeしたときのRange
    let IME_YOMI = null; // IMEで全字ひらがなのときセットする
    let IS_IME_END = false;
    document.addEventListener('selectionchange', ()=>{
        console.log('selectionchange', document.getSelection());
        if (IS_IME_END) {
            document.getSelection().getRangeAt(0).deleteContents();
            console.log('selectionchange DELETED !!');
        }
        SELECTED = document.getSelection().getRangeAt(0);
    });
    document.addEventListener('compositionstart', (event)=>{
        console.log('compositionstart', event);
    });
    document.addEventListener('compositionupdate', (event)=>{
        console.log('compositionupdate', event);
        const j = new Japanese();
        if (j.isHiragana(event.data)) { IME_YOMI = event.data; }
    });
    document.addEventListener('compositionend', (event)=>{
        console.log('compositionend', event);
        if (SELECTED) {
            const RUBY_TXT = event.data;
            const RT_TXT = IME_YOMI;
            console.log(`RUBY_TXT=${RUBY_TXT}\nRT_TXT=${RT_TXT}`);
    //        const ruby = new Ruby(RUBY_TXT, RT_TXT).Element;

//            const range = window.getSelection().getRangeAt(0);
//            range.insertNode(new Ruby(RUBY_TXT, RT_TXT).Element); // rubyタグ追加

            /*
            const offset_before = document.getSelection().focusOffset;
            const offset_after = document.getSelection().focusOffset;
            console.log(`offset: ${offset_before}..${offset_after}`);
            */
            const START_NODE = document.getSelection().getRangeAt(0).startNode;
            const START_CONTAINER = document.getSelection().getRangeAt(0).startContainer;
            const ANCESTOR_CONTAINER = document.getSelection().getRangeAt(0).commonAncestorContainer;
            console.log('START_NODE', START_NODE);
            console.log('START_CONTAINER ', START_CONTAINER );
            console.log('ANCESTOR_CONTAINER', ANCESTOR_CONTAINER);
            console.log('document.getSelection().getRangeAt(0)', document.getSelection().getRangeAt(0));
            const offset_before = document.getSelection().focusOffset;
//            SELECTED.deleteContents(); // 最初のコンテンツ削除
            SELECTED.insertNode(new Ruby(RUBY_TXT, RT_TXT).Element); // rubyタグ追加
            const offset_after = document.getSelection().focusOffset;
            console.log(`offset=${offset_before},${offset_after}`);

//            document.querySelector('#editor').getSelection().getRangeAt(0).deleteContents();

//            const range = document.querySelector('#editor').getSelection().getRangeAt(0);
            const sel = document.getSelection();
//            const range = sel.getRangeAt(0);
            const range = document.createRange();
            console.log('range', range);
            console.log('startNode', range.startNode);
            console.log('range.parentNode', range.parentNode);
            console.log("document.querySelector('#editor').childNodes[0]", document.querySelector('#editor').childNodes[0]);
//            console.log('range.parentNode.startOffset', range.parentNode.startOffset);
//            range.setStart(document.querySelector('#editor'), offset_before-offset_after);
//            range.setStart(document.querySelector('#editor'), 10);
//            range.setEnd(document.querySelector('#editor'), offset_before);

//            range.setStart(START_NODE, offset_before);
//            range.setEnd(START_NODE, offset_before+offset_after);
            range.setStart(START_CONTAINER, offset_before);
            range.setEnd(START_CONTAINER, offset_before+offset_after);


//            console.log("document.querySelector('#editor').children", document.querySelector('#editor').children);
//            range.setStart(range.startNode, offset_before-offset_after);
//            range.setEnd(range.endNode, offset_before);
//            range.deleteContents(); // 最初のコンテンツ削除
            sel.removeRange(range);
            IS_IME_END = true;

            // 挿入後からRUBY_TXT字数分だけ選択して削除する 


//        event.cancelable = true;
//        event.preventDefault();

            // バグ？　IMEの処理である確定テキスト入力をキャンセルしたい。ふつうはpreventDefault()で可能。だが縦書きCSSを使うと機能しなくなる。バグっぽい。削除するしかない。
            // https://stackoverflow.com/questions/62806395/event-preventdefault-does-not-work-when-i-input-cjkkorean-on-number-type-v-tex 
            event.stopImmediatePropagation();  //cancel next event//
            event.preventDefault();
        }
    });
    /*
    const EDITOR = document.querySelector('#editor');
    EDITOR.addEventListener("input", (event)=>{
//    EDITOR.addEventListener("input", (event)=>{
//    document.addEventListener("input", (event)=>{
//    document.querySelector('#editor').addEventListener("input", (event)=>{
//    window.addEventListener("input", (event)=>{
        console.log("input", e);
    });
    */
    /*
    document.addEventListener('keydown', (event)=>{
//    document.querySelector('#editor').addEventListener('keydown', (event)=>{
        if (event.altKey && event.key == 'r') { // ctrlKey, shiftKey, altKey, metaKey
            const selected = getRubyTarget();
            console.log(selected);
            if (selected && selected.target) {
                const rt_txt = window.prompt(`「${selected.ruby_txt}」のルビは？`, '');
                if ('' == rt_txt) { return; }

                // ruby要素をつくって挿入する
                console.log(selected.ruby_txt);
                console.log(rt_txt);
                const elm = createRubyElement(selected.ruby_txt, rt_txt);
                console.log(elm);
                selected.target.deleteContents(); // 最初のコンテンツ削除
                selected.target.insertNode(elm); // rubyタグ追加

                // 文字列選択を解除する
                var range = document.createRange();
                var sel = window.getSelection();
                range.collapse(true);
                range.setStart(document.querySelector('#editor'), 2); // 第二引数=1なら先頭、2なら末尾
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    });
    // キャレットで選択した範囲を返す
    function getRubyTarget() {
        const target = document.querySelector('#editor');
        const editorRange = document.createRange();
        const editorSel = window.getSelection();
        console.log('editorSel', editorSel);
        console.log('editorSel.text', editorSel.text);
        console.log('editorSel.toString()', editorSel.toString());

        const range = editorSel.getRangeAt(0);
        console.log(range.startContainer);
        console.log(range.startContainer.parentNode);
        console.log(range.startContainer.parentNode.nodeName);
        console.log(range.startContainer.parentNode.id);
        console.log(range.startContainer.parentNode);
        console.log(range.endContainer);
        if ('editor' !== range.startContainer.parentNode.id) { return null; }

        // 選択した文字列、選択した範囲、の２つを返す
        return {ruby_txt: editorSel.toString(), target: range};
    }
    // ruby要素を返す
    function createRubyElement(ruby_txt, rt_txt) {
        const ruby = document.createElement("ruby");
        ruby.textContent = ruby_txt;//"漢字";
        const rt = document.createElement("rt");
        rt.textContent = rt_txt;//"かんじ";
        ruby.appendChild(rt);
        return ruby;
    }
    */
    /*
    document.querySelector('#editor').addEventListener("input",function(){
        console.log("input");
    });
    document.querySelector('#editor').addEventListener('selectionchange', ()=>{
    });
    */
});
