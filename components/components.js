import * as uuid from "uuid";
import Store from "./Store.js";

const ElementsBind = {};

const expression = /\$\{.*\}/;

export const AppCp = () => {
  return {
    CreateStore,
    CreateApp,
  };
};

export const CreateApp = (app, rootElement, title, data) => {
  if (title) document.title = title;

  document.getElementById(rootElement).appendChild(app);

  RequestRenderUI(data);
};

export const CreateStore = (baseStore) => {
  const store = new Store();
  store.store = { ...baseStore };
  store.create({ ...baseStore });

  return store;
};

export const RequestRenderUI = (data) => {
  for (const key in ElementsBind) {
    try {
      if (ElementsBind[key].isText) {
        let textSanitezed = "";
        const element = document.querySelector('[data-cp="' + key + '"]');
        for (const iterator of ElementsBind[key].bindsValues) {
          textSanitezed = textSanitezed
            ? textSanitezed.replace(`\$\{${iterator}\}`, data[iterator])
            : ElementsBind[key].originalContent.replace(
                `\$\{${iterator}\}`,
                data[iterator]
              );
        }
        element.textContent = textSanitezed;
      } else {
        const elementsFn = ElementsBind[key].childrensAlreadyRendered(data);
        
        const item = document.querySelector('[data-cp="' + key + '"]')

        for (const [keyChild, child] of elementsFn.entries()) {
          if(!item.children[keyChild]){
              item.appendChild(child)      
          }else{
            // item.removeChild(item.children[keyChild])
            item.children[keyChild].replaceChildren(child)
            
          }
    
        }
      }
    } catch (error) {
      console.warn(ElementsBind[key]);
    }
  }
};

export const Input = ({
  placeholder,
  type,
  id,
  name,
  onInput,
  classList,
  reactive,
  bind,
  bindUiText,
}) => {
  const input = document.createElement("input");
  input.type = type;
  if (id) input.id = id;
  if (name) input.name = name;

  if (placeholder) {
    input.placeholder = placeholder;
  }

  if (onInput) {
    input.oninput = () => {
      onInput(input);
    };
  }

  if (classList) {
    for (const className of classList) {
      input.classList.add(className);
    }
  }

  if (reactive) {
    input.setAttribute("reactive", "");
    input.setAttribute("data-cp", uuid.v4());
  }

  if (bind) input.setAttribute("bind", bind);

  if (bindUiText) p.setAttribute("uiText", bindUiText);

  return input;
};

export const Div = ({
  textContent,
  childs,
  id,
  classList,
  reactive,
  childReactive,
  state
}) => {
  const div = document.createElement("div");
  if (id) div.id = id;
  const uuidD = uuid.v4();
  if (textContent) {
    div.textContent = textContent;
  }

  if (classList) {
    for (const className of classList) {
      div.classList.add(className);
    }
  }

  let childsRendered = [];

  if (childs) {
    if (!childReactive) {
      for (const [key, child] of childs.entries()) {
        child.setAttribute("key-cp", `${uuidD}-${key}`);
        div.appendChild(child);
        childsRendered.push(child.getAttribute("data-cp"));
      }
    } else {
      const elChilds = childs(state);
      for (const [key, child] of elChilds.entries()) {
        child.setAttribute("key-cp", `${uuidD}-${key}`);
        div.appendChild(child);
        childsRendered.push(child.getAttribute("data-cp"));
      }
    }
  }

  if (reactive) {
    div.setAttribute("data-cp", uuidD);

    ElementsBind[uuidD] = {
      originalContent: null,
      bindsValues: [],
      childrensAlreadyRendered: childs,
      isTextContentNull: true,
      isText: false,
    };
  }

  return div;
};

export const Checkbox = ({
  value,
  id,
  name,
  classList,
  onClick,
  reactive,
  bind,
  bindUiText,
}) => {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  checkbox.value = value;

  if (id) checkbox.id = id;
  if (name) checkbox.name = name;

  if (onClick) {
    checkbox.onclick = () => {
      onClick(checkbox);
    };
  }

  if (classList) {
    for (const className of classList) {
      checkbox.classList.add(className);
    }
  }

  if (reactive) {
    checkbox.setAttribute("reactive", "");
  }

  if (bind) checkbox.setAttribute("bind", bind);

  if (bindUiText) checkbox.setAttribute("uiText", bindUiText);

  return checkbox;
};

