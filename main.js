import {
    App,
    Input,
    Div,
    Checkbox,
    Radio,
    Label,
    Text,
    Form,
    Button,
    Dialog,
    ShowModal,
} from "./components/components.js";

let variableWithName = "Ola mundo";

const onInput = (value) => {
    variableWithName = value.value;
    document.getElementById("textInput").textContent = value.value;
};

let stateModal = false;

const onClick = () => {
    stateModal = !stateModal;
    ShowModal({ name: "modalOne", state: stateModal });
};

const onSubmit = (evt) => {
    evt.preventDefault();
};

const AppComposition = Div({
    childs: [
        Text({ textContent: "Este é um teste composition dom" }),
        Form({
            childs: [
                Input({
                    placeholder: "Qual seu nome?",
                    type: "text",
                    onInput: onInput,
                }),
                Button({ textContent: "teste", type: "submit" }),
            ],
            onSubmit: onSubmit,
        }),
        Button({ textContent: "Abrir modal", onClick: onClick }),
        Input({ placeholder: "Qual seu nome?", type: "text" }),
        Input({ placeholder: "Qual sua idada?", type: "text" }),
        Div({
            childs: [
                Dialog({
                    id: "modalOne",
                    childs: [Input({ placeholder: "Qual seu nome?", type: "text" })],
                }),
                Text({ textContent: variableWithName, id: "textInput" }),
                Label({ labelFor: "teste1", textContent: "Você é maior de idade?" }),
                Checkbox({ value: "teste", id: "teste1" }),
                Text({ textContent: "Você concorda com os termos?" }),
                Label({ labelFor: "teste2", textContent: "Sim" }),
                Radio({ value: "teste2", id: "teste2" }),
                Label({ labelFor: "teste3", textContent: "Não" }),
                Radio({ value: "teste3", id: "teste2" }),
            ],
        }),
    ],
});

App(AppComposition, "app", "Minha aplicação");