function iframeEditor() {
  console.log("bruh");
  text = document.getElementById('t-area').value;
  iframe = document.getElementById('if');
  iframe.setAttribute("srcdoc", `
  <!DOCTYPE html>
  <html>
    <head>
      <title> React Demo </title>
      <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
      <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
      <!-- Don't use this in production: -->
      <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    </head>
    <body style='color:white;'>
      <div id="root"></div>
      <p id="error"> </p>
      <script type="text/babel">try{`+text+`} catch(error){document.getElementById('error').innerHTML=error;}</script>
    </body>
  </html>
      `
);
}

function iframeComp() {
  console.log(text);
  classEndInd = text.indexOf("//c");
  if (classEndInd < 1) {
    document.getElementById("help-text").innerHTML = "You did not include //c in your Code Editor code";
  } else {
    document.getElementById("help-text").innerHTML = "You included //c in your Code Editor code!";
  }
  classComp = text.substring(0,classEndInd);
  textComp = document.getElementById("t-areaComp").value;
  ifComp = document.getElementById("ifComp");
  console.log(classComp);
  ifComp.setAttribute("srcdoc",`
  <!DOCTYPE html>
  <html>
    <head>
      <title> React Demo </title>
      <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
      <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
      <!-- Don't use this in production: -->
      <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    </head>
    <body style='color:white;'>
      <div id="root"></div>
      <p id="error"> </p>
      <script type="text/babel">
      class ErrorBoundary extends React.Component {
        constructor(props) {
          super(props);
          this.state = { hasError: false, error: "" };
        }
        static getDerivedStateFromError(error) {
          // Update state so the next render will show the fallback UI.
          return { hasError: true };
        }
        componentDidCatch(error, errorInfo) {
          // You can also log the error to an error reporting service
          logErrorToMyService(error, errorInfo);
          this.setState({ hasError: false, error: error});
        }
        render() {
          if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>this.state.error</h1>;
          } else {
            return(<h1>All Good</h1>);
          }
        }
      }
      `+classComp+`
      const element = <ErrorBoundary>{`+textComp+`}</ErrorBoundary>;
      const root = ReactDOM.createRoot(document.getElementById("root"));
      root.render(element);
      </script>
    </body>
  </html>
      `
    );
}
