//addScript('ViewTideInterface', 'ViewTideInterface.js');

ViewTideInterfaceComponent = function (thereality) {
    this.reality = thereality;
    this.listenerId="ViewTideInterfaceComponent"

    this.initializeComponent = function () {

    }

    this.fillComponent = function () {
        this.addListener('Interface.ready', this.listenerId,function (component) {
            return function () {
                component.drawComponent()
            }
        }(this));
    }

    this.drawComponent = function () {
        $('<div/>',{
            class: 'tweak_container',
            id: 'viewtide_container'
        }).appendTo('#controls')
        var btn=addbutton('Tide', 'Tide',
            function (tideInterfaceComponent) {
                return function(){tideInterfaceComponent.fire('Tide.pause');}

            }(this),
            'marginten')
        btn.appendTo('#viewtide_container')
        $('#viewtide_container').appendTo('#controls')
        /*var tmp = document.createElement('div');
        tmp.setAttribute('class', 'tweak_container');
        tmp.setAttribute('id', 'viewtide_container');
        tmp.appendChild(addbutton('Tide', 'Tide',
            function (tideInterfaceComponent) {
                return function(){tideInterfaceComponent.fire('Tide.pause');}

            }(this),
            'marginten')
        )
        document.getElementById('controls').appendChild(tmp);*/
    }

    this.startComponent=function(){
    }

    this.addComponentListeners()
}