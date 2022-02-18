import style from "../css/Searchbox/SearchBox.module.css"
import { MdSearch  , MdKeyboardBackspace as BackBtn} from "react-icons/md";
import { useState } from "react";
export default function SearchBox(){
  const [status , setStatus] = useState(true)
  const handleClick = () => {
    status ? setStatus(false) : setStatus(true);
    console.log(status);
  };
  return(
    <div className={style.SearchBox}>
      <label htmlFor="searchBar" onClick={handleClick}> {status ? <MdSearch /> : <BackBtn />} </label>
      <input type="text" id="searchBar" />
    </div>
  )
}