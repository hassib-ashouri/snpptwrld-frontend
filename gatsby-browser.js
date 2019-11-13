import React from "react"
import { UserContextProvider } from "./src/context/userContext";
import Layout from './src/components/layout';

// wrap the whole application with the user state stuff
export function wrapRootElement({ element })
{
  return (
    <Layout>
      <UserContextProvider>
        {element}
      </UserContextProvider>
    </Layout>
  )
}