---
title: Getting started
template: doc.hbt
class: documentation
---

## Getting started

For now the framework is still in heavy developement and isn't published as an npm package.

However, if you want to use it, you can still get it from the source repository and compile it yourself.

### Downloading and compiling from source

To unleash the power of TS framework, we are going to create two folders to hold our projet.
One will contain the framework source and build.
The other will contain your project created from a base application.

All followings commands will be executed in a bash like environment with typescript and git installed

1. Clone the ts-framework repository

    ```
git clone https://github.com/tsframework/ts-framework.git
    ```

2. Load dependencies and build the framework itself

    ```
cd ts-framework
npm install -g typings
npm install
typings install
npm run-script build
    ```

    If you get errors at this step, please check [the troubleshoot guide](#troubleshooting-guide)

3. Run the automatic tests (Skip if you havn't modifyed the base ts-framework)

    ```
npm run-script test
    ```

4. Create a local npm package link

    ```
npm link
    ```

    This will publish ts-framework locally.

5. Create the example app

    ```
cd ..
git clone https://github.com/tsframework/ts-framework-app.git
    ```

6. Link to the local framework and load dependencies

    ```
npm link ts-framework
npm install
    ```

7. Start the default app in dev mode (auto rebuild server/client code and clients assets on change)

    ```
$(npm bin)/gulp watch
    ```

That's it, a default application must be available at [http://localhost:3000](http://localhost:3000).
