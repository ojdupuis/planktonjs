function AbstractDrawable() {
}
/*
 * Method X
 * param void
 * return float X position on the screen taking zoom into account
 */

AbstractDrawable.prototype=Event.prototype
AbstractDrawable.prototype.X = function (view,x) {
    if (typeof(x) == 'undefined') {
        return (this.x - view.zoom_x) * view.size_x / view.zoom_size_x;
    } else {
        return (x - view.zoom_x) * view.size_x / view.zoom_size_x;
    }
};

/*
 * Method Y
 * param void
 * return float Y position on the screen taking zoom into account
 */
AbstractDrawable.prototype.Y = function (view,y) {
    if (typeof(y) == 'undefined') {
        return (this.y - view.zoom_y) * view.size_y / view.zoom_size_y;
    } else {
        return (y - view.zoom_y) * view.size_y / view.zoom_size_y;
    }

};

/*
 * Method size
 * param void
 * return float get scaled length
 */
AbstractDrawable.prototype.size = function (view,size) {
    return size*view.zoom_scale
}








