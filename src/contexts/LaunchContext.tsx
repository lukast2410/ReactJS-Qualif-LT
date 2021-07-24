import { createContext, useState } from 'react';

export const LaunchContext = createContext(null)

export const LaunchProvider = ({children}) => {
    const [launch, setLaunch] = useState(null)

    return (
        <LaunchContext.Provider value={[launch, setLaunch]}>
            {children}
        </LaunchContext.Provider>
    )
}