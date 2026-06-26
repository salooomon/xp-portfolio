let windowInstanceCounter = 0;

export const createWindowInstanceId = (namespace: string, entityId: string) => {
    windowInstanceCounter += 1;
    return `${namespace}-${entityId}-${Date.now()}-${windowInstanceCounter}`;
};
