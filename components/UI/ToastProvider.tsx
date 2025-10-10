// import React, { createContext, useContext, useState, ReactNode } from "react";
// import { View, StyleSheet } from "react-native";
// import { Toast, ToastType } from "./Toast";

// interface ToastItem {
//   id: string;
//   message: string;
//   type: ToastType;
//   duration?: number;
//   position?: "top" | "bottom";
// }

// interface ToastContextType {
//   showToast: (
//     message: string,
//     type?: ToastType,
//     duration?: number,
//     position?: "top" | "bottom"
//   ) => void;
//   success: (message: string, duration?: number) => void;
//   error: (message: string, duration?: number) => void;
//   warning: (message: string, duration?: number) => void;
//   info: (message: string, duration?: number) => void;
// }

// const ToastContext = createContext<ToastContextType | undefined>(undefined);

// interface ToastProviderProps {
//   children: ReactNode;
//   maxToasts?: number;
// }

// export const ToastProvider: React.FC<ToastProviderProps> = ({
//   children,
//   maxToasts = 3,
// }) => {
//   const [toasts, setToasts] = useState<ToastItem[]>([]);

//   const showToast = (
//     message: string,
//     type: ToastType = "info",
//     duration: number = 3000,
//     position: "top" | "bottom" = "top"
//   ) => {
//     const id = Date.now().toString() + Math.random().toString(36);
//     const newToast: ToastItem = { id, message, type, duration, position };

//     setToasts((prevToasts) => {
//       const updatedToasts = [...prevToasts, newToast];
//       // Limit the number of toasts
//       if (updatedToasts.length > maxToasts) {
//         return updatedToasts.slice(-maxToasts);
//       }
//       return updatedToasts;
//     });
//   };

//   const dismissToast = (id: string) => {
//     setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
//   };

//   const success = (message: string, duration?: number) => {
//     showToast(message, "success", duration);
//   };

//   const error = (message: string, duration?: number) => {
//     showToast(message, "error", duration);
//   };

//   const warning = (message: string, duration?: number) => {
//     showToast(message, "warning", duration);
//   };

//   const info = (message: string, duration?: number) => {
//     showToast(message, "info", duration);
//   };

//   return (
//     <ToastContext.Provider value={{ showToast, success, error, warning, info }}>
//       {children}
//       <View style={styles.toastContainer} pointerEvents="box-none">
//         {toasts.map((toast, index) => (
//           <View
//             key={toast.id}
//             style={[
//               styles.toastWrapper,
//               {
//                 marginTop: toast.position === "top" ? index * 80 : 0,
//                 marginBottom: toast.position === "bottom" ? index * 80 : 0,
//               },
//             ]}
//           >
//             <Toast
//               message={toast.message}
//               type={toast.type}
//               duration={toast.duration}
//               position={toast.position}
//               onDismiss={() => dismissToast(toast.id)}
//             />
//           </View>
//         ))}
//       </View>
//     </ToastContext.Provider>
//   );
// };

// export const useToast = (): ToastContextType => {
//   const context = useContext(ToastContext);
//   if (!context) {
//     throw new Error("useToast must be used within a ToastProvider");
//   }
//   return context;
// };

// const styles = StyleSheet.create({
//   toastContainer: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     zIndex: 99999,
//   },
//   toastWrapper: {
//     position: "absolute",
//     width: "100%",
//   },
// });
