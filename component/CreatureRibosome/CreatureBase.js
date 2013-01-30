function CreatureBase(component,genome) {
    this.component=component
    // genome coded in hex
    this.genome = genome;
    this.canvas=component.canvas;


    this.readGenome=function(){

        // decode the base
        this.type = parseInt(genome[0] + genome[ 1], 16);
        this.changement = parseInt(genome[ 2] + genome[ 3], 16)/255*(CreatureRibosome.prototype.countChanges());
        this.angle =parseInt(genome[ 4] + genome[ 5], 16)/255*Math.PI*2;
        this.length =
            parseInt(genome[ 6] + genome[ 7], 16)
                *(this.component.getParameter( 'length_max') - this.component.getParameter('length_min'))/255
        this.length+= parseInt(this.component.getParameter('length_min'))

        this.vibration = parseInt(genome[ 8] + genome[ 9], 16);
        this.vibration=this.vibration/255*this.component.getParameter('vibration_max');
    }

    this.readGenome()


    this.getChange=function(){
            return Math.floor(this.changement)
        }

    /*
     * Method encode
     * param void
     * return string base"s genome encoded in hex
     *
     * encode the base in hex
     */
    this.encode = function () {
        return this.encodeType() + this.encodeChangement() + this.encodeAngle() + this.encodeLength() + this.encodeVibration();
    };

    this.encodeType=function(){
            return twodigits(this.type.toString(16));
    }

    this.encodeChangement=function(){
        return twodigits(parseInt(Math.floor(this.changement/(CreatureRibosome.prototype.countChanges())*255)).toString(16));
    }

    this.encodeAngle=function(){
        return twodigits(Math.round(this.angle/Math.PI/2*255).toString(16));
    }

    this.encodeLength=function(){
        return twodigits(Math.round((this.length-this.component.getParameter('length_min'))/(this.component.getParameter('length_max')-this.component.getParameter('length_min'))*255).toString(16));
    }

    this.encodeVibration=function(){
        return twodigits(Math.round(this.vibration/this.component.getParameter('vibration_max')*255).toString(16))
    }
    /*
     * Method draw
     * @param x int coordinate
     * @param y int coordinate
     * draw the base on main canvas
     *
     */
    this.draw = function (x, y) {
        var color = this.canvas.color(
            Math.round(this.angle/Math.PI/2)*128  ,
            (this.length - this.component.getParameter( 'length_min')) / (this.component.getParameter( 'length_max') - this.component.getParameter('length_min')) * 128,
            this.vibration / (this.component.getParameter('vibration_min') - this.component.getParameter('vibration_max')) * 128
        );
        this.canvas.stroke(color);
        this.canvas.fill(color);
        this.canvas.rect(
            x,
            y + this.component.getParameter('genomeMap_deltaheight') * (this.changement + 1),
            this.component.getParameter( 'genomeMap_basewidth'),
            this.component.getParameter( 'genomeMap_baseheight') - 2 * this.component.getParameter( 'genomeMap_deltaheight') * (this.changement + 1)
        );
    };
}
