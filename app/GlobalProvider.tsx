import { GlobalMainProvider } from "@/utils/hooks/useContext"



export function GlobalProvider({children}:{children:React.ReactNode}){
    return (
        <GlobalMainProvider>
                {children}
        </GlobalMainProvider>
        )
}