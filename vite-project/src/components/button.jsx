import { Button } from "./ui/button"


function Btn(props){


    return <Button variant="secondary" onClick={props.handleClick}>{props.txt}</Button>
}
export default Btn