/**
 * Interface for creature
 *
 * requires ViewComponent
 *
 */
function CreatureInterface(component) {
    this.listenerId='CreatureInterface'+component.reality.id;
    this.component = component;
    this.selected_creature = null;
    this.id='genome_canvas_'+Math.round(Math.random()*10000000);
    // Add to interface abox to manipulate genome
    $('#controls').append($('<div/>', {
        id: 'create_container',
        class: 'tweak_container'
    }))
    $('<div/>', {
        id: 'btn_spawn',
        class: 'monitor_box'
    }).appendTo('#controls')
    $('<div/>',{
        id: 'div_'+this.id,
        class: 'monitor_box'
    }).appendTo('#controls')
    $('<li>Genome view</li>').appendTo('#div_'+this.id)
    $('<canvas/>', {
        class: 'genome_box border_grey rounded',
        id: this.id
    }).appendTo('#div_'+this.id)
    $('<div/>',{
        id: 'monitor',
        class: 'monitor_box'
    }).appendTo('#controls')
    $('<div/>', {
        class: 'monitor_box',
        id: 'mbox'
    }).appendTo('#controls')
    $('<div/>', {
        id: 'tweak',
        class: 'monitor_box'
    }).appendTo('#controls')

    $('<li>Genome edition</li>').appendTo('#tweak')
    $('<textarea/>', {
        id: 'genome',
        height: '100px',
        class: 'genome_box border_grey rounded'
    }).appendTo('#tweak')

    $('#btn_spawn').append(
        addbutton(
            'spawn',
            'spawn',
            function (object) {
                return function () {
                    object.component.fire('CreatureInterface.newGenome');
                }
            }(this),
            'clearleft marginten'
        )
    );
    $('#tweak').append(
        addbutton(
            'create',
            'create',
            function (object) {
                return function () {
                    object.component.fire({ type: 'CreatureInterface.createGenome', target: document.getElementById('genome').value});
                }
            }(this),
            'clearleft marginten'
        )
    );
        
    // add canvas for genome view
    this.canvas_genome = new Processing(document.getElementById(this.id), "void setup(){\
         size(250, 30);\
         ellipseMode(CENTER_RADIUS);\
         frameRate(30);\
         noStroke();\
         smooth();\
         background(255,255,255);\
         noLoop();\
      }\
      /* @pjs transparent=true; */ \
         void draw(){\
               };\
      ");
    this.component.fire({ type: 'CreatureInterface.canvasInstanciated', target: this.canvas_genome});


    this.setEnergy = function (i, val) {
        $('energy_'+i).html(Math.round(val))
    }

    this.updateCell = function (cellName, value, creature) {
        if (creature.id == null) {
            $('#'+cellName).values=value
        } else {
            $('#'+cellName+'_'+creature.id).html(value)
        }
    }

    this.addDashBoardCell = function (cellName, creature, btn_name, btn_onclick, divclass, comment) {
        $('<div/>', {
            id: cellName + '_' + creature.id,
            class: function(_divclass){
                if (_divclass == null) {
                    return 'dashBoardCell';
                } else {
                    return divclass;
                }
            }(divclass)
        }).appendTo('#creature_'+creature.id)

        if (btn_name != null) {
            $('#'+cellName + '_' + creature.id).append(addbutton(btn_name + '_input_' + creature.id, btn_name, btn_onclick, 'small orange',comment));
        }
    }

    this.tdb_creature = function (creature) {
        var id=creature.id
        var thecolor = this.canvas_genome.hex(creature.color);
        var col = "#" + thecolor[2] + thecolor[3] + thecolor[4] + thecolor[5] + thecolor[6] + thecolor[7];
        var bright = (parseInt(thecolor[2] + thecolor[3], 16) + parseInt(thecolor[4] + thecolor[5], 16) + parseInt(thecolor[6] + thecolor[7], 16)) / 3;
        $('<div/>',{
            class : 'dashBoardLine',
            id : 'creature_'+creature.id,
            style : function(_bright){
                        if (_bright < 150){
                            return 'color: #FFFFFF;background-color: ' + col + ';'
                        } else {
                            return 'background-color: ' + col + ';'
                        }
                    }(bright)
        }
        ).appendTo('#monitor')
        $('#creature_'+creature.id).bind('mouseover', function(object,creature){
                return function(){
                    object.fire({type: 'CreatureInterface.overline', target: creature})
                }
               }(this,creature)
        )

        this.addDashBoardCell('follow', creature, 'F', function(object,thecreature){
            return function(){
                object.toggleCellCreature(thecreature)
            }
        }(this,creature),null,'Follow');

        this.addDashBoardCell('kill', creature, 'X', function(object){
            return function(){
                object.fire({type: 'Creature.kill', target: creature})
            }
        }(this),null,'Kill');
        this.addDashBoardCell('clone', creature, 'C', function(object){
            return function(){
                object.fire({type: 'Creature.clone', target: creature})
            }
        }(this),null,'Clone')
        this.addDashBoardCell('mutate', creature, 'M', function(object){
            return function(){
                object.fire({type: 'Creature.mutate', target: creature})
            }
        }(this),null,'Mutate')
        this.addDashBoardCell('copy', creature, 'P', function(object){
            return function(){
                   document.getElementById('genome').value=creature.genome;
            }
        }(this),null,'Get DNA')
        this.addDashBoardCell('energy', creature, null, null, 'floatright');

    };

    this.kill_tdb_creature = function (creature) {
        this.unselectCellCreature(creature.id);
        $('#creature_' + creature.id).remove()
    };

    this.toggleCellCreature = function (creature) {
        if ((this.selected_creature !== null)&&(this.selected_creature.id == creature.id)){
            this.unselectCellCreature(this.selected_creature)
        } else {
            if (this.selected_creature !== null){
                this.unselectCellCreature(this.selected_creature)
            }
            if (creature.id != null) {
                this.selectCellCreature(creature)
            }
        }
    }

    this.selectCellCreature = function (creature) {
        this.selected_creature = creature;
        $('#creature_' + creature.id).attr('class', 'dashBoardLineSelected');
        this.drawGenome(creature);

    };
    this.unselectCellCreature = function (creature) {

        if (creature.id != null) {
            document.getElementById('creature_' + creature.id).setAttribute('class', 'dashBoardLine');
                this.selected_creature = null;
        } else {
            this.selected_creature = null;
        }
    }
    this.drawGenome = function (creature) {
            this.fire({ type: 'CreatureInterface.ribosomeCreature', target: creature})
    }

    this.addListener('CreatureInterface.overline',this.listenerId,function(objectCreatureInterface){
        return function(event){
            objectCreatureInterface.drawGenome(event[0].target)
        }
    }(this));

    // add ability to zoom and follow creature
    this.draw = function () {
        if (this.selected_creature != null) {
            this.fire({
                    type: 'View.zoom_square',
                    target: this.selected_creature
                }
            )
        }
    }

    this.addListener('Creature.birth', this.listenerId,function (objectCreatureInterface) {
        return function (event) {
            objectCreatureInterface.tdb_creature(event[0].target)

            // Creature listener for live counter update
            objectCreatureInterface.addListener('Creature.draw', objectCreatureInterface.listenerId,function(objectCreatureInterface2) {
                    return function (event) {
                        var creature=event[0].target
                        percentenergy = Math.round(creature.energy / creature.energy_max * 100)
                        objectCreatureInterface2.updateCell('energy', Math.round(percentenergy), creature);
                    }
            }(objectCreatureInterface));

        }
    }(this));

    this.addListener('Creature.kill', this.listenerId,function(objectCreatureInterface){
        return function(event){
            //@TODO trouver equivalent clear en 1.4
            objectCreatureInterface.canvas_genome.background(255);
            objectCreatureInterface.removeListener('Creature.draw',objectCreatureInterface.listenerId);
            objectCreatureInterface.removeListener('CreatureInterfaceComponent.draw',objectCreatureInterface.listenerId);
            //on ne désabonne pas car c'est l'interface qui écoute
            // objectCreatureInterface.removeListener('CreatureInterface.overline',objectCreatureInterface.listenerId);
            objectCreatureInterface.kill_tdb_creature(event[0].target)
        }
    }(this))
    
    this.addListener('CreatureInterfaceComponent.draw', this.listenerId,function(objectCreatureInterface){
        return function(event){
            objectCreatureInterface.draw()
        }
    }(this))


}

CreatureInterface.prototype=Event.prototype