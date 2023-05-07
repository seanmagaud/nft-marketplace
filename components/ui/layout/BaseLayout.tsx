import { FunctionComponent, ReactNode } from "react"
import Navbar from "../navbar"

interface Props {
    children: ReactNode | ReactNode[]
  }

const BaseLayout: FunctionComponent<Props> = ({children}) => {
    return (
        <>
        <Navbar/>
        <div className="py-16 bg-cyan overflow-hidden min-h-screen">
            <div className="max-w-7xl mx-auto px-4 space-y-8 sm:px-6 lg:px-8">
                {children}
            </div>
        </div>
        </>
    )
}

export default BaseLayout;