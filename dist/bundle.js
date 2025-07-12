(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const btn = document.getElementById("btn")

var circle = new ProgressBar.Circle('#container', {
    color: '#000',

    strokeWidth: 5,

    trailColor: '#eee',

    trailWidth: 3,

    duration: 500,

    easing: 'easeInOut',


    text: {
        value: '0%',

        style: {
            fontSize: '20px',
            fontWeight: 'bold',
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: {
                prefix: true,
                value: 'translate(-50%, -50%)'
            },
            margin: 0,
            padding: 0
        },

    },

    step: function (state, circle) {

        var value = Math.round(circle.value() * 100);
        circle.setText(value + '%');
    },

});

btn.addEventListener("click", (e) => {
    e.preventDefault()
    circle.animate(circle.value() + 0.25)
})
},{}]},{},[1]);
