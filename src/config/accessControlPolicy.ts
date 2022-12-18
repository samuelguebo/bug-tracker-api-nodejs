type Policy = {
    [key: string]: {
        actions: string[],
        resources: string[]
    }
}

export const accessControlPolicy: Policy = {
    admin: {
        actions: ['GET', 'POST', 'PUT', 'DELETE'],
        resources: ["*"]
    },
    member: {
        actions: ['GET', 'POST', 'PUT'],
        resources: ["users", "projects", "tasks", "comments"]
    },
    guest: {
        actions: ['GET'],
        resources: ["tasks"]
    },
}