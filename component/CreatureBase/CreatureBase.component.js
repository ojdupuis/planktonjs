define(
    ['component/component.abstract.js','component/CreatureBase/CreatureBase.js'],
    function(componentAbstract,CreatureBase){
        CreatureBaseComponent = function() {
                this.init=function(thereality){
                    this.reality = thereality;
                    this.listernerId='CreatureBase'
                }
                this.addComponentListeners()
                this.fire({type: 'CreatureBase.ready', target: null})
            }
        CreatureBaseComponent.prototype=componentAbstract
        return new CreatureBaseComponent()
    }
)
