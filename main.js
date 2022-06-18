import Tania from "./components/Tania.js";
import {
  Div,
  Text,
  Input,
  Button,
  Form,
  Title,
  HtmlTag,
} from "./components/components.js";
import "./style.css";

const App = new Tania();

App.createData({
  name: "",
  age: 0,
});

const SubmitForm = (evt) => {
  evt.preventDefault();
};

const AppRoot = Div({
  childsArray: [
    Title({ textContent: "Cadastro de Pessoas", heightTitle: 1 }),
    Form({
      onsubmit: SubmitForm,
      childsArray: [
        Div({
          classList: "display-flex display-column",
          childsArray: [
            Input(
              {
                placeholder: "Digite seu nome",
                type: "text",
                classList: "input-border padding-05",
                autofocus: true,
              },
              "name"
            ),
            Input(
              {
                placeholder: "Digite sua idade",
                type: "number",
                classList: "input-border padding-05",
              },
              "age"
            ),
            Input(
              {
                placeholder: "Qual nome da sua família",
                type: "text",
                classList: "input-border padding-05",
              },
              "nameFamily"
            ),
            Button({
              textContent: "enviar",
              type: "submit",
              classList: "button",
              "t-show": (context) => context.age >= 18,
            }),
            Text({
              textContent:
                "Meu nome é ${name} e tenho ${age} e o nome da minha famĺia é ${nameFamily}",
              isReactive: true,
            }),
            Input(
              {
                placeholder: "Digite seu nome",
                type: "text",
                classList: "input-border",
                isReactive: true,
                "t-show": (context) => context.age >= 18,
              },
              "name"
            ),
            Text({
              textContent:
                "Esse é um teste de tag customizada",
            }),
            HtmlTag({
              htmlTag: "ul",
              "t-show": (context) => context.age >= 18,
              childsArray: [HtmlTag({ htmlTag: "li", textContent: "teste" })],
            }),
          ],
        }),
      ],
    }),
  ],
});

App.createApp({ rootElement: "app", el: AppRoot, title: "Tania.js" });
