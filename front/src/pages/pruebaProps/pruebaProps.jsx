import { useHistory, useLocation } from 'react-router-dom';

export default function PruebaProps(props) {


    const {state} = useLocation();
    console.log(state)
  return (
      <div>
      <h1>{"state"}</h1>
    </div>
  );
}