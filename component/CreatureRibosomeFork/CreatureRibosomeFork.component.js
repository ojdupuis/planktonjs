CreatureRibosomeForkComponent = function (thereality) {
    this.reality = thereality;
    this.listernerId='CreatureRibosomeFork'
    this.canvas=null

    this.initializeComponent = function () {
    }

    this.fillComponent = function () {


        CreatureRibosome.prototype.arnFork=function(base,genome,section_nb,section_title){
            // fork section
            var extraction=this.extractSubGenome(genome)

            if (extraction.subgenome.length > 0){
                var section_title_new=section_title+"y";
                arn+=";"+section_title_new+"1="+section_title+section_nb+";"+section_title_new+'1'+this.decodePartialGenome(extraction.subgenome,1,section_title_new)+";";
            }

            if (extraction.tail.length > 0){
                var section_title_new=section_title+"x";
                arn+=";"+section_title_new+"1="+section_title+section_nb+";"+section_title_new+"1"+this.decodePartialGenome(extraction.tail,section_nb,section_title_new)+";";
            }
            section_nb++;
            return arn;
        }

        CreatureRibosomePrototype.prototype.addChange(function(base,genome,section_nb,section_title)
        {
            return this.arnFork(base,genome,section_nb,section_title)
        })
    }

    this.startComponent = function () {
    }

    this.drawComponent = function () {
    }

    this.addComponentListeners()


}
