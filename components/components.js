const expression = /\$\{.*\}/;

export const Div = (props) => {
  const div = document.createElement("div");

  for (const key in props) {
    div[key] = props[key];
  }

  for (const child of props.childsArray) {
    div.appendChild(child);
  }

  if (props["t-show"]) {
    div.setAttribute("t-show", props["t-show"]);
    div.dataset.typeElement = "Input";
  }

  return div;
};
export const Title = (props) => {
  const text = document.createElement(`h${props.heightTitle}`);

  for (const key in props) {
    text[key] = props[key];
  }

  if (props.isReactive) {
    text.setAttribute("isReactive", "");

    if (expression.test(props.textContent)) {
      const results = props.textContent.match(/\$\{.*?\}/g);

      const binds = [];

      for (const key of results) {
        let keyReplacedOne = key.replace(/\$\{/g, "");
        let keyReplacedTwo = keyReplacedOne.replace(/\}/g, "");
        binds.push(keyReplacedTwo);
      }

      text.dataset.textContent = props.textContent;
      text.dataset.binds = binds;
      text.dataset.typeElement = "Text";
    }
  }

  if (props["t-show"]) {
    text.setAttribute("t-show", props["t-show"]);
    text.dataset.typeElement = "Input";
  }

  return text;
};

export const Text = (props) => {
  const text = document.createElement("p");

  for (const key in props) {
    text[key] = props[key];
  }

  if (props.isReactive) {
    text.setAttribute("isReactive", "");

    if (expression.test(props.textContent)) {
      const results = props.textContent.match(/\$\{.*?\}/g);

      const binds = [];

      for (const key of results) {
        let keyReplacedOne = key.replace(/\$\{/g, "");
        let keyReplacedTwo = keyReplacedOne.replace(/\}/g, "");
        binds.push(keyReplacedTwo);
      }

      text.dataset.textContent = props.textContent;
      text.dataset.binds = binds;
      text.dataset.typeElement = "Text";
    }
  }

  if (props["t-show"]) {
    text.setAttribute("t-show", props["t-show"]);
    text.dataset.typeElement = "Input";
  }

  return text;
};

export const Input = (props, bindValue) => {
  const input = document.createElement("input");

  for (const key in props) {
    input[key] = props[key];
  }
  if (bindValue) {
    input.setAttribute("t-model", bindValue);
  }

  if (props.isReactive) {
    input.setAttribute("isReactive", "");
    input.dataset.typeElement = "Input";
  }

  if (props["t-show"]) {
    input.setAttribute("t-show", props["t-show"]);
    input.dataset.typeElement = "Input";
  }

  return input;
};

export const Button = (props) => {
  const button = document.createElement("button");

  for (const key in props) {
    button[key] = props[key];
  }

  if (props["t-show"]) {
    button.setAttribute("t-show", props["t-show"]);
    button.dataset.typeElement = "Input";
  }

  return button;
};

export const Form = (props) => {
  const form = document.createElement("form");

  for (const key in props) {
    form[key] = props[key];
  }

  if (props.childsArray) {
    for (const child of props.childsArray) {
      form.appendChild(child);
    }
  }

  if (props["t-show"]) {
    form.setAttribute("t-show", props["t-show"]);
    form.dataset.typeElement = "Input";
  }

  return form;
};
