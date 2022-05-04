import { toast } from "react-toastify";
import { Alert } from "../constants/Alert";
export const createAlert = ({ alert, type }) => {
  if (type === Alert.ERROR) {
    alert.forEach((alert, i) => toast.error(alert.error, { toastId: i }));
  }
  if (type === Alert.SUCCESS) {
    alert.forEach((alert, i) => toast.success(alert.success, { toastId: i }));
  }
  if (type === Alert.INFO) {
    alert.forEach((alert, i) => toast.info(alert.info, { toastId: i }));
  }
};
