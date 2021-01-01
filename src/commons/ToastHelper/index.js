import { toast } from "react-toastify";

export const successNofication = (msg) => {
  toast.success(msg);
};

export const failedNofication = (msg) => {
  toast.error(msg);
};
