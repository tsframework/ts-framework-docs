---
title: Controllers
template: doc.hbt
class: documentation
---

## Controllers

As with any MVC framework, there is a concept of a controller.

### Introduction

A controller is a piece of code (in typescript a class) that will contains all handling logic for on or more type of request.
His job is to provide a response to a request.

By convention, all controllers are stored in the `controllers` directory,
but this can be changed as you see fit as TSFramework doesn't enforce anything.

### Defining your first controller

A controller can be any class that **does something**.
In fact, TSFramework doesn't force you to extends any class, so that you can use as a controller any method of any class.

However for convenience, TSFramework provide a class called `HttpController`.
By extending this class, you gain access to request and response objects, but also to several helpers for sending responces.

Below is an example of a basic controller class that should be self explanatory.

```js
import {HttpController} from "tsframework-full";

export class IndexController extends HttpController
{
    public getIndex()
    {
        return this.view('welcome.ejs');
    }
}
```

This controller extends the HttpController class, enabling the use of helpers methods like `view` to return a responce.

TSFramework take care of resolving controllers on a per request basis so that each request has his very own context.
That means that you don't have to care about class properties being shared between requests.
It also means that you can use dependency injection to automatically bind dependencies of your controllers everytime a request arrives.

### Binding your controller to a route

TSFramework require you to bind controllers to routes for them to be usable.

It's recommended to bind all of your routes at application startup in the `start` method of `AppServiceProvider`.

Here is a start method that register the index route from our controller:

```js
start(container:Huject.Container) {
    //Get the router instance
    var router: Router = container.resolve("Router");

    //Bind a route to our router
    router.get("/", IndexController, "getIndex");

    //Display all registered routes
    console.log(container.resolve("Router").printRoutes());
}
```

The application service provider is a very good place to define which services your application is providing!

<a href="/doc/services-providers.html#purpose">Read more on service providers</a> to understand the magic behind them.

### Returning a response

Most of your controllers will have to return a response to every request.
The base class `HttpController` provide the following methods for your convenience:

```js
export class HttpController
{
    protected redirect(url: string, status: number = 302);
    protected content(text: string, contentType?: string);
    protected json(data: {});
    protected file(path: string);
    protected download(path: string, filename?: string);
    protected view(template: string, options?: {});
}
```

Of course if you want full control, you can still set values directly on the response object, then call send() manually.
