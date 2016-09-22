---
title: Services providers
template: doc.hbt
class: documentation
---

## Service providers

### Purpose

Service providers are a central part of all the application startup sequence and bootstrapping.
They are responsible of loading and registering all the application components and starting them.

In general, the role of a service provider is to register things. That includes registering class bindings, listeners and routes.
They are a central place to configure behavior and services provided from and to your application.

### Interface

Each service provider must extend the `ServiceProvider` class which declares two methods:

````js
public abstract boot(container: Huject.Container);
public abstract start(container:Huject.Container);
```

### Boot method

The `boot` method is responsible of loading and registering all the components to the main application container.

The application will call all boot methods of all providers before doing anything else.
This is to ensure that all components are fully loaded and that dependencies can be resolved before trying to start anything.

### Start method

The `start` method is responsible of starting all the components.
Because this method is called after each component registered successfully, dependencies are resolved
and components can start to interact.

One done, the component mst be started and fully operational.

Once all services have been successfully started, the application is considered as booted and the framework will let your code receive requests.
