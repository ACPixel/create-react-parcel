#!/usr/bin/env node

module.exports.package = () => {
    return {"name": "React-Parcel", "version": "1.0.0", "description": "", "main": "index.js", "scripts": { "start": "parcel src/index.html", "build": "parcel build src/index.html"  }, "keywords": [], "author": "",  "license": "ISC", "dependencies": { "node-sass": "^4.9.0", "react": "^16.3.2", "react-dom": "^16.3.2" }, "devDependencies": { "babel-preset-env": "^1.6.1", "babel-preset-react": "^6.24.1", "parcel-bundler": "^1.8.1"}}
}

module.exports.html = () => {
    return (
    `<html>
        <head>
            <title>React starter app</title>
        </head>
        <body>
            <div id="app"></div>
            <script src="index.js"></script>
        </body>
    </html>`
    )
}

module.exports.scss = () => {
    return (
    `body {
        background-color: #444;
        color: white;
        display: flex;
        height: 100vh;
        width: 100vw;
        align-items: center;
        justify-content: center;
    }`
    )
}

module.exports.js = () => {
    return (
    `import React from "react";
    import ReactDOM from "react-dom";
    import "./main.scss";
    
    class HelloMessage extends React.Component {
      render() {
        return <h1>Hello {this.props.name}</h1>;
      }
    }
    
    var mountNode = document.getElementById("app");
    ReactDOM.render(<HelloMessage name="World!" />, mountNode);`
    )
}
