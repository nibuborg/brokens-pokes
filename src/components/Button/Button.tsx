import { FC } from "react"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export const Button: FC<Props> = ({ children, ...otherProps }) => <button className="bg-purple-500" {...otherProps}>{children}</button>