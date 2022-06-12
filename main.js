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
    CreateStore,
} from "./components/components.js";
import "./style.css";

const UiText = {
    age: "",
    primaryText: "Hoje é ${bar} Meu nome é ${foo}, minha idade é: ${age} e minhas comidas favoritas são: ${macarrao} ${camarao}",
};

const obj = CreateStore({
        foo: "",
        bar: new Date().toISOString(),
        age: "",
        macarrao: "",
        camarao: "",
    },
    UiText
);

const onInput = (value) => {
    obj.foo = value.value;
};

const onInputAge = (value) => {
    obj.age = value.value;
};

const onInputFood = (value) => {
    if (value.checked) {
        obj.macarrao = "macarrao";
    } else {
        obj.macarrao = "";
    }
};

const onInputCamarao = (value) => {
    if (value.checked) {
        obj.camarao = "camarao";
    } else {
        obj.camarao = "";
    }
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
                    classList: ["input-border", "margin-bt"],
                    placeholder: "Qual seu nome?",
                    type: "text",
                    reactive: true,
                    bind: "value:foo",
                    onInput: onInput,
                }),
                Input({
                    classList: ["input-border", "margin-bt"],
                    placeholder: "Qual sua idade?",
                    type: "number",
                    reactive: true,
                    bind: "value:age",
                    onInput: onInputAge,
                }),
                Button({
                    classList: ["button", "cursor-pointer", "margin-bt"],
                    textContent: "Enviar",
                    type: "submit",
                }),
            ],
            onSubmit: onSubmit,
            classList: ["margin-bt", "display-column", "display-flex"],
        }),
        Div({
            classList: [
                "bg-red",
                "display-flex",
                "margin-bt",
                "text-white",
                "padding-05",
            ],
            childs: [
                Text({
                    bindUiText: "primaryText",
                    bind: "value:foo|value:bar|value:age|value:macarrao|value:camarao",
                    reactive: true,
                }),
            ],
        }),
        Div({
            childs: [
                Input({
                    classList: ["input-border"],
                    placeholder: "Qual seu nome?",
                    type: "text",
                    reactive: true,
                    bind: "value:foo",
                }),
                Div({
                    childs: [
                        Text({ textContent: "Que comidas você gosta?" }),
                        Checkbox({
                            value: "macarrao",
                            id: "checkOne",
                            reactive: true,
                            bind: "value:macarrao",
                            onClick: onInputFood,
                        }),
                        Label({ labelFor: "checkOne", textContent: "macarrão" }),
                        Checkbox({
                            value: "camarao",
                            id: "checkTwo",
                            reactive: true,
                            bind: "value:camarao",
                            onClick: onInputCamarao,
                        }),
                        Label({ labelFor: "checkTwo", textContent: "Camarão" }),
                    ],
                    classList: ["display-flex", "align-items"],
                }),
            ],
        }),
        Text({
            textContent: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        }),
    ],
});

App(AppComposition, "app", "Minha aplicação", obj, UiText);