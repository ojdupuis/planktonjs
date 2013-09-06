addScript('Interface', 'Interface.js');

InterfaceComponent = function (thereality) {
    this.reality = thereality;
    this.listenerId='InterfaceComponent'


    this.initializeComponent = function () {
        this.interface = new Interface(this.reality);

    }

    this.fillComponent = function () {
    }

    this.startComponent = function () {
        this.interface.draw();
    }

    this.drawComponent = function () {
    }
    this.addComponentListeners()
}
