
// ================================================================
// ================================================================
import { Toaster } from "react-hot-toast";

const ToastProvider = () => {
    return (
        <Toaster 
            position="top-center"
            containerStyle={{zIndex: 100000}}
            toastOptions={{
                duration: 3000,
                style: {
                    minWidth: "400px",
                    background: "#1e293b",
                    color: "#fff",
                    padding: "9px",
                    borderRadius: "4px",
                    fontSize: "14px",
                    textAlign: "start",
                    boxShadow: 'none' ,
                },
                success: {style: {background: "#47e781", color: "#086b2e"}},
                error: {style: {background: "#f07979", color: "#780d0d"}},
        }}/>
    )
}
export default ToastProvider     
// ================================================================





















