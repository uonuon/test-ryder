import React, { ReactNode, createContext, useState } from "react";

export interface AppendLogger {
    log: string[],
    append: (data: string[]) => string[],
    clear: () => void;
}

export const OVERWRITE_LOGGER = {
    log: [''],
    append: (data: string[]) => { return data; },
    clear: () => { return; }
}

export const AppendLoggerContext = createContext<AppendLogger>(OVERWRITE_LOGGER);


interface AppendLoggerProviderProps {
    children: ReactNode;
}

export const AppLoggerProvider = ({ children }: AppendLoggerProviderProps) => {
    const [log, setLog] = useState<string[]>([]);
    return (
        <AppendLoggerContext.Provider
            value={{
                log: log,
                append: (data: string[]) => {
                    data.map(d => log.unshift(d));
                    setLog(Array.from(log));
                    return data;
                },
                clear: () => {
                    setLog([]);
                }
            }}>
            {children}
        </AppendLoggerContext.Provider>
    );
};