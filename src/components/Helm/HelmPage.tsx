import * as React from "react";
import { useTranslation } from "react-i18next"
import { Page, PageSection, Title } from "@patternfly/react-core";
import HelmDrawer from "./HelmDrawer";

const HelmPage: React.FC = () => {
    const { t } = useTranslation("plugin__helm-plugin-demo");
    
    return (
        <Page
            additionalGroupedContent={
                <PageSection variant="light">
                    <Title headingLevel="h1">
                        {t("Helm Plugin Demo")}
                    </Title>
                </PageSection>
            }
        >
            <PageSection>
                <HelmDrawer />
            </PageSection>
        </Page>
    )
}

export default HelmPage;