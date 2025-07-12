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