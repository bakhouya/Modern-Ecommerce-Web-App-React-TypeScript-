
// ================================================================
// ================================================================
import { Toaster } from "react-hot-toast";

const ToastProvider = () => {
    return (
        <Toaster 
            position="top-center"
            toastOptions={{
                duration: 3000,
                style: {
                    minWidth: "400px",
                    background: "#1e293b",
                    color: "#fff",
                    padding: "7px",
                    borderRadius: "8px",
                    fontSize: "14px",
                    textAlign: "start",
                    // border: "1px solid rgba(255,255,255,0.08)",
                },
                success: {style: {background: "#47e781", color: "#05461e"}},
                error: {style: {background: "#f07979", color: "#780d0d"}},
        }}/>
    )
}
export default ToastProvider     
// ================================================================





















