

function CreatureRibosome(component,canvas) {
    this.component=component
    this.canvas=canvas
    // internal heap for mutation
    this.heap = '';
// counter, number of sections
    this.section_nb = 1;
    this.genomeSize=0;
    this.genomeFork=0
    this.baseStop=1
}


CreatureRibosome.prototype=CreatureRibosomePrototype.prototype
