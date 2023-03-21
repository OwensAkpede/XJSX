XJSX.createModule(
     "if",
     XJSX.KEYWORD,
     {
    onload: function (q) {
      try {
        q = this.global.q = this.eval(q) ? true: false;
      } catch (e) {
        return console.error("if:", q, e);
      }
      if (!q) {
        this.killProcess();
      }
    },
    onprogress: function (q) {
      q = this.global.q;

      if (q) {
        return;
      }
      this.delete();
    },
    callback: function (q) {
      q = this.global.q;
      if (!q) {
        this.remove();
      } else {
        this.global.done = true;
      }
    },
   
  })
  .append(
     "else-if",
     {
      onload: function (_q) {
        _q = _q.trim();
        var q = this.global.q;
        if (q || this.global.done) {
          this.global.q = false;
          this.killProcess();
          return;
        }
        if (this.global.done) {}
        try {
          q = this.global.q = _q && this.eval("(" + _q + ")") ? true: false;
        } catch (e) {
          return console.error("if,else-if", _q, e);
        }
        if (!q) {
          this.killProcess();
        }
      },
      onprogress: function (q) {
        q = this.global.q;
        if (q) {
          return;
        }
        this.delete();
      },
      callback: function (q) {
        q = this.global.q;
        if (!q) {
          this.remove();
        } else {
          this.global.done = true;
        }
      },
    })
  .append(
    "else",
    {
      onload: function (q) {
        if (this.global.done) {
          this.global.q = false;
          this.killProcess();
        } else {
          this.global.q = true;
        }
      },
      onprogress: function (q) {
        q = this.global.q;
        if (q) {
          return;
        }
        this.delete();
      },
      callback: function (q) {
        this.terminate();
        q = this.global.q;
        if (!q) {
          this.remove();
        }
      },
    })
  .end();
