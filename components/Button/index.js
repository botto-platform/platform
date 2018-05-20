import React from "react"

// const Button = props => (
//   <button className={"px-2 py-3 bg-blue text-white"} {...props} />
// )

export const Button = ({ className, ...props }) => (
  <button
    className={
      "appearance-none px-8 py-4 text-black tracking-wide rounded " + className
    }
    {...props}
  />
)

export const GhostButton = ({ className, ...props }) => (
  <Button className={"border-2 border-grey-darker " + className} {...props} />
)

export const PrimaryButton = ({ className, ...props }) => (
  <Button
    className={"bg-yellow active:bg-yellow-dark hover:opacity-75 " + className}
    {...props}
  />
)

export default Button
