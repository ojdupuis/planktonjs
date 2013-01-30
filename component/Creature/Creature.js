function Creature(id, component, _x, _y, _angle, _couleur) {
    this.reality = component.reality;
    this.component = component;

    // coordinates of node of first section
    this.x = parseFloat(_x);
    this.y = parseFloat(_y);
    // azimut of creature
    this.angle = _angle;
    // minimum x move
    this.movex = 0.1;
    this.movey = 0.1;
    this.movea = 0;
    this.moveForce = 0;
    this.desiredmovex = 0;
    this.desiredmovey = 0;
    // memorize last direction of move so that path is not too erratic
    this.olddesiredmovex = 0;
    this.olddesiredmovey = 0;

    this.adn = null;
    this.genome = null;
    this.sections = [];
    this.cpt_section = 0;
    this.color = _couleur;
    this.coef_vibr = this.component.getParameter('coef_vibr');
    this.id = id;
    this.listenerId='Creature.'+this.id
    this.energy = 0;
    this.energy_max = 0;

    this.eating = false;
    this.red = false;
    this.size = 0;

    // Wave
    this.wave_angle = null;
    this.wave_angle_inc = 0.0001;


    this.rnd = 0;
    this.view=this.component.view;

    this.register = function (pointer_section) {
        this.sections[this.cpt_section] = pointer_section;
        this.cpt_section++;
    };

    this.absValue = function (nb) {
        if (nb > 0) {
            return 1;
        }
        if (nb < 0) {
            return -1;
        }
        return 0;
    }

    this.move = function () {
        var angle_limit = 0.5;
        if ((this.desiredmovex == 0) && (this.desiredmovey == 0)) {
            this.desiredmovex = this.olddesiredmovex + (Math.random() - 0.5) * this.component.getParameter('ponderation') / 1000;
            this.desiredmovey = this.olddesiredmovey + (Math.random() - 0.5) * this.component.getParameter('ponderation') / 1000;

        } else {
            var randa = 0;
        }
        this.movex = this.absValue(this.desiredmovex) * this.moveForce / this.sections.length / this.component.getParameter( 'coef_move');
        this.movey = this.absValue(this.desiredmovey) * this.moveForce / this.sections.length / this.component.getParameter('coef_move');

        if ((!this.collide()) && (!this.eating)) {
            this.x += this.movex;
            this.y += this.movey;
            this.movea = (Math.random() - 0.5) / this.component.getParameter('coef_angle');
            this.angle += this.movea;
        }

        this.olddesiredmovex = this.desiredmovex;
        this.olddesiredmovey = this.desiredmovey;

        this.desiredmovex = 0;
        this.desiredmovey = 0;
        this.sections[0].x = this.x
        this.sections[0].y = this.y

        for (i in this.sections) {
            this.sections[i].move();
        }
    };

    /*
     * Method collide
     * param void
     * return bool collide or not
     *
     * detects collision of creature with canvas frame
     */
    this.collide = function () {

        var ret = false;
        for (i in this.sections) {
            if (i != 1) {
                r = this.sections[i].collide();
                ret = ret || r;
            }

        }
        return ret;
    }

    /*
     * Method collide_max
     * param void
     * return bool collide or not
     *
     * detects collision of square around creature with canvas frame. getmax should be used before
     * @UNUSED
     */
    this.collide_max = function () {
        ret = false;
        for (i in this.reality.creatures) {

            if (this.id != this.reality.creatures[i].id) {
                if (
                    (collide_rectangle(this.x_min, this.y_min, this.reality.creatures[i].x_min, this.reality.creatures[i].y_min, this.reality.creatures[i].x_max, this.reality.creatures[i].y_max))
                        ||
                        (collide_rectangle(this.x_min, this.y_max, this.reality.creatures[i].x_min, this.reality.creatures[i].y_min, this.reality.creatures[i].x_max, this.reality.creatures[i].y_max))
                        ||
                        (collide_rectangle(this.x_max, this.y_max, this.reality.creatures[i].x_min, this.reality.creatures[i].y_min, this.reality.creatures[i].x_max, this.reality.creatures[i].y_max))
                        ||
                        (collide_rectangle(this.x_max, this.y_min, this.reality.creatures[i].x_min, this.reality.creatures[i].y_min, this.reality.creatures[i].x_max, this.reality.creatures[i].y_max))
                    ) {
                    return true;
                }
            }
        }

        return false;

    }

    /*
     * Method draw
     * param void
     * return void
     *
     * calls draw for each section
     */
    this.draw = function (view) {
        var i = 0;
        this.x_min = 100000;
        this.x_max = -1000;
        this.y_min = 100000;
        this.y_max = -1000;
        for (i in this.sections) {
            if (typeof (this.sections[i]) !== null){
                if (this.sections[i].x < this.x_min) {
                    this.x_min = this.sections[i].x;
                }
                if (this.sections[i].x > this.x_max) {
                    this.x_max = this.sections[i].x;
                }
                if (this.sections[i].y < this.y_min) {
                    this.y_min = this.sections[i].y;
                }
                if (this.sections[i].y > this.y_max) {
                    this.y_max = this.sections[i].y;
                }
                this.sections[i].draw(view);
            }
        }
    };

    /*
     * Method getmax
     * param void
     * return void
     *
     * sets x_min, xm_ax and y_min,y_max square that limit the creature
     */
    this.getmax = function () {
        var min_x = 100000;
        var min_y = 100000;
        var max_x = 0;
        var max_y = 0;

        var i = 0;
        for (i in this.sections) {
            if (typeof (this.sections[i]) !== 'undefined'){
                if (this.sections[i].x < min_x) {
                    min_x = this.sections[i].x;
                }
                if (this.sections[i].y < min_y) {
                    min_y = this.sections[i].y;
                }
                if (this.sections[i].x > max_x) {
                    max_x = this.sections[i].x;
                }
                if (this.sections[i].y > max_y) {
                    max_y = this.sections[i].y;
                }
            }s
        }
        this.min_x = min_x;
        this.max_x = max_x;
        this.min_y = min_y;
        this.max_y = max_y;
    };

    /*
     * Method birth
     * @param void
     * @return void
     *
     * constructs the sections of the creature according to this.genome
     */
    this.birth = function (decodedGenome) {
        var spawn = 'this.spawn=function(pointer){' + 's1=new CreatureSectionBasic(this.x,this.y,0,0,0,pointer,null);' + decodedGenome + '};'
        eval(spawn);

    };

    /*
     * Method kill
     * param void
     * return void
     *
     * self explanatory
     */
    this.kill = function () {

        this.removeListener('View.draw',this.listenerId)
        this.sections=null;
        this.fire('Creature.kill.'+this.id)
    }

    this.component.registerAction('Creature.'+this.id+'.move_timeout',function (creature) {
        return function () {
            creature.move();
        }
    }(this), 'move_timeout',this);


    this.addListener('View.draw', this.listenerId,function(component){
        return function(event){
            component.draw(event[0].target)
            component.fire({ type: 'Creature.draw', target: component})
        }
    }(this))

    // listener for a vectorial field in the view (~ tide)
    this.addListener('View.tide',this.listenerId, function(component){
        return function(event){
            component.followTide(event[0].target)
        }
    }(this))
}
/***
 *  New methods for reality object
 *
 */

Creature.prototype=Event.prototype



