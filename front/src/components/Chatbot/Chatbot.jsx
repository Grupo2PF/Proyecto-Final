import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import styles from "./chatbot.module.scss"
import {useState} from "react";
import { BiMessageRoundedDetail } from "react-icons/bi";
import botImg from "../../assets/chatBot/chat_bot.jpg";

export default function Chat() {

  const [visibility, setVisibility] = useState(false);

  const handleClick = () => {
    setVisibility(!visibility);
  }

  const theme = {
    background: "#f5f8fb",
    headerBgColor: "#3884FE",
    headerzindex:"9999",
    headerFontColor: "#fff",
    headerFontSize: "15px",
    botBubbleColor: "#3884FE",
    botFontColor: "#fff",
    userBubbleColor: "#fff",
    userFontColor: "#4a4a4a",
  };

  const steps = [
    {
      id: "1",
      message: "Hola ¿Como estas?",
      trigger: "2",
      delay: false
    },
    {
      id: "2",
      user: true,
      trigger: "3",
    },
    {
      id: "3",
      message: "Bienvenido {previousValue}. ¿en que puedo ayudarte?",
      trigger: "4",
      delay: false
    },
    {
      id: "4",
      options: [
        { value: 1, label: "¿Como puedo comprar un pasaje?", trigger: "5" },
        { value: 2, label: "Olvide mi contraseña", trigger: "6" },
        { value: 3, label: "¿Que medios de pago aceptan?", trigger: "7" },
        { value: 4, label: "¿Como puedo cancelar mi reserva?", trigger: "8" },
        {
          value: 5,
          label: "Quiero ir de vacaciones. ¿Que pais me recomiendan?",
          trigger: "9",
        },
      ],
    },
    {
      id: "5",
      message:
        "Para comprar un pasaje debes iniciar sesion, recuerda que debes ser mayor de edad, poseer una tarjeta de crédito/débito y aceptar los terminos y condiciones.",
      trigger: "10",
      delay: false
    },
    {
      id: "6",
      component: (
        <div> Dale click al siguiente <a href="http://localhost:3000/reset">link</a> </div>
      ),
      trigger: "10",
      delay: false
    },
    {
      id: "7",
      message:
        "Al ser MercadoPago nuestro procesador de pagos, aceptamos cualquier tarjeta de crédito o débito que adminta la plataforma",
      trigger: "10",
      delay: false
    },
    {
      id: "8",
      message: "aun no se ha implementado esta funcionalidad",
      trigger: "10",
      delay: false
    },
    {
      id: "9",
      message:
        "te recomiendo que visites la seccion de destinos populares donde podras encontrar los mejores lugares para visitar",
      trigger: "10",
      delay: false
    },
    {
      id: "10",
      message: "¿En que mas puedo ayudarte?",
      trigger: "4",
    },
  ];

  return (
    <div className={styles.container}>
    <div className={visibility? styles.visible : styles.hidden}>
      <button className={styles.cerrar} onClick={handleClick} >X</button>
      <ThemeProvider theme={theme}>
        <ChatBot
          speechSynthesis={{ enable: false, lang: 'spanish' }}
          botDelay={3000}
          botAvatar={botImg}
          userAvatar="https://i.pinimg.com/originals/6f/d4/90/6fd490df8567c4086c6f7444693543da.png"
          steps={steps}
        />
      </ThemeProvider>
    </div>
    <button className={styles.chatButton} onClick={handleClick}> 
    <BiMessageRoundedDetail className={styles.icon}/>
     </button>   
      </div>
  );
}
