import React from "react"

type buttonType = {
  buttonText: string
  onClick: () => void
}

const Button = ({ buttonText, onClick }: buttonType) => {
  return <button onClick={onClick}>{buttonText}</button>
}

export default Button
