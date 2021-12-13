import { useEffect, useState } from "react";
import useScript from "./useScript";
import { formConfig } from "../components/MercadoPago/formConfig.js";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";

const VITE_PUBLIC_KEY_MP = "TEST-0f046780-e30e-443a-b0c8-cc6d4fd9be99";
const VITE_URL_PAYMENT_MP = "http://localhost:3001";

export default function useMercadoPago() {
    const [resultPayment, setResultPayment] = useState(undefined);
    const history = useHistory();
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
                            transaction_amount: amount,
                            token,
                            installments,
                            identificationNumber: identification_number,
                            identificationType: identification_type,
                        } = cardForm.getCardFormData();

                        fetch(`http://localhost:3001/process-payment`,
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
                                    transaction_amount: 1,
                                    description: "Descripción del producto",
                                    payment_method_id,
                                    issuer_id,
                                    email,
                                    amount,
                                    token,
                                    installments: Number(installments),
                                    identification_number,
                                    identification_type,
                                    payer: {
                                        email,
                                        identification: {
                                            type: identification_type,
                                            number: identification_number,
                                        },
                                    },
                                })
                            }
                        )
                            .then((res) => res.json())
                            .then(async (data) => {
                                    setResultPayment(data);
                                    await swal({
                                        title: "¡Pago realizado!",
                                        text: "¡Gracias por comprar con nosotros!",
                                        icon: "success",
                                        button: "Aceptar",
                                    });
                                }
                                ).then(r =>
                                    history.push("/")
                                )
                            .catch((err) => {
                                console.log(err);
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
