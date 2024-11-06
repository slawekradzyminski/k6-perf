import { Options } from "k6/options";
import { login } from "../http/login";

// konfiguracja testu wydajnościowego
export let options: Options = {
  vus: 1,
  iterations: 1
};

// test funkcjonalny (scenariusz klienta pokrywający najwaniejsze endpointy)
export default () => {
  login();
};