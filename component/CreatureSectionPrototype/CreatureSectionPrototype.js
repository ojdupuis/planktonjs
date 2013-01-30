
function CreatureSectionPrototype(_type, _x, _y, myangle, length, vibration, pointer, pointer_section) {
    var sectiontype = this.getRegistered(_type);
    // Link the section to component as this object is not instanciated by it


    return new window[sectiontype](_x, _y, myangle, length, vibration, pointer, pointer_section);
}
CreatureSectionPrototype.prototype = AbstractDrawable.prototype;
CreatureSectionPrototype.prototype.registeredSections = [];

/*
 * Method init
 */
CreatureSectionPrototype.prototype.init = function (_x, _y, myangle, length, vibration, pointer, pointer_section) {

    // coordinates
    this.x = _x;
    this.y = _y;
    // coordinates of pixel end of section
    this.x2 = _x;
    this.y2 = _y;

    //pointer to creature
    this.p_creature = pointer;
    this.reality = this.p_creature.reality
    this.id = this.p_creature.sections.length;
    this.listenerId='CreatureSection.'+this.p_creature.id+'.'+this.id
    // pointer to canvas for drawing
    this.canvas = this.p_creature.view.canvas;
    this.view=this.p_creature.view;
    // vibration to apply to angle
    this.vibr = 0.1;
    //Max vibration  angle (absolute value)
    this.vibr_max = null;
    this.vibrsinus=0;

    //vibration increment
    this.d_vibr = this.component.getParameter('vibration_incr');
    // vibration coeficient that can be set on the creature
    this.coef_vibr = this.p_creature.coef_vibr;

    //Initialize vibration based on genome value
    if (vibration > 0) {
        this.vibr_max =  vibration;

    } else {
        this.vibr_max = 0;
    }

    // Initialize pointer to parent section (itself if first)
    if (pointer_section == null) {
        this.p_section = this;
    } else {
        this.p_section = pointer_section;
    }
    this.length = length;
    this.angle = myangle;
    this.anglevibrated = myangle;
    this.register();

    this.component.registerAction('Section.'+this.id+'.energy_timeout',
        function (object) {
            return function(){
                object.p_creature.energy -= object.energyCost / object.component.getParameter('energyRatio');
                if (object.p_creature.energy <= 0){
                    object.component.fire({ type: 'Creature.kill', target: object.p_creature})
                }
            }
        }(this),
        'energy_timeout',
        this
    );

    this.addListener('View.draw',this.listenerId,function(component){
        return function(event){
            component.draw(event[0].target)
        }
    }(this)
    )

    this.addListener('Creature.kill.'+this.p_creature.id,this.listenerId,function(component){
        return function(event){
            component.kill()
        }
    }(this)
    )



}


CreatureSectionPrototype.prototype.kill=function(){
    this.removeListener('View.draw',this.listenerId)
}

CreatureSectionPrototype.prototype.vibrate=function(){
    return this.vibrateSinusoid()+this.vibrateRandomly()+this.vibrateRandomly()
    //return this.vibrateRandomly()
}

/*
 * Method Vibrate
 *  @param void
 *  return : float delta to apply to angle
 *
 */
CreatureSectionPrototype.prototype.vibrateSinusoid = function () {
    this.vibrsinus=parseFloat(this.p_section.vibrsinus)+parseFloat(0.1)
    if (this.vibrsinus > Math.PI*2){
        this.vibrsinus=0;
    }
    if (this.vibr_max>0){
        if (this.angle < 0){
            return -Math.sin(this.vibrsinus)*this.vibr_max;
        }
        return Math.sin(this.vibrsinus)*this.vibr_max;

    } else {
        return 0;
    }

}

