import { Card, CardBody, CardFooter, CardTitle } from "@patternfly/react-core";
import * as React from "react";

const HelmCard = (chart) => {
    const PROVIDER_NAME_ANNOTATION = 'charts.openshift.io/provider'

    return (
        <Card
            isSelectable
            key={chart.id}
            onClick={() => chart.handleClick(chart)}
        >
            <CardTitle>{chart.name}</CardTitle>
            <CardBody>Provided by {chart.annotations?.[PROVIDER_NAME_ANNOTATION]}</CardBody>
            <CardFooter>Version {chart.version}</CardFooter>
        </Card>
    )
}

export default HelmCard;