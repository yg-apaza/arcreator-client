type Resource = {
    name: string,
    type: string,
    url: string
}

type Interface = {
    interfaceAction: number,
    interfaceEvent: number,
    markerName: string,
    resourceName: string
}

export interface UpdateRequest {
    _id: string,
    title: string,
    description: string,
    framework: string,
    author: string,
    markers: Array<string>,
    resources: Array<Resource>,
    interfaces: Array<Interface>
}