export const Radio = ({ value, id, name, classList, onClick }) => {
  const radio = document.createElement("input");
  radio.type = "radio";
  radio.value = value;
  if (id) radio.id = id;
  if (name) radio.name = name;

  if (classList) {
    for (const className of classList) {
      radio.classList.add(className);
    }
  }

  if (onClick) {
    radio.onclick = (evt) => {
      onClick(radio, evt);
    };
  }

  return radio;
};

export const Label = ({ labelFor, textContent, id, classList, reactive }) => {
  const label = document.createElement("label");
  label.for = labelFor;
  label.textContent = textContent;
  if (id) label.id = id;

  if (classList) {
    for (const className of classList) {
      label.classList.add(className);
    }
  }

  if (reactive) {
    if (expression.test(textContent)) {
      const uuidL = uuid.v4();

      const results = textContent.match(/\$\{.*?\}/g);

      const binds = [];

      for (const key of results) {
        let keyReplacedOne = key.replace(/\$\{/g, "");
        let keyReplacedTwo = keyReplacedOne.replace(/\}/g, "");
        binds.push(keyReplacedTwo);
      }

      ElementsBind[uuidL] = {
        originalContent: textContent,
        bindsValues: [...binds],
        isText: true,
      };
      label.setAttribute("data-cp", uuidL);
    }
  }

  return label;
};

export const Text = ({
  textContent,
  id,
  classList,
  bind,
  bindUiText,
  reactive,
}) => {
  const p = document.createElement("p");
  if (textContent) p.textContent = textContent;
  if (id) p.id = id;

  if (classList) {
    for (const className of classList) {
      p.classList.add(className);
    }
  }

  if (reactive) {
    if (expression.test(textContent)) {
      const uuidP = uuid.v4();

      const results = textContent.match(/\$\{.*?\}/g);

      const binds = [];

      for (const key of results) {
        let keyReplacedOne = key.replace(/\$\{/g, "");
        let keyReplacedTwo = keyReplacedOne.replace(/\}/g, "");
        binds.push(keyReplacedTwo);
      }

      ElementsBind[uuidP] = {
        originalContent: textContent,
        bindsValues: [...binds],
        isText: true,
      };
      p.setAttribute("data-cp", uuidP);
    }
  }

  if (bind) p.setAttribute("bind", bind);
  if (bindUiText) p.setAttribute("uiText", bindUiText);

  return p;
};

export const Form = ({ action, method, childs, onSubmit, classList }) => {
  const form = document.createElement("form");
  if (action) form.action = action;

  if (method) form.method = method;

  if (onSubmit)
    form.onsubmit = (evt) => {
      onSubmit(evt);
    };

  if (childs) {
    for (const child of childs) {
      form.appendChild(child);
    }
  }

  if (classList) {
    for (const className of classList) {
      form.classList.add(className);
    }
  }

  return form;
};

export const Button = ({
  id,
  textContent,
  type,
  onClick,
  classList,
  bind,
  bindUiText,
}) => {
  const button = document.createElement("button");
  button.textContent = textContent;
  if (id) p.id = id;

  if (type) {
    button.type = type;
  }

  if (onClick) {
    button.onclick = () => {
      onClick(button);
    };
  }

  if (classList) {
    for (const className of classList) {
      button.classList.add(className);
    }
  }

  return button;
};

export const Dialog = ({ childs, id, classList }) => {
  const dialog = document.createElement("dialog");

  if (!id) throw new Error("provid id to this component");

  dialog.id = id;

  if (childs) {
    for (const child of childs) {
      dialog.appendChild(child);
    }
  }

  if (classList) {
    for (const className of classList) {
      dialog.classList.add(className);
    }
  }

  return dialog;
};

export const ShowModal = ({ name, state }) => {
  let stateOfModal = state ? "show" : "close";

  document.getElementById(name)[stateOfModal]();
};

export const WatchValue = (obj) => {
  let value = obj.foo;

  obj.registerNewListener((val) => {
    value = val;
  });

  return value;
};
