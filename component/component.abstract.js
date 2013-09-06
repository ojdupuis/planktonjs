
function Component(thereality){
   this.setup={}
   this.pause=false
   this.actionCallback=[]
   this.registeredComponents={}
   this.reality=thereality;
}

Component.prototype = new Event();

Component.prototype.add=function (componentName) {
    addScript(componentName, componentName + '.component.js');

}

Component.prototype.initializeComponent = function () {
}

Component.prototype.fillComponent = function () {
}

Component.prototype.startComponent = function () {
}

Component.prototype.drawComponent = function () {
}

Component.prototype.addComponentListeners=function(){
    this.addListener('Reality.fillComponent', this.listenerId,function (component) {
        return function () {
            component.fillComponent()
        }
    }(this));

    this.addListener('Reality.initializeComponent', this.listenerId,function (component) {
        return function () {
            component.initializeComponent()
        }
    }(this));

    this.addListener('Reality.startComponent', this.listenerId,function (component) {
        return function (e) {
            component.startComponent()
        }
    }(this));

    this.addListener('Reality.pause',this.listenerId,function(component){
        return function (e) {
            component.pause = true;
        }
    }(this))

    this.addListener('Reality.unpause',this.listenerId,function(component){
        return function(e){
            component.pause = false;
            component.goActions();
        }
    }(this))
}


Component.prototype.addParameter=function(name,value,title,comment,min,max,isround){
    var theparameter=new Parameter(name,parseFloat(value),title,comment,min,max,isround);
    this.fire({ type: 'addParameter', target: function(parameter){ return parameter}(theparameter)})
}
Component.prototype.getParameter=function(name,type){
    if (typeof(type) == 'undefined'){
        type='value'
    }
    if (type !== 'object') {
        if (type == 'value'){
            return parseFloat(this.reality.setup.parameters[name][type])
        } else {
            return this.reality.setup.parameters[name][type]
        }
    } else {
        // return the object for callback to have a reference and not a value
        return this.reality.setup.parameters[name]
    }
}

/************************************
 *
 * Methods for managing setimeout
 *
 ************************************/

/**
 * Register an action of an object to be executed by setimeout
 *
 * @param callback
 * @param string name of a parameter of the object NOT a value
 * @param caller
 */
Component.prototype.registerAction = function (id,callback, timeout,caller) {
    //var index = this.actionCallback.length;
    this.actionCallback[id] = {};
    this.actionCallback[id].callback = callback;
    this.actionCallback[id].parameter = function(object){return object.component.getParameter(timeout,'object')}(caller);

    this.callAction(id);
}
Component.prototype.unregisterAction = function (id) {
    this.actionCallback[id]=null
    this.actionCallback=this.actionCallback.slice(id)
}

Component.prototype.callAction = function (id) {
    if (this.pause !== true) {
        var thetimeout=
            setTimeout(function (thereality) {
                return function () {
                    thereality.doAction(id)
                }
            }(this), this.actionCallback[id].parameter.value);
    }
}

Component.prototype.doAction = function (id) {
    if (!this.pause) {
        try {
            this.actionCallback[id].callback();
            this.callAction(id);
        } catch (e) {
            // action disabled after a kill
        }
    }
}

Component.prototype.goActions = function () {
    var callback = ''
    for (callback in this.actionCallback) {
        if (this.actionCallback != null) {
            this.callAction(callback);
        }
    }
}




