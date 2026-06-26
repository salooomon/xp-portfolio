import React, { useMemo } from 'react';
import { windowsStore } from '../store/windowsStore';
import { WindowWrapper } from './WindowWrapper';

export interface WindowInstanceConfig {
    id: string;
    title: string;
    icon: string;
    content: React.ReactNode;
}

interface WindowInstancesHostProps {
    instances: WindowInstanceConfig[];
}

export const WindowInstancesHost: React.FC<WindowInstancesHostProps> = ({ instances }) => {
    const windows = windowsStore((state) => state.windows);
    const openWindowsSet = useMemo(
        () => new Set(windows.map((window) => window.id)),
        [windows]
    );

    return (
        <>
            {instances
                .filter((instance) => openWindowsSet.has(instance.id))
                .map((instance) => (
                    <WindowWrapper
                        key={instance.id}
                        id={instance.id}
                        title={instance.title}
                        icon={instance.icon}
                    >
                        {instance.content}
                    </WindowWrapper>
                ))}
        </>
    );
};
