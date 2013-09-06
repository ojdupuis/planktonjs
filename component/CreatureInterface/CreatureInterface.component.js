addScript('CreatureInterface', 'CreatureInterface.js');

CreatureInterfaceComponent = function (reality) {
    this.reality = reality;
    this.listenerId='CreatureInterfaceComponent'
    this.canvas_genome = null;

    this.initializeComponent = function () {
    }

    this.fillComponent = function () {
    }

    this.startComponent = function () {
        // Instanciate interface object
        this.interface = new CreatureInterface(this);

        this.fire({ type: 'CreatureInterfaceComponent.setupCanvasGenome', target: this.interface.canvas_genome})


    }

    this.drawComponent = function () {
            this.fire('CreatureInterfaceComponent.draw')
    }

    this.addListener('View.draw', this.listenerId,function (component) {
        return function () {
            component.drawComponent()
        }
    }(this));

    this.addComponentListeners()
}
