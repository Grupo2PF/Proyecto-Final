// import { useSelector, useDispatch } from "react-redux";
// import { useEffect, useState } from "react";
// import { isAvailable } from "../../redux/actions";
// import { useHistory, Redirect } from "react-router-dom";
// import swal from "sweetalert";
// import firebase from "firebase/app"
// import { db } from "../../firebaseConfig";

// export default function FavCard(props) {
//   const favs = useSelector((state) => state.favs);
//   const yetAvailable = useSelector((state) => state.availableFlight);
//   const dispatch = useDispatch();
//   const history = useHistory();
//   const [offers, setOffers] = useState([])

//   var fav = [];

//   const available = (e) => {
//     e.preventDefault();
//     fav = favs.filter((fav) => fav.offers === e.target.value);
//     dispatch(isAvailable(fav));
//     if (yetAvailable.class) {
//       if (window.confirm("El vuelo esta disponible, desea comprarlo?")) {
//         console.log()
//         history.push({
//           pathname: "/pruebaprops",
//           state: { ...fav[0] },
//         });
//       }
//     }
//   };


//   const borrarFav = (e) => {
//     e.preventDefault();
//     swal({
//       title: "Esta seguro?",
//       text: "Esta seguro que desea eliminar el favorito?",
//       icon: "warning",
//       buttons: true,
//       dangerMode: true,
//     }).then((isConfirm) => {
//       if (isConfirm) {
//         // swal("Eliminado!", "El vuelo ha sido eliminado", "success");
//         db.collection("saves").doc(e.target.value).delete()
//         .then(() => {
//           swal("Exito!","el favorito ha sido borrado exitosamente", "success")
//           window.location.reload(true);
//         })
//         .catch((error) =>{
//           swal("Error!", "No se pudo borrar la cuenta!", "error")
       
//       })} else {
//         swal("Cancelado", "El favorito no ha sido eliminado", "error");
//       }
//     });
//   };

//   return (
//     <div>
//       {favs?.map((fav) => {
//         return (
//           <div key={fav.id}>
//             {fav.originCity}
//             {fav.destinationCity}
//             {`${fav.price}`}
//             <button value={fav.iddelDoc} onClick={borrarFav}>X</button>
//             <button value={fav.offers} onClick={available}>
//               ¿Sigue disponible?
//             </button>
//             <button>Buscar similares</button>
//           </div>
//         );
//       })}
//     </div>
//   );
// }
