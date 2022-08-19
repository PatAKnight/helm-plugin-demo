# OpenShift Console Plugin Template

## Info 

[Dynamic plugins](https://github.com/openshift/console/tree/master/frontend/packages/console-dynamic-plugin-sdk) are a way for teams to create UI components to ODC. With the use of Dynamic Plugins, a team could add custom pages, add perspectives and update navigation items, and add tabs and actions to resource pages. Dynamic Plugins are a [React](https://reactjs.org/) based UI that is built with [PatternFly 4](https://www.patternfly.org/v4/) components and extends the OpenShift Console using [webpack module federation](https://webpack.js.org/concepts/module-federation/). 

This demo was created as a way to gain a better understanding of the capabilities that the ODC Dynamic Plugin has to offer. The goal of this demo is to demonstrate a call to the List Repositories API for Helm that will retrieve all the available Helm Charts. 

## Getting started

* [oc](https://console.redhat.com/openshift/downloads) and an [Openshift cluster](https://console.redhat.com/openshift/create)
* [Node.js](https://nodejs.org/en/) (16.16.0 used during development)
* [yarn](https://yarnpkg.com) (1.22.17 used during development)
* [Docker](https://www.docker.com) or [podman 3.2.0+](https://podman.io)

## Development

### Local

In one terminal window, run:

1. `yarn install`
2. `yarn run start`

In another terminal window, run:

1. `oc login` (requires [oc](https://console.redhat.com/openshift/downloads) and an [OpenShift cluster](https://console.redhat.com/openshift/create))
2. `yarn run start-console` (requires [Docker](https://www.docker.com) or [podman 3.2.0+](https://podman.io))

This will run the OpenShift console in a container connected to the cluster
you've logged into. The plugin HTTP server runs on port 9001 with CORS enabled.
Navigate to <http://localhost:9000/helm-page> to see the running plugin.

#### Running start-console with Apple silicon and podman

If you are using podman on a Mac with Apple silicon, `yarn run start-console`
might fail since it runs an amd64 image. You can workaround the problem with
[qemu-user-static](https://github.com/multiarch/qemu-user-static) by running
these commands:

```bash
podman machine ssh
sudo -i
rpm-ostree install qemu-user-static
systemctl reboot
```

## Navigating the Demo
Navigating to <http://localhost:9000/helm-page> will allow you to see the Helm demo plugin being rendered. On this page, you can view all the available Helm Charts from the List Repositories API call alogn with their name, provider information, and version number. 

Clicking on an individual Helm Chart Card will bring a panel from the right with more details. This will include a description, home page, and the maintainers of the specified Helm Chart.

You can also open the Console from <http://localhost:9000/> which will take you to the Overview page. From here ensure that you are in the Administrator perspective and click on the Home tab in the navigation bar. Here you will see the Helm Chart Repositories Page tab which will also navigate you to <http://localhost:9000/helm-page>.

## References

- [Console Plugin SDK README](https://github.com/openshift/console/tree/master/frontend/packages/console-dynamic-plugin-sdk)
- [Customization Plugin Example](https://github.com/spadgett/console-customization-plugin)
- [Dynamic Plugin Enhancement Proposal](https://github.com/openshift/enhancements/blob/master/enhancements/console/dynamic-plugins.md)
