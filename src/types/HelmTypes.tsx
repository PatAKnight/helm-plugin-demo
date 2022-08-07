export interface HelmRelease {
    name: string;
    namespace: string;
    chart: HelmChart;
    info: {
        description: string;
        deleted: string;
        first_deployed: string;
        last_deployed: string;
        status: string;
        notes: string;
    };
    version: number | string;
    hooks?: object[];
    manifest?: string;
}

export interface HelmChart {
    files: { name: string; data: string }[];
    metadata: HelmChartMetaData;
    templates: object[];
    values: object;
    lock?: object;
    schema?: string;
}

export interface HelmChartMetaData {
    name: string;
    version: string;
    created?: string;
    description?: string;
    digest?: string;
    apiVersion: string;
    appVersion?: string;
    annotations?: {
      [key: string]: string;
    };
    keywords?: string[];
    home?: string;
    icon?: string;
    sources?: string[];
    maintainers?: { name: string; email?: string; url?: string }[];
    dependencies?: object[];
    type?: string;
    urls: string[];
    kubeVersion?: string;
    repoName?: string;
}

export type HelmChartEntries = {
    [name: string]: HelmChartMetaData[];
}