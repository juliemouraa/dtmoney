import React from "react";
import ReactDOM from "react-dom";
import { createServer, Model } from "miragejs";
import App from "./App";

createServer({
  models: {
    transaction:
      Model /**nome da entidade que vamos salvar no banco de dados do mirage*/,
  },

  /**criamos essas transactions para que o  banco não fique vazio de início*/
  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: "Freelance de website",
          type: "deposit",
          category: "Dev",
          amount: 6000,
          createdAt: new Date("2021-02-12 09:00:00"),
        },
        {
          id: 2,
          title: "Aluguel",
          type: "withdraw",
          category: "Casa",
          amount: 1100,
          createdAt: new Date("2021-02-05 09:00:00"),
        },
      ],
    });
  },

  routes() {
    this.namespace = "api";

    this.get("/transactions", () => {
      return this.schema.all(
        "transaction"
      ); /**para identificar todas as transacoes que temos no banco de dados */
    });

    /**usamos o request pq ele é os dados que nós queremos e estamos enviando para a transaction  */
    this.post("/transactions", (schema, request) => {
      const data = JSON.parse(
        request.requestBody
      ); /**config do mirage, convertemos o data de texto para um JSON, ai utilizamos o JSON.parse*/

      return schema.create(
        "transaction",
        data
      ); /**transaction é o model que ele esta inserindo, e depois o data que estão vindo pela requisicao */
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
