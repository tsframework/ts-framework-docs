---
title: Startup Sequence
template: doc.hbt
class: documentation
---

## Startup Sequence

Basicaly an application is nothing more than a bunch of services running together to form the final product.

To stay simple and non bloated, the framework itself is really lightweight and does nothing more than loading and registering services together.
All the functionality is provided by services that you can freely enable or disable.
Also in TS framework, each service is independent and can run without the full framework.

When booting the application, the framework will call a list of `ServiceProvider` responsible of registering and booting each service.

### The entry point

The initial starting point of the application is the file app.ts inside your project `src/` directory.

```js
import {Application} from "tsframework-full";

let services = [
    "Core/TSFWServiceProvider.js",
    "Configuration/ConfigurationServiceProvider.js",
    "Controller/ControllerServiceProvider.js",
    "Http/HttpServiceProvider.js",
    "View/ViewServiceProvider.js"
];

let app: Application = new Application(process.cwd(), services);
    app.start();
```

This file declare which services providers to load at startup. Then launch the actual booting process.
It enable you to alter the framework behavior by modifying the service providers loaded at startup.

Services providers are an advanced topic and are better explained [here](/doc/services-providers.html)

## Booting sequence

When booting, the framework goes into a number of steps to give each components a chance to start up correctly.

Each component must have a service provider that will be called in turn to give them a chance to start the component.
The list of service providers and their order is defined as part of the entry point of the application.
So making it easy to alter started components and their order.

In the above example, the application will start the base framework components first (`TSFWServiceProvider`).
Then comes the Configuration (`ConfigurationServiceProvider`) component and the Controller system (`ControllerServiceProvider`).

After that comes the `HttpServiceProvider` will start the HttpServer that will receive requests and pass them to the controllers.
Finally the application start the `ViewServiceProvider` which will handle views returned by Controllers.

Usually, you'll want to add additional providers to boot up your application right after the framework.

The framework has now finished his job and is ready to give the full power to your application to start answering requests!