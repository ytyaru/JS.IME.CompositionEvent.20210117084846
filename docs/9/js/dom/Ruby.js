class Ruby {
    constructor(ruby, rt) {
        this.ruby = ruby;
        this.rt = rt;
    }
    get Element() { return this.#create(); }
    #create(ruby_txt=null, rt_txt=null) {
        if (this.ruby && this.rt) {
            const ruby = document.createElement("ruby");
            ruby.textContent = ruby_txt || this.ruby; //"漢字"
            const rt = document.createElement("rt");
            rt.textContent = rt_txt || this.rt; //"かんじ"
            ruby.appendChild(rt);
            return ruby;
        } else { return null; }
    }
}
