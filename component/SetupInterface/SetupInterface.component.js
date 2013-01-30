addExternalLib('SetupInterface', 'slider/js/jshashtable-2.1_src.js');
addExternalLib('SetupInterface', 'slider/js/jquery.numberformatter-1.2.3.js');
addExternalLib('SetupInterface', 'slider/js/tmpl.js');
addExternalLib('SetupInterface', 'slider/js/jquery.dependClass-0.1.js');
addExternalLib('SetupInterface', 'slider/js/draggable-0.1.js');
addExternalLib('SetupInterface', 'slider/js/jquery.slider.js');

addCss('SetupInterface', 'setup.css');

addExternalCss('SetupInterface', 'slider/css/jslider.css');
addExternalCss('SetupInterface', 'slider/css/jslider.creature.css');

addScript('SetupInterface', 'SetupInterface.js');

SetupInterfaceComponent = function (thereality) {
    this.reality = thereality;
    this.listenerId="SetupInterfaceComponent"
    this.initializeComponent = function () {
        this.setup=thereality.component.SetupComponent.setup;
        this.setupInterface=new SetupInterface(this)
    }

    this.fillComponent = function () {
        this.addParameter('maxrowpercolumn', 4, 'SetupInterface', '???', 0, 50, 0);
    }

    this.startComponent = function () {
        this.setupInterface.drawInterface();
        this.fire({type: 'SetupInterface.ready', target: this.setupInterface})
    }

    this.addComponentListeners()
    
    this.addListener('SetupInterface.refresh',this.listenerId,function(component){
    	return function(event){
    		console.log(component)
    		component.setupInterface.refresh(event[0].target)
    	}
    }(this))
}