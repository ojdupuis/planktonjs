Parameter = function (name, value, title,comment, min, max, isround) {
    this.name = name;
    this.value = value;
    this.min = min;
    this.max = max;
    this.isround = isround;
    this.title=title
    this.comment = comment;

    this.set=function(value,type){
        if (typeof(type) == 'undefined'){
            type='value';
        }
        this[type]=value
    }
}