function Food(component, id) {
    this.reality = component.reality;
    this.component = component;
    this.view = null

    this.quantity = Math.random() * this.component.getParameter('food_max_quantity');
    this.id = id;

    this.init = function (view) {
        this.view = view
        this.x = Math.random() * view.size_x;
        this.y = Math.random() * view.size_y;
    }

    this.grow = function () {
        if (this.quantity > 0) {
                if (this.quantity < this.component.getParameter('food_max_quantity')) {
                    this.quantity += 1;
                }
        }
    }

    this.draw = function (view) {
        view.canvas.stroke(view.canvas.color(0, 128, 0), 200);
        view.canvas.fill(view.canvas.color(0, 128, 0), 200);
        view.canvas.ellipse(this.X(view), this.Y(view), this.size(view,this.quantity), this.size(view,this.quantity));
    }

    this.addListener('View.draw',this.listenerId,function(component){
        return function(event){
            component.draw(event[0].target)
        }
    }(this)
    )

    this.component.registerAction('Food.'+this.id+'food.growth',function (food) {
        return function () {
            food.grow();
        }
    }(this), 'food_growth',this);

    this.component.fire({type: 'Food.instanciated', target: this})
}

Food.prototype = AbstractDrawable.prototype;
