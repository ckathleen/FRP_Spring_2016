'use strict';

var document = require('global/document');
//hg is mercury
var hg = require('mercury');
//h is the vtree
var h = require('mercury').h;

function App() {
    return hg.state({
        clickValue: hg.value(0),
        //channels are events
        channels: {
            clicks: incrementCounter
        }
    });
}

function incrementCounter(state) {
    state.clickValue.set(state.clickValue() + 1);
}

App.render = function render(state) {
    //https://github.com/Raynos/mercury/blob/master/docs/modules/virtual-hyperscript.md
    return h('div', [
                h('h1','Casey\'s Mercury App'),
                h('div.counter', [
                    'The state ', h('code', 'clickCount'),
                    ' has value: ' + state.clickValue + '.', h('input.button', {
                        type: 'button',
                        value: 'Click me!',
                        'ev-click': hg.send(state.channels.clicks)
                    })
                ])
            ])
    };

hg.app(document.body, App(), App.render);