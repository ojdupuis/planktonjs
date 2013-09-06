function CreatureSectionBasic(_x, _y, myangle, length, vibration, pointer, pointer_section) {
    this.init(_x, _y, myangle, length, vibration, pointer, pointer_section);
    /*
     * Method draw
     * param void
     * return void
     *
     * Draws the section
     */
    this.draw = function (view) {
        view.canvas.strokeWeight(Math.round(1 * view.zoom_scale));
        if (this.p_creature.eating) {
            view.canvas.strokeWeight(2);
        }
        view.canvas.stroke(this.p_creature.color, 200);

        if (this.vibr_max == 0) {
            view.canvas.fill(view.canvas.color(255, 255, 255), 200);
        } else {

            view.canvas.fill(this.p_creature.color, 200);
        }
        view.canvas.line(this.p_section.X(view), this.p_section.Y(view), this.X(view), this.Y(view));
        //this.canvas.ellipse(this.p_section.X(),this.p_section.Y(),3*this.p_creature.reality.zoom_scale,3*this.p_creature.reality.zoom_scale);
    };

    this.action = function () {

    }

}

//CreatureSectionBasic.prototype.component=CreatureSectionBasicComponent
//CreatureSectionBasic.prototype=AbstractDrawable.prototype;


