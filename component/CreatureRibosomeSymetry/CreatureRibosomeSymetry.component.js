CreatureRibosomeSymetryComponent = function (thereality) {
    this.reality = thereality;
    this.listernerId='CreatureRibosomeSymetry'
    this.canvas=null

    this.initializeComponent = function () {
    }

    this.fillComponent = function () {
        CreatureRibosome.prototype.arnSymetry=function(base,genome,section_nb,section_title){
            // mirror section
            var extraction=this.extractSubGenome(genome)

            if (extraction.subgenome.length > 0){
                var slices=Math.round(((this.component.getParameter('genome_max_symetry')-2)*Math.random()))+2;
                var section_title_new=section_title+section_nb+"Sb";
                for (var i=0;i<slices;i++){

                    var mirroredgenome=this.symetryAngle(extraction.subgenome,i,slices);
                    if (mirroredgenome.length > 0){
                        arn+=";"+section_title_new+i+"="+section_title+section_nb+";"+section_title_new+i+this.decodePartialGenome(mirroredgenome,i,section_title_new)+";";
                    }
                }
            }
            if (extraction.tail.length > 0){
                var section_title_new=section_title+section_nb+"Sa";
                arn+=";"+section_title_new+"1="+section_title+section_nb+";"+section_title_new+"1"+this.decodePartialGenome(extraction.tail,1,section_title_new)+";";
            }
            section_nb++;
            return arn;
        }

        CreatureRibosome.prototype.symetryAngle=function(genome,nb,slices){
          var newgenome=''
            for (var i=0;i<genome.length;i+=10){
                var b=new CreatureBase(this.component,genome.substr(i,10))
                b.angle=((Math.PI*2*nb/slices)+ b.angle)%(Math.PI*2);
                newgenome+= b.encode();
            }

            return newgenome
        }

        CreatureRibosomePrototype.prototype.addChange(function(base,genome,section_nb,section_title){
            return this.arnSymetry(base,genome,section_nb,section_title)
        })

    }

    this.startComponent = function () {
    }

    this.drawComponent = function () {
    }

    this.addComponentListeners()


}
