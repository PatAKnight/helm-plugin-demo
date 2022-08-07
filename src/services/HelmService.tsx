import * as React from "react"; 
import { consoleFetch, consoleFetchJSON } from "@openshift-console/dynamic-plugin-sdk";
import { useActiveNamespace } from "@openshift-console/dynamic-plugin-sdk-internal"
import { HelmChartEntries, HelmChartMetaData } from "src/types/HelmTypes";
import { load } from "js-yaml"
import { useTranslation } from "react-i18next";

export function fetchHelmCharts() {
    const [activeNamespace] = useActiveNamespace();
    const url = `/api/helm/charts/index.yaml?namespace=${activeNamespace}`
    const [chartEntries, setCharts] = React.useState<HelmChartEntries>();

    React.useEffect(() => {
        let mounted = true;
        consoleFetch(url)
            .then(async (res) => {
                if (mounted) {
                    const yaml = await res.text();
                    const json = load(yaml);
                    setCharts(json.entries);
                }
            })
            .catch((err) => {
                if (mounted) {
                    setCharts({});
                    console.log(err);
                }
            });
    }, [activeNamespace])

    //Some Charts have multiple versions, this is meant to grab the most recent version
    //The most recent versions of all the charts are the last chart
    //Will need better logic in case this is ever no longer the case
    let content = []

    for(var charts in chartEntries) {
        var thisChart: HelmChartMetaData;
        if(chartEntries[charts].length > 1) {
            thisChart = chartEntries[charts].at(chartEntries[charts].length - 1);
        } else {
            thisChart = chartEntries[charts].at(0);
        }

        content.push(thisChart)
    }

    return content
}

export function fetchHelmChartReadme(chartURL) {
    const { t } = useTranslation();
    const [readme, setReadme] = React.useState<string>();
    const [loaded, setLoaded] = React.useState<boolean>(false);
    
    React.useEffect(() => {
        let unmounted = false;

        const fetchReadme = async () => {
            let chartData;

            try {
                chartData = await consoleFetchJSON(`/api/helm/chart?url=${chartURL}`);
            } catch (e) {
                console.warn('Error fetching helm chart details for readme', e);
            }

            const readmeFile = chartData?.files?.find((file) => file.name === 'README.md');
            const readmeData = readmeFile?.data && atob(readmeFile?.data);

            if (!unmounted) {
                setLoaded(true);
                readmeData && setReadme(t('helm-plugin~## README\n{{readmeData}}', { readmeData }));
            }
        };

        fetchReadme();

        return () => {
            unmounted = true;
        };
    }, [chartURL, t]);

    if (!loaded) return <div className="loading-skeleton--table" />;

    return readme;
}