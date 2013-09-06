function Setup(component) {
    this.reality = component.reality;
    this.component = component;
    this.parameters = {}
    this.listenerId="Setup"

    this.get = function (componentName,parameter, type) {
        if (typeof(type) == 'undefined') {
            type = 'value';
        }
        //return parseFloat(this.parameters[componentName][parameter][type]);
        return parseFloat(this.parameters[parameter][type]);
    }
    this.set = function (componentName,parameter, value, type) {
        if (typeof(type) == 'undefined') {
            type = 'value';
        }
        //this.parameters[componentName][parameter][type] = value;
        this.parameters[parameter][type] = value;
    }

    this.addListener('addParameter',this.listenerId,function(component){
        return function(event){
            var parameter=event[0].target
            component.parameters[parameter.name]=parameter

        }
    }(this))
}

Setup.prototype=Event.prototype


