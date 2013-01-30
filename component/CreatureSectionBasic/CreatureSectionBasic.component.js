addScript('CreatureSectionBasic', 'CreatureSectionBasic.js');

CreatureSectionBasicComponent = function (thereality) {
    this.reality = thereality;
    this.listenerId='CreatureSectionBasicComponent'

    this.initializeComponent = function () {
        CreatureSectionBasic.prototype = CreatureSectionPrototype.prototype;
        CreatureSectionBasic.prototype.component=this
        CreatureSectionBasic.weight = 100;
        CreatureSectionBasic.type = parseInt(0);
        CreatureSectionBasic.prototype.energyCost = parseInt(1);
        CreatureSectionBasic.prototype.registerSection('CreatureSectionBasic');
    }

    this.startComponent = function (view) {
        this.view=view;
    }


    this.addComponentListeners()

    /*
    this.addListener('Reality.startComponent', this.listenerId,function (component) {
        return function () {
            console.log('Section basic initialize')
            component.initializeComponent();
        }
    }(this));
    */
}
/*
 CreatureSectionBasicComponent.prototype=Component.prototype;
 Reality.prototype.registerComponent('creature.section.basic',CreatureSectionBasicComponent);
 */

