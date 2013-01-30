CreatureRibosomeNoChangeComponent = function (thereality) {
    this.reality = thereality;
    this.listernerId='CreatureRibosomeNoChange'
    this.canvas=null

    this.initializeComponent = function () {

    }

    this.fillComponent = function () {
        CreatureRibosomePrototype.prototype.baseNoChange=1
        CreatureRibosome.prototype.arnNoChange=function(base,genome,section_nb,section_title){
            // no section change
            arn = arn + '.dL(';
            arn = arn + base.type + ',' + base.angle + ',' + base.length + ',' + base.vibration + ')';
            if (genome.substr(10).length >  0){
                arn+=this.decodePartialGenome(genome.substr(10),section_nb,section_title);
            }
            return arn
        }

        CreatureRibosomePrototype.prototype.addChange(function(base,genome,section_nb,section_title){
            return this.arnNoChange(base,genome,section_nb,section_title)
        },CreatureRibosomePrototype.prototype.baseNoChange)

    }

    this.startComponent = function () {
    }

    this.drawComponent = function () {
    }

    this.addComponentListeners()


}
