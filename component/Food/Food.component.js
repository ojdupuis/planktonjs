addScript('Food', 'Food.js');
function FoodComponent(thereality) {
    this.reality = thereality;
    this.listenerId='FoodComponent'
    this.view=null
    //this.name='FoodComponent'

    this.initializeComponent = function () {
        this.instances = [];
        this.number = 0;
        this.reality.food = this;
    }

    this.fillComponent = function () {
        this.addParameter('food_growth', 10000, 'Food','delay for food growth msec', 0, 20000, 0);
        this.addParameter('food_value', 30, 'Food','value of each for bite in energy', 0, 200, 0);
        this.addParameter('food_max_quantity', 50, 'Food','max quantity of food spot', 0, 200, 0);
        this.addParameter('food_growth_time', 2000, 'Food','delay for food growth msec', 0, 8000, 1);
        this.addParameter('food_rnd_max', 50, 'Food','food spot size max', 0, 200, 0);
        this.addParameter('food_rnd_min', 10, 'Food','food spot size min', 0, 200, 0);
    }


    this.startComponent = function (view) {

    }

    this.addListener('View.start', this.listenerId,function (component) {
        return function (event) {
            component.view=event[0].target
            this.food_nb = 0;
            nb = Math.round(Math.random() * (component.getParameter('food_rnd_max') - component.getParameter('food_rnd_min')) + component.getParameter('food_rnd_min'));
            component.instances = [];
            for (var i = 0; i < nb; i++) {
                component.instances[i] = new Food(component, i);
                component.instances[i].init(component.view);

            }
        }
    }(this));

    this.addComponentListeners()
}



