function CreatureSectionMouth(_x, _y, myangle, length, vibration, pointer, pointer_section) {
    //this.__proto__=CreatureSectionPrototype
    this.init(_x, _y, myangle, length, vibration, pointer, pointer_section);
     console.log('Mouth')

    /*
     * Method draw
     * param void
     * return void
     *
     * Draws the section
     */
    this.draw = function (view) {
        view.canvas.strokeWeight(Math.round(view.size(view,1)));
        view.canvas.stroke(this.p_creature.color, 200);

        //this.canvas.line(this.p_section.X(),this.p_section.Y(),this.X(),this.Y());
        var length = Math.round(Math.random() * 3) + 1;
        view.canvas.noFill();
        var xstart = (this.p_section.x - this.x) / 2 + this.x;
        var ystart = (this.p_section.y - this.y) / 2 + this.y;
        var x2 = xstart + Math.round(Math.cos(this.anglevibrated + Math.PI / 2) * length);
        var y2 = ystart + Math.round(Math.sin(this.anglevibrated + Math.PI / 2) * length);

        var x3 = xstart + Math.round(Math.cos(this.anglevibrated - Math.PI / 2) * length);
        var y3 = ystart + Math.round(Math.sin(this.anglevibrated - Math.PI / 2) * length);
        view.canvas.quad(this.X(view), this.Y(view), this.X(view,x2), this.Y(view,y2), this.p_section.X(view), this.p_section.Y(view), this.X(view,x3), this.Y(view,y3));
        view.canvas.fill(this.p_creature.color, 200);
    };

    /* Method eat
     * param void
     * return boolean : has eaten or not, the section checks if over food
     */
    this.eat = function () {
        var ret = false;
        for (var i in this.p_creature.reality.food) {
            if ((Math.abs(this.x - this.p_creature.reality.food[i].x) <= this.p_creature.reality.food[i].quantity) &&
                (Math.abs(this.y - this.p_creature.reality.food[i].y) <= this.p_creature.reality.food[i].quantity)) {
                if ((this.p_creature.reality.food[i].quantity > 0) && (this.p_creature.energy < this.p_creature.energy_max)) {
                    this.p_creature.reality.food[i].quantity--;
                    this.p_creature.energy += this.p_creature.reality.food_value;
                    ret = true;
                }
            }
        }
        return ret;
    };
    //this.p_creature.reality.registerAction('this.creatures['+this.p_creature.id+'].sections['+this.id+'].eat()','section','eat_timeout');
    this.component.registerAction('CreatureSectionMouth.'+this.id+'.eat_timeout',function (mouth) {
        return function () {
            mouth.fire({ type:'Food.eat', target: mouth})
        }
    }(this), 'eat_timeout',this);

}



