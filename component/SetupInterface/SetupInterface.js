function SetupInterface(component) {
    this.reality = component.reality;
    this.component = component;
    this.parameters = {}
    this.sliders={}

    this.ready = function () {
        for (name in this.reality.setup.parameters){
                var step = (this.component.getParameter(name,'max') - this.component.getParameter(name,'min')) / 1000;
                jQuery("#" + name).slider({
                    name:name,
                    step:step,
                    smooth:true,
                    round:this.component.getParameter(name,'round'),
                    from:this.component.getParameter(name,'min'),
                    to:this.component.getParameter(name,'max'),
                    dimension:"",
                    skin:"creature",
                    setup:this,
                    onstatechange:function (theparameter) {
                        return function (value) {
                            theparameter.set(value);
                        }}(this.reality.setup.parameters[name])
                });
        }

    }

    this.drawInterface = function () {
        windowSizeX = Math.round(getViewport()[0] * 0.95);
        windowSizeY = Math.round(getViewport()[1] * 0.8);
        // Add sliding div for setup
        $('<div/>', {
            class: 'setupcontainer',
            id   : 'setupcontainer',
            mouseover: function(mysetupinterface){
                return function(){
                    mysetupinterface.component.fire('Reality.pause');

                }
            }(this),
            mouseout: function(mysetupinterface){
                return function(){
                    mysetupinterface.component.fire('Reality.unpause');
                }
            }(this),
            css: {
            paddingLeft: '10px',
            width: (windowSizeX-250) + "px",
            height: windowSizeY+'px',
            marginTop: (0 - windowSizeY - 15) + "px"
            }
        }).appendTo('#body')

        $('<div/>',{
            id: 'setupControls',
            css: {
                height: (windowSizeY - 60) + "px"
            }
        }).appendTo('#setupcontainer')

        $('<div/>',{
            id: 'setuptitle',
            html: 'planKtonJS',
            css: {
                height: '25px'
            }
        }).appendTo('#setupcontainer')
        $('<div/>',{
            id: 'sign',
            html: '<a class="link" href="https://github.com/ojdupuis/planktonjs">https://github.com/ojdupuis/planktonj</a>',
            css: {
                height: '25px'
            }
        }).appendTo('#setupcontainer')

        var thehtml = "";
        var current_title="";
        var number_of_controls=0
        for (var name in this.reality.setup.parameters) {
            if ((this.component.getParameter(name,'title') != current_title)||(number_of_controls >= (this.component.getParameter('maxrowpercolumn')-1))){
                number_of_controls=0;
                current_section=this.drawControlSection(this.component.getParameter(name,'title'))
                $('#setupControls').append(
                    current_section
                );
            }
                current_section.append(this.drawControlNumber(
                    name,
                    this.component.getParameter(name,'title'),
                    this.component.getParameter(name,'comment'),
                    this.component.getParameter(name,'min'),
                    this.component.getParameter(name,'max')
                ))
            current_title=this.component.getParameter(name,'title')
            number_of_controls++
        }
        this.ready();
    }
    
    this.refresh = function(jsonParameters){
    	for (name in jsonParameters){
    		jQuery("#" + name).slider('value',jsonParameters[name].value);    		
    	}
    }


    this.drawControlNumber = function (id, title,comment, min, max) {
        return $('<div/>',{ class: 'controlnumber'}).append(
            $('<div/>',{
                class: 'controlnumbertitle',
                html : id

            }),
            $('<div/>',{
                class: 'layout'
            }).append(
                $('<div/>',{
                    class: 'layout-slider'
                }).append(
                    $('<input/>', {
                        id: id,
                        name: id,
                        value: this.component.getParameter(id,'value')

                    }),
                    $('<div/>',{
                        id: id+'_slider',
                        name: id+'_slider',
                        type: 'slider'
                    })
                )
            )
        )
    }

    this.drawControlSection = function (name) {
        return $('<div/>',{
            class: 'controlsection'
        }).append($('<div/>',{
            class: 'controlsectiontitle',
            html: name
        }))
    }

    
    
}
