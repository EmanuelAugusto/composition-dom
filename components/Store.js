import { RequestRenderUI } from "./components.js";
class Store {
  store = {};
  storeProxy = {};

  create(store) {
    const THIS = this;
    var handler = function () {
      return {
        get: function (obj, prop) {
          console.log("got it!");
          if (
            ["[object Object]", "[object Array]"].indexOf(
              Object.prototype.toString.call(obj[prop])
            ) > -1
          ) {
            return new Proxy(obj[prop], handler());
          }
          RequestRenderUI(THIS.store);
          return obj[prop];
        },
        set: function (obj, prop, value) {
          console.log("set it");
          obj[prop] = value;
          RequestRenderUI(THIS.store);
          return true;
        },
      };
    };

    for (const [key, value] of Object.entries(store)) {
      this.storeProxy[key] = new Proxy({ value }, handler());
    }
  }

  setState(key, value) {
    this.store[key] = value;
    const THIS = this;
    var handler = function () {
      return {
        get: function (obj, prop) {
          console.log("got it!");
          if (
            ["[object Object]", "[object Array]"].indexOf(
              Object.prototype.toString.call(obj[prop])
            ) > -1
          ) {
            return new Proxy(obj[prop], handler());
          }
          RequestRenderUI(THIS.store);
          return obj[prop];
        },
        set: function (obj, prop, value) {
          console.log("set it");
          obj[prop] = value;
          RequestRenderUI(THIS.store);
          return true;
        },
      };
    };

    this.storeProxy[key] = new Proxy({ value }, handler());
    console.log(this.storeProxy);
  }
}

export default Store;
