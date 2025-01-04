import { Button } from "./ui/button"


function Button(props){


    return <Button variant="secondary" onClick={props.handleClick}>Solve</Button>
}
export default Button