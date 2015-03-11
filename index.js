'use strict';
var htmlEscape = require('escape-html');

/**
 * @module ga-browser
 */
module.exports = function(windowObject)
{
        var window = windowObject || global.window;

        if (!window)
        {
                // e.g. server side in node.js
                return function() { /* noop */ };
        }

        var ga = function googleAnalytics()
        {
                return window[ga.globalName].apply(window, arguments);
        };

        ga.globalName = 'ga';
        if (typeof window.GoogleAnalyticsObject === 'string')
        {
                ga.globalName = window.GoogleAnalyticsObject.trim() || 'ga';
        }

        if (!window[ga.globalName])
        {
                window[ga.globalName] = function()
                {
                        (window[ga.globalName].q = window[ga.globalName].q || []).push(arguments);
                };

                window[ga.globalName].l = +new Date();
        }

        return ga;
};

/**
 * URL referencing Google's Universal Analytics script
 * @type {string}
 */
module.exports.scriptUrl = '//www.google-analytics.com/analytics.js';

/**
 * URL referencing the debug version of Google's Universal Analytics script
 * @type {string}
 */
module.exports.debugScriptUrl = '//www.google-analytics.com/analytics_debug.js';

/**
 * Returns the html markup of the script element for the google analytics script
 * @param {Boolean} [debug=false] If set, use the debug version instead
 * @returns {string}
 */
module.exports.getScriptMarkup = function(debug)
{
        var url = debug ? module.exports.debugScriptUrl : module.exports.scriptUrl;
        return '<script async="async" src="' + htmlEscape(url) + '"></script>';
};

/**
 * Add a script element for the google analytics script to the given DOM document
 * @param {HTMLDocument|HTMLHeadElement} documentOrHead
 * @param {Boolean} [debug=false] If set, use the debug version instead
 * @returns {HTMLScriptElement}
 */
module.exports.insertScript = function(documentOrHead, debug)
{
        if (!documentOrHead)
        {
                throw Error('Missing argument');
        }

        var document = documentOrHead.nodeType === 9 // DOCUMENT_NODE
                ? documentOrHead
                : documentOrHead.ownerDocument;

        var head = documentOrHead.nodeType === 1 // ELEMENT_NODE
                ? documentOrHead
                : document.getElementsByTagName('head')[0];

        var url = debug
                ? module.exports.debugScriptUrl
                : module.exports.scriptUrl;

        if (!head)
        {
                throw Error('Missing <head> element');
        }

        var script = document.createElement('script');
        script.setAttribute('async', 'async');
        script.setAttribute('src', url);
        head.appendChild(script);
        return script;
};
