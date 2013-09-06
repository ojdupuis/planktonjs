addScript('CreatureSectionMouth', 'CreatureSectionMouth.js');

CreatureSectionMouthComponent = function (thereality) {
    this.reality = thereality;
    this.listenerId='CreatureSectionMouthComponent'

    this.initializeComponent = function () {
        CreatureSectionMouth.prototype = CreatureSectionPrototype.prototype;
        CreatureSectionMouth.prototype.component=this

        CreatureSectionMouth.weight = 5;
        CreatureSectionMouth.type = parseInt(1);
        CreatureSectionMouth.prototype.energyCost = 3;
        CreatureSectionMouth.prototype.registerSection('CreatureSectionMouth');
    }

    this.fillComponent = function () {
        // We add a listen for food object so that it responds to eat orders
        this.addListener('Food.instanciated',this.listenerId, function(event){
                  event[0].target.component.addListener('Food.eat',event[0].target.component.listenerId, function(food){
                      return function(event){
                          var mouth=event[0].target
                          if ((Math.abs(mouth.x - food.x) <= food.quantity) && (Math.abs(mouth.y - food.y) <= food.quantity)) {
                              if ((food.quantity > 0) && (mouth.p_creature.energy < mouth.p_creature.energy_max)) {
                                  food.quantity--;
                                  mouth.p_creature.energy = mouth.p_creature.energy+Math.round(food.component.getParameter('food_value'));
                              }
                          }
                      }
                  }(event[0].target))
              }
        )
        this.addParameter('eat_timeout', 200, 'CreatureSectionMouth','time period for eat action', 0, 1000, 0);

    }

    this.addComponentListeners()
}
