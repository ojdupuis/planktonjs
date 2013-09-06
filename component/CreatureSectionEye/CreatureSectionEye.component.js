addScript('CreatureSectionEye', 'CreatureSectionEye.js');

CreatureSectionEyeComponent = function (thereality) {
    this.reality = thereality;
    this.listenerId='CreatureSectionEyeComponent'

    this.initializeComponent = function () {
        CreatureSectionEye.prototype = CreatureSectionPrototype.prototype;
        CreatureSectionEye.prototype.component=this
        CreatureSectionEye.weight = 5;
        CreatureSectionEye.type = parseInt(2);
        CreatureSectionEye.prototype.energyCost = 10;
        CreatureSectionEye.prototype.registerSection('CreatureSectionEye');
    }



    this.fillComponent = function () {
        this.addParameter('see_timeout', 30, 'CreatureSectionEye','time period for see action', 0, 200, 0);
        this.addParameter('seeDistance', 100, 'CreatureSectionEye','distance max for see action', 0, 1000, 0);

        this.addListener('Food.instanciated',this.listenerId, function(event){
                event[0].target.component.addListener('Food.see',event[0].target.component.listenerId, function(food){
                    return function(event){
                        var eye=event[0].target
                        var retX = 0;
                        var retY = 0;
                        var deltax = -eye.x + food.x;
                        var deltay = -eye.y + food.y;

                        if ((Math.abs(deltax) < eye.component.getParameter('seeDistance')) && (Math.abs(deltay) < eye.component.getParameter('seeDistance'))) {
                            if (deltax != 0) {
                                if (food) {
                                    if (deltax < 0){
                                        retX +=  food.quantity/(deltax-1);
                                    } else {
                                        retX += food.quantity/(deltax+1);
                                    }
                                }
                            }
                            if (Math.abs(deltay) != 0) {
                                if (food) {
                                    if (deltax < 0){
                                        retY +=  food.quantity/(deltay-1);
                                    } else {
                                        retY += food.quantity/(1+deltay);
                                    };
                                }
                            }

                        }

                        if (retX != 0) {
                            retX = retX / Math.abs(retX);
                        }
                        if (retY != 0) {
                            retY = retY / Math.abs(retY);
                        }

                        eye.p_creature.desiredmovex += retX;
                        eye.p_creature.desiredmovey += retY;
                    }
                }(event[0].target))

            }
        )

    }

    this.startComponent = function (view) {
        this.view=view;
    }

    this.addComponentListeners()
}


