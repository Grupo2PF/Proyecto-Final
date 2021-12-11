import { useHistory, useLocation } from 'react-router-dom';

export default function PruebaProps(props) {


    const location = useLocation();
  return (
      <div>
          {console.log(location.state)}
      <h1>{"state"}</h1>
    </div>
  );
}