CreatureSectionPrototype.prototype.vibrateRandomly = function () {

     if (this.vibr_max > 0) {
     this.d_vibr = (Math.random() - 0.5) / this.coef_vibr;
     if (this.vibr + this.d_vibr > this.vibr_max) {
     this.d_vibr = -Math.abs(this.d_vibr);
     }
     if (this.vibr + this.d_vibr < -this.vibr_max) {
     this.d_vibr = Math.abs(this.d_vibr);
     }
     } else {
     this.d_vibr = 0;
     }
    return this.d_vibr+this.vibr;


}



/* Method position
 * param myangle int : angle made by the section with origin the angle of the parent section
 * param length int
 *
 * returns array[x,y] : coordinates of the node of the section
 */

CreatureSectionPrototype.prototype.position = function (myangle, length) {
    var _angle;

    myangle += this.vibrate()

    _angle = myangle + this.p_creature.angle;
    //this.anglevibrated = _angle;
    var x2 = this.p_section.x + Math.cos(_angle) * length;
    this.x2 = x2;
    var y2 = this.p_section.y + Math.sin(_angle) * length;
    this.y2 = y2;

    return [x2, y2];
}


/*
 * Method move
 * param void
 * return void
 * calculate section's new coordinates and updates them
 */
CreatureSectionPrototype.prototype.move = function () {
    var tab = this.position(this.tranformAngle(this.angle), this.length);
    this.x = tab[0];
    this.y = tab[1];

}

/*
 * Method tranformAngle
 * @param angle int angle (1/angle)
 * @return angle transformed
 */
CreatureSectionPrototype.prototype.tranformAngle = function (angle) {
    //return Math.sqrt(angle);
    return angle;
}

/*
 * Method register
 * param void
 * return void
 *
 * registers this section to the creature
 */
CreatureSectionPrototype.prototype.register = function () {
    this.p_creature.register(this);
};

/* Method eat
 * param void
 * return boolean : has eaten or not, the section checks if over food
 */
CreatureSectionPrototype.prototype.eat = function () {

    return false;
}

/*
 * Method collide_section
 * param object Section
 * returns bool : collide or not with section
 *
 */
CreatureSectionPrototype.prototype.collide_section = function (section) {
    return collide_rectangle(this.x, this.y, section.x, section.y, section.p_section.x, section.p_section.y);
}

/*
 * Method collide_reality
 * param void
 * return bool : collide with main canvas frame or not
 */
CreatureSectionPrototype.prototype.collide_reality = function () {
    var ret = false;
    if (this.x < 0) {
        ret = true;
        this.p_creature.x -= this.x2;
    }

    if (this.y < 0) {
        this.p_creature.y -= this.y2;
        ret = true;
    }

    if (this.x > this.view.size_x) {
        this.p_creature.x -= this.x2 - this.view.size_x;
        ret = true;
    }

    if (this.y > this.view.size_y) {
        this.p_creature.y -= this.y2 - this.view.size_y;
        ret = true;
    }
    return ret;
}


/*
 * Method collide
 * param void
 * return bool collide with something or not, wrapper to be able to implement other collisions
 *
 */
CreatureSectionPrototype.prototype.collide = function () {
    var ret = false;

    ret = ret || this.collide_reality();
    return ret;
};


CreatureSectionPrototype.prototype.dL = function (type, myangle, length, vibration) {
    var tab = this.position(myangle, length);
    //@TODO remove ugly new window for the factory
    return new window[this.getRegistered()[type]]( tab[0], tab[1], myangle, length, vibration, this.p_creature, this)
};

CreatureSectionPrototype.prototype.actionMove = function () {
    return { x:0, y:0};
};


CreatureSectionPrototype.prototype.registerSection = function (objectName) {
    CreatureSectionPrototype.prototype.registeredSections[window[objectName].type] = objectName;
}

CreatureSectionPrototype.prototype.getRegistered = function (index) {
    if (typeof(index) == 'undefined') {
        return CreatureSectionPrototype.prototype.registeredSections;
    } else {
        return CreatureSectionPrototype.prototype.registeredSections[index];
    }
}

