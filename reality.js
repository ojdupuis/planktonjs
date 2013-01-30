function Reality(id) {
    this.name = 'Reality'
    this.zoom_size_x = this.zoom_x
    this.zoom_size_y = this.zoom_y
    this.creatures=[];
    this.id=id;
    this.listenerId='Reality'+this.id;

    this.canvas_genome = null;

    // Array for component instanciation
    this.component = [];

    // associative array containing the actions registered by members of reality, for pause's sake
    this.actionCallback = [];

    this.pause = false;

    this.init = function () {
        //this.canvas_genomeid = canvas_genomeid;
        var myComponent = new Component(this);

        //Instanciate Component
        for (component in this.registeredComponent) {
            window[component].prototype = new Component(this);
            window[component].constructor = window[component]
            this.component[component] = new window[component](this);
            // Add methods from component prototype
            this.component[component].__proto__ = new Component(this);
        }
        this.fire('Reality.initializeComponent')
        this.fire('Reality.fillComponent')
        this.fire('Reality.startComponent')
    }

    this.dopause = function () {
        this.pause = true;
    }

    this.unpause = function(){
        this.pause = false;
        this.goActions();
    }

    this.activate = function (componentName) {
        this.registerComponent(componentName);
    }
    this.isActivated = function (componentName) {
        return (this.registeredComponent[componentName + 'Component'] == true);
    }
    // Components of reality must be set in prototype because registration is done before reality is instanciated
    this.registeredComponent = [];

    this.registerComponent = function (name) {
        this.registeredComponent[name + 'Component'] = true;
    }

    this.addListener('Reality.pause', this.listenerId,function (component) {
        return function (e) {
            component.dopause();
        }
    }(this));
    this.addListener('Reality.unpause', this.listenerId,function (component) {
        return function (e) {
            component.unpause();
        }
    }(this));
    this.addListener('Reality.togglepause', this.listenerId, function(component){
        return function(e){
            if (component.pause) {
                component.fire({ type: 'Reality.unpause', target: this})
            } else {
                component.fire({ type: 'Reality.pause', target: this})
            }
        }
    }(this))


}

Reality.prototype=new Component();



