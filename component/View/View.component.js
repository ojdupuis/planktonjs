addScript('View', 'View.js');
addScript('View', 'abstractDrawable.prototype.js');
function ViewComponent(thereality) {
    this.reality = thereality;
    this.listenerId='ViewComponent'
    this.pause=false;
    this.view=null;

    this.fillComponent=function(){
        this.addParameter('zoomFollowAttenuationFactor', 10, 'View','dividing factor for zoom to be soft', 0, 100, 0);
        this.addParameter('zoomFollowThreshhold', 1, 'View','Threshold for following creature', 0, 100, 0);
    }

    this.initializeComponent = function () {
        // Create main canvas on interface
        this.canvasid = 'main_canvas_' + Math.round(Math.random() * 100000)
        var canvas = document.createElement('canvas');
        canvas.setAttribute('id', this.canvasid);
        canvas.setAttribute('class', 'canvas_withbackground main_canvas');

        canvas.onmouseover = function (component) {
            return function () {
                component.view.over = true;
            }
        }(this)

        canvas.onmouseout = function () {
            return function (component) {
                component.view.over = false;
                component.view.isdragged = false;
            }
        }(this)

        document.getElementById('left_column').appendChild(canvas);

        // Instanciate View
        this.view = new View(this, this.canvasid);
        this.fire({ type: 'View.initialize', target: this.view});

    }

    this.startComponent = function () {
        this.view.init()
        this.fire({ type: 'View.start', target: this.view});

    }

    this.interfaceDraw = function () {
        // Add buttons on interface
        var btn1 = document.createElement('div');
        btn1.setAttribute('class', 'monitor_box');
        btn1.innerHTML = addbutton('plus', '+', null, 'marginten');
        btn1.onclick = function (view) {
            return function () {
                view.zoom(0.1);
            };
        }(this.reality.view);
        var btn2 = document.createElement('div');
        btn2.setAttribute('class', 'monitor_box');
        btn2.innerHTML = addbutton('minus', '-', null, 'clearright marginten');
        btn2.onclick = function (view) {
            return function () {
                view.zoom(-0.1);
            };
        }(this.reality.view);

        var btn3 = document.createElement('div');
        btn3.setAttribute('class', 'monitor_box');
        btn3.innerHTML = addbutton('bg', 'background', null, 'gray_active marginten')
        btn3.onclick = function (view) {
            return function () {
                view.toggleBackground();
            };
        }(this.reality.view);

        document.getElementById('controls').appendChild(btn1);
        document.getElementById('controls').appendChild(btn2);
        document.getElementById('controls').appendChild(btn3);
    }
    this.addComponentListeners()

    this.addListener('Interface.interfaceDraw', this.listenerId,function (component) {
        return function (event) {
            component.interfaceDraw()
        }
    }(this));
/*
    this.addListener('Reality.pause', this.listenerId,function (component) {
        return function () {
            if (component.pause === false){
                component.pause=true
                component.view.canvas.noLoop();
                this.pause=true;
            } else {
                component.pause=false
                component.view.canvas.loop();
                this.pause=false;
            }

        }
    }(this));
*/

}




