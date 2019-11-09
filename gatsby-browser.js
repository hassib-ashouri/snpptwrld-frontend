import React from "react"
import { UserContextProvider } from "./src/context/userContext"

// wrap the whole application with the user state stuff
export function wrapRootElement({ element }) {
  return (
    <UserContextProvider>
      {element}
    </UserContextProvider>
  )
}