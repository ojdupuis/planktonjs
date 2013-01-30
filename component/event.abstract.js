function Event() {

}

Event.prototype = {
    _listeners:{},

    addListener:function (type, owner,listener) {
        // owner is a pointer on the object calling this method
        // lets convert that into a unique string
        if (typeof this._listeners[type] == "undefined") {
            this.__proto__._listeners[type] = [];
        }

        this.__proto__._listeners[type].push({ 'listener': listener, 'owner': owner});
    },

    fire:function (event) {

        var arg = arguments
        if (typeof event == "string") {
            event = { type:event };
        }
        if (!event.target) {
            event.target = this;
        }
        if (!event.type) {  //falsy
            throw new Error("Event object missing 'type' property.");
        }

        if (this._listeners[event.type] instanceof Array) {
            var listeners = this._listeners[event.type];
            for (var i = 0, len = listeners.length; i < len; i++) {

                listeners[i].listener.call(this, arg);
            }
        }
    },

    removeListener:function (type, owner) {
        if (this._listeners[type] instanceof Array) {
            var listeners = this.__proto__._listeners[type];
            for (var i = 0, len = listeners.length; i < len; i++) {
                if (listeners[i].owner === owner) {
                    listeners.splice(i, 1);
                    break;
                }
            }
        }
    }


};

