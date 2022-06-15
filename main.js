import {
  AppCp,
  Input,
  Div,
  Radio,
  Label,
  Text,
  Form,
  Button,
} from "./components/components.js";
import "./style.css";

const app = AppCp();

const STORE = app.CreateStore({
  foo: "",
  bar: new Date().toISOString(),
  age: "",
  macarrao: "",
  camarao: "",
  todoList: [],
});

const onInputFood = (value) => {
  // if (value.value == "Sim") {
  //   obj.macarrao = "macarrao";
  // } else {
  //   obj.macarrao = "";
  // }
};

const onInputCamarao = (value) => {
  // if (value.checked) {
  //   obj.camarao = "camarao";
  // } else {
  //   obj.camarao = "";
  // }
};

const onSubmit = (evt) => {
  evt.preventDefault();
  STORE.storeProxy.todoList.value.push(STORE.storeProxy.foo)
  console.log(STORE.storeProxy)
  // STORE.setState("todoList", [...STORE.store.todoList, STORE.store.foo]);
  
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
          onInput: (value) => {
            // STORE.setState("foo", value.value);
          },
        }),
        Input({
          classList: ["input-border", "margin-bt"],
          placeholder: "Qual sua idade?",
          type: "number",
          reactive: true,
          bind: "value:age",
          onInput: (value) => {
            STORE.storeProxy.age = value.value
            console.log( STORE.storeProxy)
            // STORE.setState("age", value.value);
          },
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
        "display-column",
      ],
      childs: [
        Text({
          textContent:
            "Hoje é ${bar} Meu nome é ${foo}, $minha idade é: ${age} @Emran e minhas comidas favoritas são: ${macarrao} ${camarao}",
          reactive: true,
        }),
        Text({
          textContent: "Declaro que meu nome é: ${foo}",
          reactive: true,
        }),
        Div({
          childs: [
            Radio({
              value: "Sim",
              id: "sim",
              onClick: onInputFood,
              name: "confirma",
            }),
            Label({ textContent: "Sim", reactive: true, labelFor: "sim" }),
            Radio({
              value: "Não",
              id: "sim",
              onClick: onInputFood,
              name: "confirma",
            }),
            Label({ textContent: "Não", reactive: true, labelFor: "sim" }),
          ],
        }),
        Div({
          childs: STORE.store.todoList.map((tL) =>
            Text({ textContent: `${tL} \${foo}`, reactive: true })
          ),
          reactive: true,
        }),
      ],
    }),
  ],
});

app.CreateApp(AppComposition, "app", "Minha aplicação", STORE.store);
