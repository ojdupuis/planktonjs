CreatureRibosomePrototype=function(){

}

CreatureRibosomePrototype.prototype=Event.prototype

CreatureRibosomePrototype.prototype.baseStop=0
CreatureRibosomePrototype.prototype.changes=[0,1]



/*
 * Method draw
 * param string genome encoded in hex
 * return void
 */
CreatureRibosomePrototype.prototype.draw = function (genome) {
    var x = 5;
    var y = 1;
    var i = 0;

    //@TODO trouver equivalent clear en 1.4
    this.canvas.background(255);
    for (i = 0; i < this.getSize(genome); i++) {
        this.fire({ type:'CreatureRibosome.drawBase', target:{genome: genome, index: i}})
    }
    this.canvas.redraw();
}

CreatureRibosomePrototype.prototype.addChange=function(callback,id){
    if (typeof id == 'undefined'){
        CreatureRibosomePrototype.prototype.changes[CreatureRibosomePrototype.prototype.changes.length]=callback
    } else {
        CreatureRibosomePrototype.prototype.changes[id]=callback
    }
}

CreatureRibosomePrototype.prototype.countChanges=function(){
    return CreatureRibosomePrototype.prototype.changes.length
}

CreatureRibosomePrototype.prototype.searchStop=function(genome){
    var pile=0
    // we look for the next same level stop
    for (i=1;i<this.getSize(genome);i+=1){
        var base = new CreatureBase(this.component,genome.substr(i*10,10));
        if (base.getChange() == this.baseStop){
            if (pile == this.baseNoChange){
                return i
            } else {
                pile--
            }
        } else if (base.getChange() != this.baseNoChange){
            pile++
        }
    }

    return i
}

CreatureRibosomePrototype.prototype.decodePartialGenome=function(genome,section_nb,section_title){
    arn="";
    if (genome.length > 0){
        var base = new CreatureBase(this.component,genome.substr(0,10));
        try {
            // Call the registered changed type
            return this.changes[base.getChange()].call(this,base,genome,section_nb,section_title);
        }
        catch(e){
            throw new Error('Change unknown :#'+base.getChange())
        }
    } else {
        return ""
    }
}


CreatureRibosomePrototype.prototype.extractSubGenome=function(genome){
    var stop=this.searchStop(genome)
    var subgenome=genome.substr(10,((stop-1)*10));
    var newgenome=genome.substr((stop*10+10));

    return { 'subgenome': subgenome, 'tail': newgenome}
}


/*
 * Method decodeGenome
 * param string genome encoded in hex
 * return string js code of the spawn method of the invividu
 */
CreatureRibosomePrototype.prototype.decodeGenome = function (genome) {
    return ';s1'+this.decodePartialGenome(genome,1,'s');
}
/*
 * Method getSize
 * param string genome encoded in hex
 * return int number of bases in the genome (eg number of sections
 */
CreatureRibosomePrototype.prototype.getSize = function (genome) {
    return genome.length / 10;
}

/*
 * Method mutateAcid
 * param int value value coded by an acid to be mutated
 * param int min minimum value that can be taken by acid
 * param int max maximum value that can be taken by the acid
 * return int mutated value
 */
CreatureRibosomePrototype.prototype.mutateAcid = function (value, min, max) {
    d_min = min + 1;
    if (this.value > min) {          // internal heap for mutation
        this.heap = '';

        this
        d_min = min;
    }
    d_max = max - 1;
    if (this.number < max) {
        d_max = max;
    }
    return Math.round(Math.random() * (d_max - d_min) + d_min);
}

/*
 * Method mutateBase
 * param object Base Base to be mutated
 * return object Base : base with one acid mutated
 */
CreatureRibosomePrototype.prototype.mutateBase = function (base) {
    var mutateornot = Math.round(Math.random() * 100);
    if (mutateornot >= this.component.getParameter('mutate_base_ratio')) {
        var what = Math.round(Math.random() * 3);
        if (what == 0) {
            if (this.position > 1) {
                base.changement = this.mutateAcid(base.changement, 1,this.prototype.changes.length-1);
            }
        }
        if (what == 1) {
            base.angle = this.mutateAcid(base.angle, this.component.getParameter('genome_min_angle'), this.component.getParameter('genome_max_angle'));
        }
        if (what == 2) {
            base.length = this.mutateAcid(base.length, this.component.getParameter('length_min'), this.component.getParameter('length_max'));
        }
        if (what == 3) {
            base.vibration = this.mutateAcid(base.vibration, this.component.getParameter( 'vibration_min'), this.component.getParameter( 'vibration_max'));
        }
    }
    return base;
}

CreatureRibosomePrototype.prototype.randomizeBase = function () {
    var totalWeight = 0;
    for (var i = 0; i < CreatureSectionPrototype.prototype.getRegistered().length; i++) {

        if (CreatureSectionPrototype.prototype.getRegistered(i) !== undefined){
            var weight = window[CreatureSectionPrototype.prototype.getRegistered(i)].weight;
            totalWeight += weight;
        }
    }
    var rnd = Math.round(Math.random() * totalWeight);
    var retour = null;
    var weight = 0;
    for (var i = 0; i < CreatureSectionPrototype.prototype.getRegistered().length; i++) {
        weight += window[CreatureSectionPrototype.prototype.getRegistered(i)].weight;
        if (weight >= rnd) {
            retour = i;
            break;
        }
    }
    if (retour === null) {
        retour = CreatureSectionPrototype.prototype.getRegistered().length - 1;
    }
    return retour;
}

