CreatureRibosomeMirrorComponent = function (thereality) {
    this.reality = thereality;
    this.listernerId='CreatureRibosomeMirror'
    this.canvas=null

    this.initializeComponent = function () {
    }

    this.fillComponent = function () {
        //CreatureRibosomePrototype.prototype.baseMirror=CreatureRibosomePrototype.prototype.changes.length;

        CreatureRibosome.prototype.mirrorAngle=function(genome){
            var newgenome=''
            for (i=0;i<genome.length;i+=10){
                newgenome+=genome[i]+genome[i+1]+genome[i+2]+genome[i+3]
                var angle=parseInt(genome[i+4]+genome[i+5],16)
                // lets mirror angle
                angle=255-angle
                newgenome+=twodigits(angle.toString(16))
                //console.log('two digits '+twodigits(angle.toString(16)))
                for (j=6+i;j<=9+i;j++){
                    newgenome+=genome[j]
                }
            }
            return newgenome
        }



        CreatureRibosome.prototype.arnMirror=function(base,genome,section_nb,section_title){
            // mirror section
            var extraction=this.extractSubGenome(genome)

            // substract section
            if (extraction.subgenome.length > 0){
                var section_title_new=section_title+section_nb+"a";
                arn+=";"+section_title_new+"1="+section_title+section_nb+";"+section_title_new+'1'+this.decodePartialGenome(extraction.subgenome,1,section_title_new)+";";


            }

            var mirroredgenome=this.mirrorAngle(extraction.subgenome);
            if (mirroredgenome.length > 0){
                var section_title_new=section_title+section_nb+"b";
                arn+=";"+section_title_new+"1="+section_title+section_nb+";"+section_title_new+'1'+this.decodePartialGenome(mirroredgenome,1,section_title_new)+";";


            }
            if (extraction.tail.length > 0){
                var section_title_new=section_title+"a";
                arn+=";"+section_title_new+"1="+section_title+section_nb+";"+section_title_new+"1"+this.decodePartialGenome(extraction.tail,1,section_title_new)+";";
            }
            section_nb++;
            // extract section
            return arn;
        }


        CreatureRibosomePrototype.prototype.addChange(function(base,genome,section_nb,section_title){
            return this.arnMirror(base,genome,section_nb,section_title)
        })

    }

    this.startComponent = function () {
    }

    this.drawComponent = function () {
    }

    this.addComponentListeners()


}
