/** @jsx React.DOM */
var Header = require('../../blocks/header/header'),
    Search = require('../../blocks/search/search'),
    Tabs = require('../../blocks/tabs/tabs'),
    ViewShort = require('../../blocks/view-short/view-short'),
    ViewFull = require('../../blocks/view-full/view-full'),
    ViewVisual = require('../../blocks/view-visual/view-visual'),
    Footer = require('../../blocks/footer/footer');

var DefaultLayout = React.createClass({
    render: function () {
        var props = this.props,
            type = props.type;
        return (
            <html>
                <head lang="en">                    
                    <meta charSet="UTF-8"/>
                    <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
                    <meta name="apple-mobile-web-app-capable" content="yes"/>
                    <meta name="apple-mobile-web-app-status-bar-style" content="black"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
            
                    <link rel="stylesheet" type="text/css" href="/dist/css/weather.min.css" media="screen" />
            
                    <title>Погода {props.info.nameprep}</title>
            
                    <script src="/dist/js/socket.io.js" defer="true"></script>
                    <script src="/dist/js/jquery.min.js" defer="true"></script>
                    <script src="/dist/js/react.js" defer="true"></script>
                    <script src="/dist/js/StorageAPI.js" defer="true"></script>
                    <script src="/dist/js/update-timer.js" defer="true"></script>
                    <script src="/dist/js/suggest.js" defer="true"></script>
                    <script src="/dist/js/index.js" defer="true"></script>
                </head>
                <body>
                    <Header></Header>
                    <Search city={props.info.name}></Search>
                    <Tabs data={{type: type, id: props.info.id}}></Tabs>
                    {(function( scope ){
                        if ( type === "short" ) {
                            return <ViewShort data={props.short} show="true"></ViewShort>                             
                        }
                    })( this )}
    
                    {(function( scope ){
                        if ( type === "full" ) {
                            return <ViewFull data={props.full} show="true"></ViewFull>
                        }
                    })( this )}

                    {(function( scope ){
                        if ( type === "visual" ) {
                            return <ViewVisual data={props.visual} show="true"></ViewVisual>
                        }
                    })( this )}
                    <Footer></Footer>
                </body>
            </html>
        );
    }
});

module.exports = DefaultLayout;
