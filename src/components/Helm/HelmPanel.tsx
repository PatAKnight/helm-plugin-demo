import { DrawerActions, DrawerCloseButton, DrawerHead, DrawerPanelBody, DrawerPanelContent, Title } from "@patternfly/react-core";
import * as React from "react";
// import { fetchHelmChartReadme } from "../../services/HelmService";

const HelmPanel = (chart) => {
    // let readme;

    // if (chart.activeChart) {
    //     readme = fetchHelmChartReadme(chart.activeChart.urls[0]);
    // }

    // console.log(readme);

    return (
        <DrawerPanelContent>
            <DrawerHead>
                <Title headingLevel="h2" size="xl">
                    {chart.activeChart && chart.activeChart.name}
                </Title>
                <DrawerActions>
                    <DrawerCloseButton onClick={chart.handleClick} />
                </DrawerActions>
            </DrawerHead>
            <DrawerPanelBody>
                <h2>Description</h2>
                <p>{chart.activeChart && chart.activeChart.description}</p>
                <h3>Home Page</h3>
                <a href={chart.activeChart && chart.activeChart.home}>{chart.activeChart && chart.activeChart.home}</a>
                <h3>Maintainers</h3>
                <p>{chart.activeChart && chart.activeChart.maintainers?.at(0).name}</p>
                <h3>Version</h3>
                <p>{chart.activeChart && chart.activeChart.version}</p>
            </DrawerPanelBody>
        </DrawerPanelContent>
    )
}

export default HelmPanel;