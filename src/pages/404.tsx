import {useEffect} from "react";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  let navigate = useNavigate(); // useHistory in router v5

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 3000)
  }, [])

  return (
    <>
      <h2>Page not found</h2>
      <h3>3 seconds to redirect...</h3>
    </>
  )
}