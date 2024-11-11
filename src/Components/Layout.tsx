import React from "react";

interface IProps {
  children: React.ReactNode;
}

function Layout({ children }: IProps) {
  return (
    <div className="max-w-screen-md mx-auto px-5 py-10">
      {children}
    </div>
  )
}

export default Layout