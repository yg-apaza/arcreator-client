type ArappSummary = {
    _id: String,
    title: string,
    description: string,
    framework: string,
    author: string
}

export interface ReadAllSummaryResponse {
    arApps: Array<ArappSummary>
}

