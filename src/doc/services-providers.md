---
title: Startup Sequence
template: doc.hbt
class: documentation
---

## Service providers

Service providers are a central part of all the application startup sequence and bootstrapping.
They are responsible of loading and registering all the application components and starting them.

In general, the role of a service provider is to register things. That includes registering class bindings, listeners and routes.
They are a central place to configure behavior and services provided from and to your application.

Each service provider must extend the `ServiceProvider` class which declares two methods:

````js
public abstract boot(container: Container);
public abstract start(container:Huject.Container);
```

### Boot method

The `boot` method is responsible of loading and registering all the components to the main application container.

The application will call all boot methods of all providers before doing anything else.
This is to ensure that all components are fully loaded before trying to start them.

### Start method

The `start` method is reponsible of starting all the components.
This method is called once all components have been registered and dependencies have been resolved.
The application will call all methods of all providers.

Once all services have been successfully started, the application is considered as booted and the framework will let your code receive requests.