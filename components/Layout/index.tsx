import React from "react";
import './_index.scss'

type TLayoutProps = {
  children: React.ReactNode
}

const Layout = ({children}: TLayoutProps) => {
  return (
    <main className="main">{children}</main>
  )
}

export {Layout}