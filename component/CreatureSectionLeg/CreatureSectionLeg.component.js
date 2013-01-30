addScript('CreatureSectionLeg', 'CreatureSectionLeg.js');

CreatureSectionLegComponent = function (thereality) {
    this.reality = thereality;
    this.listenerId='CreatureSectionLegComponent'

    this.initializeComponent = function () {
        CreatureSectionLeg.prototype = CreatureSectionPrototype.prototype;
        CreatureSectionLeg.prototype.component=this

        CreatureSectionLeg.weight = 15;
        CreatureSectionLeg.type = parseInt(3);
        CreatureSectionLeg.prototype.energyCost = 10;
        CreatureSectionLeg.prototype.registerSection('CreatureSectionLeg');
    }

    this.addComponentListeners()
}
