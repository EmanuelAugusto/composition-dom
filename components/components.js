export const App = (app, rootElement, title) => {
    if (title) document.title = title;
    document.getElementById(rootElement).appendChild(app);
};

export const Input = ({ placeholder, type, id, name, onInput }) => {
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

    return input;
};

export const Div = ({ textContent, childs, id }) => {
    const div = document.createElement("div");
    if (id) div.id = id;

    if (textContent) {
        div.textContent = textContent;
    }

    if (childs) {
        for (const child of childs) {
            div.appendChild(child);
        }
    }

    return div;
};

export const Checkbox = ({ value, id, name }) => {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = value;
    if (id) checkbox.id = id;
    if (name) checkbox.name = name;

    return checkbox;
};

export const Radio = ({ value, id, name }) => {
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.value = value;
    if (id) radio.id = id;
    if (name) radio.name = name;

    return radio;
};

export const Label = ({ labelFor, textContent, id }) => {
    const label = document.createElement("label");
    label.for = labelFor;
    label.textContent = textContent;
    if (id) label.id = id;

    return label;
};

export const Text = ({ textContent, id }) => {
    const p = document.createElement("p");

    p.textContent = textContent;
    if (id) p.id = id;

    return p;
};

export const Form = ({ action, method, childs, onSubmit }) => {
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

    return form;
};

export const Button = ({ id, textContent, type, onClick }) => {
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

    return button;
};

export const Dialog = ({ childs, id }) => {
    const dialog = document.createElement("dialog");

    if (!id) throw new Error("provid id to this component");

    dialog.id = id;

    if (childs) {
        for (const child of childs) {
            dialog.appendChild(child);
        }
    }

    return dialog;
};

export const ShowModal = ({ name, state }) => {
    let stateOfModal = state ? "show" : "close";

    document.getElementById(name)[stateOfModal]();
};