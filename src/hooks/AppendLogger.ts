import { useContext } from "react";
import { AppendLogger, AppendLoggerContext } from "../context/AppendLoggerContext";

export const useLogger: () => AppendLogger = () => {
    const logger = useContext(AppendLoggerContext);
    return logger;
};