//addScript('interface','interface.registerTo.reality.js');
addCss('Interface', 'interface.css');

function Interface(component) {
    this.reality = component.reality;
    this.component = component;
    this.skin = 'modern';

    this.draw = function () {
        $('<div/>',{
            id: 'right_column',
            class: 'right_column'
        }).appendTo('#container')
        $('<div/>',{
            id: 'controls',
            class: 'monitor_box'
        }).appendTo('#right_column')
        $('<div/>',{
            id: 'btn_pause',
            class: 'monitor_box'
        }).appendTo('#controls')

        addbutton(
            'pause',
            'pause',
            function (object) {
                return function () {
                    object.component.fire('Reality.togglepause');
                }

            }(this),
            'marginten'
        ).appendTo('#btn_pause')

        this.component.fire({type: 'Interface.ready', target: this})

    }

    this.buttonPressed = function (id) {
        document.getElementById(id).className = document.getElementById(id).className.replace('gray', 'gray_active');
    }
    this.buttonUnpressed = function (id) {
        document.getElementById(id).className = document.getElementById(id).className.replace('gray_active', 'gray');
    }

}
