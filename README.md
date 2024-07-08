# UXP Workshop

## Chapter One - Set up environment and basic front end

Download CC Desktop App
Download UXP Developer Tools
Create Plugin

- Give it a name
- Give it an ID
- Choose react-starter

Open folder in VSCode

In terminal, npm install

Delete package-lock.json file

yarn import

yarn watch

In UXP Developer Tools, Load and watch

In Photoshop, we see two panels load. We want one, so let’s delete one and see where it all gets called (not in dist)

Go to manifest.json - Talk through what manifest.json does

Go to index.jsx and talk through what index.jsx is doing

Delete MoreDemos.jsx and all references in order to be left with one panel

Once all references are deleted, we can kill the dev and yarn build, yarn watch again in VSCode and unload and load and watch in UXP Dev Tools

Change size of panel - In manifest.json adjust the preferredFloatingSize to 300 x 300

yarn build, yarn watch to see the changes

Layout basic UI in Demos.jsx

Spectrum Web Components - https://opensource.adobe.com/spectrum-web-components/components/ - No need to import or install, they are available to use

Add a text area, two pickers and a button

## Chapter Two - Finish UI

Add another text area for negative prompt, add a div of checkboxes

Add any options you want (6 or so) for styles (see presetOptions.js)

Combine separate state objects into one formData object and all handle changes into handleChange

## Chapter Three - Connect to Firefly API

Grab your credentials ....

create a .env file and place your credentials in there (make sure to gitignore this if you're putting on GitHub)

create apiConnector.js file inside of controllers

modify webpack.config.js

require dotenv and webpack

yarn add dotenv

<b>if it ever freezes up on yarn build</b>

- close VSCode
- delete node modules
- delete yarn.lock (and package-lock.json if there)
- open vscode
- npm install
- delete package-lock
- yarn import
- yarn build, yarn watch

in apiConnector

add your id and secret variables to use process.env.FIREFLY_CLIENT_ID, etc

set url and body

add fetch url to manifest.json to allow the domain

in Demos.jsx, import addPost and add it to the submitForm function

add numVariations: 1 to formData

grab the string from the response.outputs[0].image.url and paste it into your browser to see your image

## Chapter Four - Display image in Photoshop

Create a utils folder and a file called imageHandlers.js

in imageHandlers we need three functions

fetchS3PresignedConent to get the image as an arrayBuffer from the presigned URL Amazon S3 bucket

createImageBuffer to create the image from that buffer and store it to a temp folder

addIMageDataToDocument to use the photoshop API to open that temp file into Photoshop using an executeAsModal batchPlay event

in webpack.config.js add fs: 'commonjs2 fs' into the externals:

in Demos.jsx - Build out the requestBody inside submitForm to handle the correct formatting of the body object (especially style)

If you want to add more functionality in the style, you could add that accordingly into the state

## Chapter Five - add Ps actions and upload reference image

In imageHandlers getReferenceImage function

uploadImage function that calls

In manifest we need to allow filepicker

```
"localFileSystem": "fullAccess",
```

At some point you may get an error about path and crypto. Here's a quick fix

```
resolve: {
    extensions: [".js", ".jsx"],
    fallback: {
        "path": false,
        "crypto": false,
    }
},
```

in webpack.config.js

## End of Walkthrough

# React Starter Plugin

This plugin is a good place to get started when building a Photoshop plugin using React. It comes defined with all the dependencies that you'll need to get started. As this is a React project, you'll need to do some initial configuration before this will be usable in Photoshop.

## Install dependencies

First, make sure that `npm` is installed on your system.

After you ensure that your terminal is in the root of this project, use `npm` to install the various dependencies needed:

```
npm install
```

<b>Optional</b></br>
If you prefer to use `yarn`, after you generate the `package-lock.json` file you can run the following line to import dependencies to a `yarn.lock` file:

```
yarn import
```

## Build Process

There are two ways to build the plugin for use in Photoshop:

- `yarn watch` (or `npm run watch`) will build a development version of the plugin, and recompile every time you make a change to the source files. The result is placed in `dist` folder. Make sure your plugin is in watch mode in UDT app.
- `yarn build` (or `npm run build`) will build a production version of the plugin and place it in `dist` folder. It will not update every time you make a change to the source files.

> You **must** run either `watch` or `build` prior to trying to use within Photoshop!

## Launching in Photoshop

You can use the UXP Developer Tools to load the plugin into Photoshop.

If the plugin hasn't already been added to your workspace in the UXP Developer Tools, you can add it by clicking "Add Plugin...". You can either add the `manifest.json` file in the `dist` folder or the `plugin` folder.

- If you add the one in the `plugin` folder, then you need to update the relative path to the plugin build folder ( `dist` ) by clicking the ••• button > "Options" > "Advanced" > "Plugin build folder".
- During development, it is recommended to build the plugin using `yarn watch` and load the `manifest.json` in the (plugin build) `dist` folder.

Once added, you can load it into Photoshop by clicking the ••• button on the corresponding row, and clicking "Load". Switch to Photoshop and you should see the starter panels.

## What this plugin does

This plugin doesn't do much, but does illustrate how to create two panels in Photoshop with `entrypoints.setup`, and how to create flyout menus. It also demonstrates the use of several Spectrum UXP widgets to create a simple color picker in the primary panel.

### Common Issues

- If you're getting errors with `npm install`, we can reinstall the project dependencies. Let's first make sure to delete `node_modules/*` from the `template` folder as well as the `package-lock.json` and `yarn.lock` file. Staying in the `template` directory, run `npm install` again and this will regenerate your `package-lock.json` file.
- After running `yarn import` if you end up with the error `Lockfile already exists, not importing.`, then it is likely due to an already existing `yarn.lock` in your project. In such a case, you can either delete the lock file to generate a new `yarn.lock` or continue with the [Build Process](#build-process) steps.

PS Version : 23.2.0 or higher
UXP Version : 5.6 or higher
