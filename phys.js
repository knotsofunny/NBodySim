

var time_modifier = 1000;
var meters_per_pixel = 0.025e8;

var grav = 6.67e-11;

var bodies = [];

function setup(){
	createCanvas(1000,800);
	background(51);
	frameRate(60);
	
	earth = new body(400, 200, 600, 0, 5.972e24, 1e-21, 255);
	antiearth = new body(400, 400, -600, 0, 5.972e24, 1e-21, 0);
	
	moon = new body(400, 165, 3050, 0, 7.3476e22, 6e-21, 175);
    
    antimoon = new body(400, 450, -2300, 0, 7.3476e22, 6e-21, 25);
	
    thing2 = new body(200, 300, 500, 0, 7.3476e22, 1e-19, 175);
    thing3 = new body(600 , 300, -500, 0, 7.3476e22 * 2, 1e-19, 255);
	
	me = new body(400, 600, 1000, 0, 7500, 10, 255);
	me.size = 3;
	
    
    bodies.push(earth, antiearth, antimoon, moon, me);
    

}


function draw(){
	//clear();
	background(51);
    
    for(var a = 0; a < bodies.length - 1; a += 1){
        for(var b = a + 1; b < bodies.length; b+= 1){
			if(checkCollision(bodies[a], bodies[b])){
				bodies[a] = collision(bodies[a], bodies[b]);
				bodies[a].updateSize();
				bodies.splice(b, 1);
				b -= 1;
			} else {
			stroke(0);
			line(bodies[a].x, bodies[a].y, bodies[b].x, bodies[b].y);
            tempForce = getForce(bodies[a], bodies[b]);
            bodies[a].updateForce(-1 * tempForce[0], -1 * tempForce[1]);
            bodies[b].updateForce(tempForce[0], tempForce[1]);
			}
        }
    }
	
	for(var i = 0; i < bodies.length; i += 1){
        bodies[i].update();
        bodies[i].resetForce();
        
        bodies[i].draw();
    }
}

function collision(a, b){
	x_vel = (a.mass * a.x_vel + b.mass * b.x_vel) / (a.mass + b.mass);
	y_vel = (a.mass * a.y_vel + b.mass * b.y_vel) / (a.mass + b.mass);
	
	if(a.mass > b.mass){
		a.mass += b.mass;
		a.x_vel = x_vel;
		a.y_vel = y_vel;
		
		return a;
	} else {
		b.mass += a.mass;
		b.x_vel = x_vel;
		b.y_vel = y_vel;
		
		return b;
	}
}

function checkCollision(a, b){
	dist = Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
	
	if(dist < a.size / 2 + b.size / 2){
		return true;
	}
	return false;
}

function getForce(a, b){
    x_dif = Math.abs((a.x - b.x) * meters_per_pixel);
    y_dif = Math.abs((a.y - b.y) * meters_per_pixel);
    
    x_dir = Math.sign(a.x - b.x);
    y_dir = Math.sign(a.y - b.y);
    
    f = grav * a.mass * b.mass / (Math.pow(x_dif, 2) + Math.pow(y_dif, 2));
    
    f_x = x_dir * f * Math.sin(Math.atan(Math.abs(x_dif / y_dif)));
    f_y = y_dir * f * Math.cos(Math.atan(Math.abs(x_dif / y_dif)));
    
    return [f_x, f_y];
    
}
