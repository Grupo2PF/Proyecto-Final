/*
const server = require("./src/app.js");

server.listen(3001, () => {
  console.log("Server listening on port 3001");
});
*/
const server = require("./src/app.js")
const express = require("express");
const mercadopago = require("mercadopago");
const cors = require("cors");
const routes = require("./src/routes/index.js");
require("dotenv").config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', routes);

const ACCESS_TOKEN_MP = "TEST-1088004245146207-120323-9ebc270d7c59b0a290e5b2696ee73c4b-819583122"
const PUBLIC_KEY_MP = "TEST-0f046780-e30e-443a-b0c8-cc6d4fd9be99"

app.post("/process-payment", (req, res) => {
  mercadopago.configurations.setAccessToken(ACCESS_TOKEN_MP);
  const payment_data = {
    transaction_amount: req.body.transaction_amount,
    token: req.body.token,
    description: req.body.description,
    installments: Number(req.body.installments),
    payment_method_id: req.body.paymentMethodId,
    issuer_id: req.body.issuer,
    payer: {
      email: req.body.payer.email,
      identification: {
        type: req.body.payer.docType,
        number: req.body.payer.docNumber,
      },
    },
  };
  console.log(payment_data);

  mercadopago.payment
      .save(payment_data)
      .then((response) => {

        return res.status(response.status).json({
          status: response.body.status,
          status_detail: response.body.status_detail,
          id: response.body.id,
        });
      })
      .catch((err) => {
        return res.status(500).send(err);
      });
});

app.listen(port, () => {
  console.log(`App running in http://localhost:${port}`);
});
