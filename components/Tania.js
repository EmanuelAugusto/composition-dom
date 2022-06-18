class TaniaJs {
  use = [];

  data = {};

  rootElement = "";

  use() {}

  bindValue(model, value) {
    if (!model in this.data) {
      throw new Error("key not set in data");
    }
    this.data[model] = value;
  }

  getData() {
    return this.data;
  }

  createData(data) {
    this.data = { ...data };
  }

  NotityView() {
    const elements = document.querySelectorAll("[isReactive]");
    for (const el of elements) {
      const typeElement = el.dataset.typeElement;

      if (["Text"].includes(typeElement)) {
        const binds = el.dataset.binds.split(",");
        const originalContent = el.dataset.textContent;

        let textSanitezed = "";

        for (const iterator of binds) {
          textSanitezed = textSanitezed
            ? textSanitezed.replace(
                `\$\{${iterator}\}`,
                this.data?.[iterator] || ""
              )
            : originalContent.replace(
                `\$\{${iterator}\}`,
                this.data?.[iterator] || ""
              );
        }
        el.textContent = textSanitezed;
      } else if (["Input"].includes(typeElement)) {
        const tModel = el.getAttribute("t-model");
        el.value = this.data[tModel];
      } else {
        throw new Error("Unkhwon element");
      }
    }

    const elementsTshow = document.querySelectorAll("[t-show]");

    for (const el of elementsTshow) {
      el.style.display = el["t-show"](this.data) ? 'initial' : 'none'
    }
  }

  attachBinds() {
    const elements = document.querySelectorAll("[t-model]");
    for (const el of elements) {
      el.addEventListener("input", ({ target }) => {
        const bind = target.getAttribute("t-model");
        this.data[bind] = target.value;
        this.NotityView();
      });
    }
  }

  createApp({ rootElement, el, title }) {
    document.getElementById(rootElement).appendChild(el);
    window.dataForm = this.data;
    this.attachBinds();
    this.NotityView();
  }
}

export default TaniaJs;
