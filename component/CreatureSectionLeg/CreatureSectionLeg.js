function CreatureSectionLeg(_x, _y, myangle, length, vibration, pointer, pointer_section) {
    //this.__proto__=CreatureSectionPrototype
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
        view.canvas.stroke(this.p_creature.color, 200);
        view.canvas.fill(this.p_creature.color, 200);
        view.canvas.line(this.p_section.X(view), this.p_section.Y(view), this.X(view), this.Y(view));
        // drawing few legs
        var length = 1;
        var nb = Math.round(this.length / 4);

        view.canvas.stroke(view.canvas.color(0, 0, 0), 200);

        for (i = 1; i <= nb - 1; i++) {
            var xstart = (this.p_section.x - this.x) * i / nb + this.x;
            var ystart = (this.p_section.y - this.y) * i / nb + this.y;

            // one leg
            var x3 = xstart + Math.round(Math.cos(this.anglevibrated + Math.PI / 2) * length);
            var y3 = ystart + Math.round(Math.sin(this.anglevibrated + Math.PI / 2) * length);
            view.canvas.line(this.X(view,xstart), this.Y(view,ystart), this.X(view,x3), this.Y(view,y3));
            // opposite leg
            x3 = xstart + Math.round(Math.cos(this.anglevibrated - Math.PI / 2) * length);
            y3 = ystart + Math.round(Math.sin(this.anglevibrated - Math.PI / 2) * length);
            view.canvas.line(this.X(view,xstart), this.Y(view,ystart), this.X(view,x3), this.Y(view,y3));
        }
        // end

    };

    this.p_creature.moveForce += 6;

}
