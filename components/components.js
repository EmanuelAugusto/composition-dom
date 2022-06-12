export const App = (app, rootElement, title, data, UiText) => {
    if (title) document.title = title;

    document.getElementById(rootElement).appendChild(app);
    RequestRenderUI(data, UiText);
};

export const RequestRenderUI = (data, UiText) => {
    const elments = document.querySelectorAll("[reactive]");

    for (const el of elments) {
        const attrVal = el.getAttribute("bind");
        const uiText = el.getAttribute("uiText");

        if (["input"].includes(el.tagName.toLocaleLowerCase())) {
            const [directive, bindVar] = attrVal.split(":");

            el.value = data[bindVar];
        } else {
            const valueSplited = attrVal.split("|");

            let text = "";

            for (const binds of valueSplited) {
                const [directive, bindVar] = binds.split(":");

                if (text) {
                    text = text.replaceAll("${" + bindVar + "}", data[bindVar]);
                } else {
                    text = UiText[uiText].replaceAll("${" + bindVar + "}", data[bindVar]);
                }
            }

            el.textContent = text;
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
    }

    if (bind) input.setAttribute("bind", bind);

    if (bindUiText) p.setAttribute("uiText", bindUiText);

    return input;
};

export const Div = ({ textContent, childs, id, classList }) => {
    const div = document.createElement("div");
    if (id) div.id = id;

    if (textContent) {
        div.textContent = textContent;
    }

    if (classList) {
        for (const className of classList) {
            div.classList.add(className);
        }
    }

    if (childs) {
        for (const child of childs) {
            div.appendChild(child);
        }
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

export const Radio = ({ value, id, name, classList }) => {
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

    return radio;
};

export const Label = ({ labelFor, textContent, id, classList }) => {
    const label = document.createElement("label");
    label.for = labelFor;
    label.textContent = textContent;
    if (id) label.id = id;

    if (classList) {
        for (const className of classList) {
            label.classList.add(className);
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

    if (reactive) p.setAttribute("reactive", "");
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

export const CreateStore = (obj, UiText) => {
    return new Proxy(obj, {
        get(target, property) {
            return target[property];
        },
        set(target, property, value) {
            target[property] = value;
            RequestRenderUI(obj, UiText);
            return true;
        },
    });
};