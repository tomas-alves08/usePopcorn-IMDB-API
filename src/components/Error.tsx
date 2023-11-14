import { FC } from "react";
import { IError } from "../models/error.model";

interface ErrorMessageProps {
  message: IError["message"] | null;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message = "Error" }) => {
  return (
    <p className="error">
      <span>⛔</span>
      {message}
    </p>
  );
};

export default ErrorMessage;
