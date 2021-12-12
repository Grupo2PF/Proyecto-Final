import { useEffect, useState } from "react";
import useScript from "./useScript";
import { formConfig } from "../components/MercadoPago/formConfig.js";
import axios from "axios";

const VITE_PUBLIC_KEY_MP = "TEST-0f046780-e30e-443a-b0c8-cc6d4fd9be99";
const VITE_URL_PAYMENT_MP = "http://localhost:3001";

export default function useMercadoPago() {
    const [resultPayment, setResultPayment] = useState(undefined);

    const { MercadoPago } = useScript(
        "https://sdk.mercadopago.com/js/v2",
        "MercadoPago"
    );

    useEffect(() => {
        if (MercadoPago) {
            const mp = new MercadoPago(VITE_PUBLIC_KEY_MP);
            const cardForm = mp.cardForm({
                amount: "100.5",
                autoMount: true,
                form: formConfig,
                callbacks: {
                    onFormMounted: (error) => {
                        if (error)
                            return console.warn(
                                "Form Mounted handling error: ",
                                error
                            );
                    },

                    onSubmit: (event) => {
                        event.preventDefault();

                        const {
                            paymentMethodId: payment_method_id,
                            issuerId: issuer_id,
                            cardholderEmail: email,
                            amount,
                            token,
                            installments,
                            identificationNumber: identification_number,
                            identificationType: identification_type,
                        } = cardForm.getCardFormData();

                        fetch(`${VITE_URL_PAYMENT_MP}/process-payment`,
                            {
                                // entry point backend
                                method: "POST",
                                headers: {
                                    "Access-Control-Allow-Origin": "*",
                                    "Access-Control-Request-Method":
                                        "GET, POST, DELETE, PUT, OPTIONS",
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    token,
                                    issuer_id,
                                    payment_method_id,
                                    transaction_amount: 1,
                                    installments: Number(installments),
                                    description: "Descripción del producto",
                                    payer: {
                                        email,
                                        identification: {
                                            type: identification_type,
                                            number: identification_number,
                                        },
                                    },
                                }),
                            }
                        )
                            .then((res) => res.json())
                            .then((data) => setResultPayment(data))
                            .catch((err) => {
                                setResultPayment(err);
                            });
                    },
                    onFetching: (resource) => {
                        // Animate progress bar
                        const progressBar =
                            document.querySelector(".progress-bar");
                        progressBar.removeAttribute("value");

                        return () => {
                            progressBar.setAttribute("value", "0");
                        };
                    },
                },
            });
        }
    }, [MercadoPago]);

    return resultPayment;
}
