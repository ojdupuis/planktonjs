ViewTide=function(component,id){
    this.component=component
    this.id=id
    this.vectorX=0
    this.vectorY=0
    this.time=0
    this.view=null
    this.paused=false
    this.listenerId='Tide.'+id


    this.addTide=function(creature,tide){
        creature.addListener('Tide', creature.listenerId+'.tide',function(thecreature){
            return function(event){
                if (! tide.paused){
                    thecreature.x+=event[0].target.vectorX
                    thecreature.y+=event[0].target.vectorY
                }
            }
        }(creature,tide))

    }

    this.addTideBg=function(view){
        this.component.registerAction('Tide.'+view.id+'.timeout',function(theview,thetide){
            return function(){
                    thetide.view=theview
                    thetide.change()
                    theview.bg_position_deltaX+=thetide.vectorX
                    theview.bg_position_deltaY+=thetide.vectorY
            }
        }(view,this),'tide_timeout',this)
    }

    this.removeTide=function(creature){
        this.component.unregisterAction(creature.listenerId+'.tide')
    }

    this.change=function(){
        this.time+=1
        var x=Math.sin(this.time/this.component.getParameter('tide_timedividerX'))
        this.vectorX=x*this.component.getParameter('tide_amplitude')
        var y=Math.cos(this.time/this.component.getParameter('tide_timedividerY'))
        this.vectorY=y*this.component.getParameter('tide_amplitude')

        this.component.fire({ type:'Tide', target: this})
    }

    this.tooglePause=function(){
       if (! this.paused){
           this.component.unregisterAction('Tide.'+this.view.id+'.timeout')
           this.paused=true
       } else {
           this.paused=false
           this.addTideBg(this.view)
       }
    }
}

