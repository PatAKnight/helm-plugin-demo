import { Drawer, DrawerContent, DrawerContentBody, Gallery } from "@patternfly/react-core";
import * as React from "react";
import { fetchHelmCharts } from "../../services/HelmService"
import HelmCard from "./HelmCard";
import HelmPanel from "./HelmPanel";

const HelmDrawer: React.FC = () => {
    const [isExpanded, setIsExpaned] = React.useState(false);
    const [activeChart, setActiveChart] = React.useState(null);
    const helmChartsData = fetchHelmCharts();
    // const drawerRef = React.useRef<HTML>();

    // const onExpand = () => {
    //     drawerRef.current && drawerRef.current.focus();
    // }

    const onClick = (chart) => {
        setIsExpaned(!isExpanded);
        setActiveChart(chart);
    }

    const onCloseClick = () => {
        setIsExpaned(false);
        setActiveChart(null);
    }

    const helmCards = helmChartsData.map(chart => {
        return (
            <HelmCard 
                key={chart.id}
                handleClick={onClick}
                {...chart}
            />
        )
    })

    const drawerContent = (
        <Gallery hasGutter>
            {helmCards}
        </Gallery>
    )

    return (
        <React.Fragment>
            <Drawer isExpanded={isExpanded} position="right">
                <DrawerContent panelContent={<HelmPanel activeChart={activeChart} handleClick={onCloseClick} />}>
                    <DrawerContentBody hasPadding>{drawerContent}</DrawerContentBody>
                </DrawerContent>
            </Drawer> 
        </React.Fragment>
    )
}

export default HelmDrawer;