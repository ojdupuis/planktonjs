function View(component,canvasid) {
    this.reality = component.reality;
    this.component = component;
    this.canvasid=canvasid
    this.listenerId='View.'+this.reality.id
    this.id=this.reality.id

    this.image_fond = null;
    this.size_x = 1;
    this.size_y = 1;
    this.zoom_scale = 1;
    this.zoom_x = 1;
    this.zoom_y = 1;
    this.zoom_size_x = 0;
    this.zoom_size_y = 0;
    this.zoomRedrawBgStep = 3;
    this.over = false;
    this.pressed = true;
    this.zoomed = false;
    // when creature selected, only refresh background every zoom_step times (counter is in zoomed_counter)
    this.zoomed_step = 10;
    this.zoomed_count = 0;
    this.dragStep = 0.1;
    //drag control
    this.isdragged = false;
    this.dragged_x = null;
    this.dragged_y = null;
    this.background = true;
    this.backgroundImageName = "bgwater3.jpg";
    this.framerate = 60;
    this.paused=false;
    this.bg_position_deltaX=0;
    this.bg_position_deltaY=0

    // Zoom
    this.maxZoom = 10;
    this.minZoom = 1;

    this.draw = function () {
        this.canvas.background(this.canvas.color(100, 100, 100), 100);
        this.canvas.externals.sketch.options.isTransparent = true;
        if (this.background == true) {
            //reposition and stretch background according to zoom_scale

            document.getElementById(this.canvasid).style.backgroundSize = Math.round(this.zoom_scale * 100) + "%";

            var canvas_height = document.getElementById(this.canvasid).height;
            var canvas_width  = document.getElementById(this.canvasid).width;

            var bg_position_x = canvas_width * this.zoom_scale / this.size_x * this.zoom_x+this.bg_position_deltaX;
            var bg_position_y = canvas_height * this.zoom_scale / this.size_y * this.zoom_y+this.bg_position_deltaY;
            document.getElementById(this.canvasid).style.backgroundPosition = -bg_position_x + "px " + bg_position_y + "px";
        }
    }

    this.init = function () {
        viewport = getViewport();
        this.size_x = viewport[0] - 400;
        this.size_y = viewport[1] - 100;
        this.canvas = new Processing(document.getElementById(this.canvasid), "/* @pjs transparent=true; */void draw(){}");
        this.zoom(0);
        this.canvas.frameRate(this.framerate);
        this.canvas.smooth();
        this.canvas.size(this.size_x, this.size_y);
        // Background is done by browser and not processingjs for better (a lot) performance
        document.getElementById(canvasid).style.backgroundImage = "url('media/" + this.backgroundImageName + "')";
        this.canvas.background(this.canvas.color(255, 255, 255), 0);
        this.canvas.externals.sketch.options.isTransparent = true;


        // setup draggable
        this.canvas.mouseDragged = function (theview) {
            return function () {
                if (! theview.paused){
                    theview.dragged(theview.canvas.mouseX, theview.canvas.mouseY);
                }
            };
        }(this);
        this.canvas.mouseReleased = function (theview) {
            return function () {
                if (! theview.paused){
                    theview.isdragged = false;
                }
            };
        }(this);

        this.canvas.mouseScrolled = function (theview) {
            return function () {
                if (! theview.paused){
                    theview.zoom(theview.canvas.mouseScroll / 10);
                }
            };
        }(this);

        // Setup drawing of reality inside the Processing.draw() method
        this.canvas.draw = function (view) {
            return function () {
                view.draw()
                view.fire({ type: 'View.draw', target:view})
            };
        }(this);
        this.fire('Reality.View.start');
    }
    this.zoom = function (step) {
        this.zoom_scale += step;
        var center_x = this.zoom_x + parseFloat(this.zoom_size_x) / 2;
        var center_y = this.zoom_y + parseFloat(this.zoom_size_y) / 2;
        if (this.zoom_scale < this.minZoom) {
            this.zoom_scale = this.minZoom;
        }
        if (this.zoom_scale > this.maxZoom) {
            this.zoom_scale = this.maxZoom;
        }
        this.zoom_size_x = parseFloat(this.size_x) / this.zoom_scale;
        this.zoom_size_y = parseFloat(this.size_y) / this.zoom_scale;

        this.zoom_x = center_x - parseFloat(this.zoom_size_x) / 2;
        this.zoom_y = center_y - parseFloat(this.zoom_size_y) / 2;
        if (this.zoom_x + this.zoom_size_x > this.size_x) {
            this.zoom_x = this.size_x - this.zoom_size_x;
        }
        if (this.zoom_y + this.zoom_size_y > this.size_y) {
            this.zoom_y = this.size_y - this.zoom_size_y;
        }
        if (this.zoom_x < 1) {
            this.zoom_x = 1;
        }
        if (this.zoom_y < 1) {
            this.zoom_y = 1;
        }
        this.fire({ type: 'View.zoom', target: this})
        this.zoomed = true;
    }

    this.dragged = function (mouseX, mouseY) {
        if ((this.over)) {
            if (this.isdragged == false) {
                this.dragged_x = mouseX;
                this.dragged_y = mouseY;
            }
            this.isdragged = true;
            if (mouseX != this.dragged_x) {
                var dx = -(mouseX - this.dragged_x);
            } else {
                var dx = 0;
            }
            if (mouseY != this.dragged_y) {
                var dy = -(mouseY - this.dragged_y);
            } else {
                var dy = 0;
            }

            if ((this.zoom_x + dx * this.dragStep + this.zoom_size_x <= this.size_x) && ((this.zoom_x + dx * this.dragStep >= 0))) {
                this.zoom_x += dx * this.dragStep;
            }
            if (this.zoom_x + dx * this.dragStep < 0) {
                this.zoom_x = 0;
            }

            if ((this.zoom_y + dy * this.dragStep + this.zoom_size_y <= this.size_y) && ((this.zoom_y + dy * this.dragStep >= 0))) {
                this.zoom_y += dy * this.dragStep;
            }
            if (this.zoom_y + dy * this.dragStep < 0) {
                this.zoom_y = 0;
            }

            this.zoomed = true;
        }
    }

    this.toggleBackground = function () {
        if (this.background != true) {
            document.getElementById(this.canvasid).style.backgroundImage = "url('media/" + this.backgroundImageName + "')";
            document.getElementById(this.canvasid).className = 'canvas_withoutbackground';
            document.getElementById('bg').className = document.getElementById('bg').className.replace('gray', 'gray_active');

        } else {
            document.getElementById(this.canvasid).className = 'canvas_withbackground';
            document.getElementById(this.canvasid).style.backgroundImage = "none";
            document.getElementById('bg').className = document.getElementById('bg').className.replace('gray_active', 'gray');
        }
        this.background = !this.background;
    }


    this.zoom_square = function (object) {
        var new_zoom_x = (object.x_max - object.x_min) / 2 + object.x_min - this.zoom_size_x / 2;
        var new_zoom_y = (object.y_max - object.y_min) / 2 + object.y_min - this.zoom_size_y / 2;
        // attenuate vibration when following a creature
        var deltax = this.zoom_x - new_zoom_x;

        if (Math.abs(deltax) > this.component.getParameter('zoomFollowThreshhold')) {
            this.zoom_x = this.zoom_x - Math.round(deltax / this.component.getParameter('zoomFollowAttenuationFactor')) + 1;
        }
        var deltay = this.zoom_y - new_zoom_y;
        if (Math.abs(deltay) > this.component.getParameter('zoomFollowThreshhold')) {
            this.zoom_y = this.zoom_y - Math.round(deltay / this.component.getParameter('zoomFollowAttenuationFactor')) + 1;
        }
        this.zoom(0);
    }

    this.addListener('View.zoom_square',this.listenerId,function(component){
        return function(event){
            component.zoom_square(event[0].target);
            component.zoomed = true;
        }
    }(this)
    )

    this.addListener('Reality.pause',this.listenerId,function(component){
        return function(event){
            this.paused=true;
            component.canvas.noLoop()
        }
    }(this)
    )
    this.addListener('Reality.unpause',this.listenerId,function(component){
        return function(event){
            this.paused=false;
                component.canvas.loop()
        }
    }(this)
    )
    /**
     *  Returns coordinates
     *
     * @param object coordinates { x, y}
     * @return {object coordinates}
     */
    this.getPos=function(coordinates){
        return coordinates
    }
    this
}

View.prototype=Event.prototype