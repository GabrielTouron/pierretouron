import { Button } from "@chakra-ui/react"
import { MouseEventHandler } from "react"

interface ButtonPrimaryProps {
  action: MouseEventHandler<HTMLButtonElement>
}

export const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({action}) => {
  return <Button bg="primary" color="white" onClick={action} >Button</Button>

}