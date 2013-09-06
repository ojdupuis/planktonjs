addScript('CreatureRibosome', 'CreatureBase.js');
addScript('CreatureRibosome', 'CreatureRibosome.js');

CreatureRibosomeComponent = function (thereality) {
    this.reality = thereality;
    this.listernerId='CreatureRibosome'
    this.canvas=null

    this.initializeComponent = function () {
    }

    this.fillComponent = function () {
        // mutation control
        this.addParameter('mutate_base_ratio', 50, 'Ribosome','???', 0, 100, 0);
        this.addParameter('mutate_push_ratio', 20, 'Ribosome', '???',0, 100, 0);
        this.addParameter('mutate_add_ratio', 5, 'Ribosome', '???',0, 100, 0);
        this.addParameter('mutate_add_coef', 50, 'Ribosome', '???',0, 100, 0);
        this.addParameter('generateGenomeNoChange', 75, 'Ribosome','???', 0, 100, 0);
        //this.addParameter('generateGenomeNext', 75  , 'Ribosome','???', 0, 100, 0);
        //this.addParameter('generateGenomePrev', 90, 'Ribosome','???', 0, 100, 0);

        // section change while generating (increasing to max 100)
        this.addParameter('genomeMap_basewidth', 3, 'Ribosome','???', 0, 50, 0);
        this.addParameter('genomeMap_baseheight', 25, 'Ribosome','???', 0, 50, 0);
        this.addParameter('genomeMap_deltaheight', 2, 'Ribosome','???', 0, 50, 0);

        // creature control
        this.addParameter('genomeMaxLength',100, 'Ribosome','???', 0, 1000, 0);
        this.addParameter('genomeMinLength', 10, 'Ribosome','???', 0, 200, 0);
        this.addParameter('genomeMinSubLength',10,'Ribosome','Minimum length of a subgenome',1,50,0)
        this.addParameter('genome_max_angle', Math.PI, 'Ribosome', '???', 0, 10, 0);
        this.addParameter('genome_min_angle', 0, 'Ribosome', '???', 0, 100, 0);
        this.addParameter('genome_max_symetry', 8, 'Ribosome', '???', 0, 20, 0);
        //this.addParameter('genome_changenb', 3, 'Ribosome', '???', 0, 20, 0);
        this.addParameter('genome_maxchange', 30, 'Ribosome', '???', 0, 2000, 0);
        this.addParameter('genomeMaxDepth', 6, 'Ribosome', '???', 0, 2000, 0);


    }

    this.startComponent = function () {
    }

    this.drawComponent = function () {
    }

    this.addComponentListeners()

    this.addListener('CreatureInterface.canvasInstanciated',this.listenerId, function(component){
        return function(event){
            component.canvas=event[0].target
        }
    }(this))

    this.addListener('CreatureInterface.ribosomeCreature',this.listenerId, function(component){
        return function(event){
            ribosome = new CreatureRibosome(component,component.canvas);            
            ribosome.draw(event[0].target.genome);
        }
    }(this))

    this.addListener('CreatureInterface.newGenome',this.listenerId, function(component){
        return function(event){
            var ribosome = new CreatureRibosome(component,component.canvas);
            var genome=ribosome.generateGenome(this.getParameter('genomeMaxLength'), this.getParameter('genomeMinLength'),1)
            this.fire({ type:'CreatureRibosome.newCreature', target: { genome: genome, ribosome: ribosome}});
        }
    }(this))

    this.addListener('CreatureRibosome.drawBase',this.listernerId, function(component){
        return function(event){
            var base = new CreatureBase(component,event[0].target.genome.substr(event[0].target.index*10,10));
            var x=component.getParameter('genomeMap_basewidth')*(event[0].target.index+1)+5;
            var y=1
            base.draw(x, y);
        }
    }(this))

    this.addListener('CreatureInterfaceComponent.setupCanvasGenome', this.listernerId, function(component){
        return function(event){
            component.canvas=event[0].target
        }
    }(this))

    this.addListener('Creature.clone', this.listenerId, function (component) {
        return function (event) {
            var ribosome=new CreatureRibosome(component,component.canvas)
            this.fire({ type:'CreatureRibosome.newCreature', target: { genome: event[0].target.genome, ribosome: ribosome}});
        }
    }(this)
    )
    this.addListener('Creature.mutate', this.listenerId, function (component) {
        return function (event) {
            var ribosome=new CreatureRibosome(component,component.canvas)
            this.fire({ type:'CreatureRibosome.newCreature', target: { genome: ribosome.mutateGenome(event[0].target.genome), ribosome: ribosome}});
        }
    }(this)
    )

    this.addListener('CreatureInterface.createGenome', this.listenerId,function(component){
        return function(event){
            var ribosome=new CreatureRibosome(component,component.canvas)
            this.fire({ type:'CreatureRibosome.newCreature', target: { genome: event[0].target, ribosome: ribosome}});
        }
    }(this))

}
