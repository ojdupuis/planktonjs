addScript('Setup', 'Setup.js');

SetupComponent = function (thereality) {
    this.reality = thereality;
    this.listenerId='SetupComponent'

    this.initializeComponent = function () {
        this.setup = new Setup(this.reality);
        this.reality.setup=this.setup
        this.fire('Setup.instanciated')
    }

    this.fillComponent = function () {
    }

    this.startComponent = function () {
    }

    this.addComponentListeners()
}