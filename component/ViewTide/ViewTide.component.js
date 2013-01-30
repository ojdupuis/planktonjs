addScript('ViewTide', 'ViewTide.js');
function ViewTideComponent(thereality) {
    this.reality = thereality;
    this.listenerId='ViewTideComponent'
    this.view=thereality.view
    this.tide=null
    //this.name='FoodComponent'

    this.initializeComponent = function () {

    }

    this.fillComponent = function () {
        this.addParameter('tide_timeout', 20, 'Tide','Time interval for tide on creature', 0, 1000, 0);
        this.addParameter('tide_amplitude', 0.5, 'Tide','Tide amplitude at each cycle', 0, 5, 0);
        this.addParameter('tide_timedividerX', 30, 'Tide','Tide time  divider', 0, 100, 0);
        this.addParameter('tide_timedividerY', 50, 'Tide','Tide time  divider', 0, 100, 0);
    }


    this.startComponent = function () {
        this.tide=new ViewTide(this,1)

        this.addListener('Creature.birth', this.listenerId, function (component) {
            return function (event) {
                component.tide.addTide(event[0].target);
            }
        }(this));
        /*

         //@TODO deform food according to tide
        this.addListener('Food.instanciated', this.listenerId, function (component) {
            return function (event) {
                component.tide.addTide(event[0].target);
            }
        }(this));
        */
        this.addListener('Creature.kill', this.listenerId, function (component) {
            return function (event) {
                component.tide.removeTide(event[0].target);
            }
        }(this));
        this.tide.addTideBg(this.view);

        //@TODO gerer evenaement pause global
        this.addListener('Tide.pause', this.listenerId, function (component) {
            return function (event) {
                component.tide.tooglePause();
            }
        }(this));


    }

    this.addListener('View.start', this.listenerId, function (component) {
        return function (event) {
            component.view = event[0].target;
        }
    }(this));

    this.addComponentListeners()
}