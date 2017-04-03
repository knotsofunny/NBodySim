
function body(x, y, x_vel, y_vel, mass, density, color){
	this.x = x;
	this.y = y;
	
	this.x_vel = x_vel;
	this.y_vel = y_vel;
	
    this.mass = mass;
    this.density = density;
	this.size = Math.sqrt( this.mass * this.density / Math.PI );
    
    this.f_x = 0;
    this.f_y = 0;
	
    this.color = color;
	//Controls the x and y acceleration of the body in m/s
	this.update = function(){
        this.x_acc = this.f_x / this.mass;
        this.y_acc = this.f_y / this.mass;
        
		this.x_vel += this.x_acc * time_modifier;
		this.y_vel += this.y_acc * time_modifier;
		
		this.x += this.x_vel * time_modifier / meters_per_pixel;
		this.y += this.y_vel * time_modifier / meters_per_pixel;
		
	}

	this.updateSize = function(){
		this.size = Math.sqrt( this.mass * this.density / Math.PI );
	}
	
	this.draw = function(){
		noStroke();
        fill(color);
		ellipse(this.x, this.y, this.size, this.size);
	}
	
	this.updateForce = function(x, y) {
        this.f_x += x;
        this.f_y += y;
    }
    this.resetForce = function(){
        this.f_x = 0;
        this.f_y = 0;
    }
}
