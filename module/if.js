   
  /** if **/
  XJSX.__createModule__([
    {
      keyword: "if",
      type:  "keyword",
      onload: function (q) {
        try {
          !(this.global.q = this.eval("(" + q + ")") ? true : false) &&
            this.killProcess();
        } catch (e) {
          return console.error("if:", q, e + "");
        }
      },
      onprogress: function () {
        !this.global.q && this.delete();
      },
      callback: function () {
        if (this.global.q) {
          this.global.done = true;
        }
        //this.remove();
        //  console.log(this);
      },
    },
    {
      keyword: "else-if",
      onload: function (q) {
        if (this.global.q || this.global.done) {
          this.global.q = false;
          this.killProcess();
          return;
        }
        try {
          !(this.global.q = this.eval("(" + q + ")") ? true : false) &&
            this.killProcess();
        } catch (e) {
          return console.error("if,else-if", q, e + "");
        }
      },
      onprogress: function () {
        !this.global.q && this.delete();
      },
      callback: function () {
        if (this.global.q) {
          this.global.done = true;
        }
      },
    },
    {
      keyword: "else",
      onload: function () {
        if (this.global.done) {
          this.global.q = false;
          this.killProcess();
        } else {
          this.global.q = true;
        }
      },
      onprogress: function () {
        !this.global.q && this.delete();
      },
      callback: function () {
        this.terminate();
        // !this.global.q && this.remove();
      },
    },
  ]);
