function CreatureSectionEye(_x, _y, myangle, length, vibration, pointer, pointer_section) {
    this.init(_x, _y, myangle, length, vibration, pointer, pointer_section);

    /*
     * Method draw
     * param void
     * return void
     *
     * Draws the section
     */
    this.draw = function (view) {
        view.canvas.strokeWeight(Math.round(this.p_section.size(view,1)))
        if (this.p_creature.eating) {
            view.canvas.strokeWeight(2);
        }
        view.canvas.stroke(view.canvas.color(0, 0, 128), 200);
        view.canvas.fill(view.canvas.color(0, 0, 128), 200);
        view.canvas.line(this.p_section.X(view), this.p_section.Y(view), this.X(view), this.Y(view));
        view.canvas.ellipse(this.p_section.X(view), this.p_section.Y(view), this.p_section.size(view,3) , this.p_section.size(view,3));
        view.canvas.stroke(this.p_creature.color, 200);
        view.canvas.line(this.p_section.X(view), this.p_section.Y(view), this.X(view), this.Y(view));
    };

    this.component.registerAction('SectionEye.'+this.id+'.see_timeout',function (eye) {
        return function () {
            eye.component.fire({type: 'Food.see', target: eye})
        }
    }(this),  'see_timeout',this);


}