/*
 * Method generateBase
 * param void
 * return Object Base : randomly generated base
 */
CreatureRibosomePrototype.prototype.generateBaseGenome = function (changementid) {
    // generation chagement de section
    // 0 : no change
    // 1 : previous
    // 2 : next
    if (typeof changementid == 'undefined'){
        var changement=Math.round(Math.random()*100)
        if (changement <= this.component.getParameter('generateGenomeNoChange')) {
            this.section_nb++;
            changement=this.baseNoChange
        } else {
            if (this.genomeFork>this.component.getParameter('genome_maxchange')){
                changement= this.baseNoChange
            } else {
                var changement=Math.floor(Math.random()*(this.countChanges()-2)+2)
                this.genomeFork++;

            }
        }
    } else {
        var changement=changementid;

    }

    vibration=Math.round(Math.random() * 100);
    if (vibration > this.component.getParameter('vibration_threshold')){
        vibration = Math.round(Math.random() * 255);
    } else {
        vibration=0
    }
    if (changement == this.baseStop){
        this.genomeFork++
    } else {
        this.genomeFork--
    }

    changement=Math.floor( (changement+Math.random())/(this.countChanges())*255 )
    angle  = Math.round(Math.random() * 255);
    length = Math.round(Math.random() * 255);
    type= this.randomizeBase()
    return twodigits(type.toString(16)) + twodigits(changement.toString(16)) + twodigits(angle.toString(16)) + twodigits(length.toString(16)) + twodigits(vibration.toString(16));
}

/*
 * Method generateGenome
 * param int min minimum length of genome (# Bases)
 * param int max maximum length of genome (# Bases)
 * return string randomly generated genome encoded in hex
 */
CreatureRibosomePrototype.prototype.generateGenome = function (max, min,depth) {
    var genome = '';
    var tt=(max-this.genomeSize)/max/Math.sqrt(Math.sqrt(Math.sqrt(depth)))
    if (((Math.random()>(max-this.genomeSize)/max/Math.sqrt(Math.sqrt(Math.sqrt(depth))))&&(this.genomeSize > this.component.getParameter('genomeMinLength')))||(depth > this.component.getParameter('genomeMaxDepth'))){

        return "";
    }

    var base=new CreatureBase(this.component,this.generateBaseGenome());
    this.genomeSize++

    if ((base.getChange() != this.baseNoChange)&&(max > this.genomeSize)){
        var subgenome=this.generateGenome(max-this.genomeSize,min,depth+1);

        if (subgenome.length >0){
            genome += base.genome+ subgenome
            // generate a random stop base
            genome+=this.generateBaseGenome(this.baseStop);;
            this.genomeSize+=this.getSize(subgenome);
        }
    } else {
        genome += base.genome;
    }
    if (max > this.genomeSize){
        var tailgenome=this.generateGenome(max-this.genomeSize,min,depth);
        if ((tailgenome.length >0)){
            genome += tailgenome
            this.genomeSize+=this.getSize(tailgenome);


        }
    }
    return genome;
}


/*
 * Method mutateGenome
 * param string genome encoded in hex
 * return string mutated genome
 *
 * mutations include adding sections, removing section, moving sections, mutation of base or acid
 */
CreatureRibosomePrototype.prototype.mutateGenome = function (genome) {
    taille = this.getSize(genome);
    mutatedGenome = '';
    for (i = 0; i < taille; i++) {
        var base = new CreatureBase(this.component,genome.substr(i*10,10));
        // Decide push to heap
        var push = Math.round(Math.random() * this.component.getParameter('mutate_push_ratio'));
        if (push == 0) {
            this.push(this.mutateBase(base).encode());
        } else if ((push == 1) && (this.heap.length > 0)) {
            mutatedGenome += this.pop();
            mutatedGenome += this.mutateBase(base).encode();
        } else {
            mutatedGenome += this.mutateBase(base).encode();
        }
        // Decide to add bases
        var add = Math.round(Math.random() * this.component.getParameter('mutate_add_ratio'));
        if (add == 0) {
            var nbbase=Math.random() * this.component.getParameter('mutate_add_coef')
                if (nbbase+this.getSize(mutatedGenome) < this.component.getParameter('genomeMaxLength')){
            mutatedGenome += this.generateGenome(nbbase, 1,1);
            }
        }

    }
    return mutatedGenome;
}

/*
 * Method push
 * param string Base genome encoded in hex to be push onto the heap during mutation
 * return void
 */
CreatureRibosomePrototype.prototype.push = function (bases) {
    this.heap += bases;
}

/*
 * Method pop
 * param void
 * return string genome to be poped during mutation
 */
CreatureRibosomePrototype.prototype.pop = function () {
    var out = this.heap;
    this.heap = '';
    return out;
}

CreatureRibosomePrototype.prototype=Event.prototype
