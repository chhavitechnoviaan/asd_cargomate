import Swal from "sweetalert2";
export const themeAlert = (icon, title, text) => Swal.fire({icon,title,text,confirmButtonColor:"#0d9488",background:"#ffffff",color:"#111827",customClass:{popup:"rounded-2xl shadow-2xl",confirmButton:"rounded-lg"}});
export const successAlert=(message)=>themeAlert("success","Success",message);
export const errorAlert=(message)=>themeAlert("error","Something went wrong",message);
