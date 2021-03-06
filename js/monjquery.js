$(document).ready(function() {


//////////////////////////////////////////////////////////////////////////////////////
// preloading images
//////////////////////////////////////////////////////////////////////////////////////
function preload(arrayOfImages) {
	$(arrayOfImages).each(function(){
		$('<img/>')[0].src = this;
	});
}

preload([
	'img/quas.png',
	'img/wex.png',
	'img/exort.png',
	'img/skills/alacrity.png',
	'img/skills/chaos-meteor.png',
	'img/skills/cold-snap.png',
	'img/skills/deafening-blast.png',
	'img/skills/emp.png',
	'img/skills/forge-spirit.png',
	'img/skills/ghost-walk.png',
	'img/skills/ice-wall.png',
	'img/skills/sun-strike.png',
	'img/skills/tornado.png'
]);


//////////////////////////////////////////////////////////////////////////////////////
// global vars
//////////////////////////////////////////////////////////////////////////////////////
var skill1 = 81;
var skill2 = 83;
var skill3 = 68;
var skill4 = 69;
var skill5 = 82;
var ulti = 90;

var time;
var points;
var combo;
var reponses;
var life;
var quickcast = 0;
var skill_random;
var historique1;
var historique2;
var historique1_txt;
var historique2_txt;
var skill_key = 0;

var spell_case_index = 1;
var item;
var game = 0;


//////////////////////////////////////////////////////////////////////////////////////
// pressing keys
//////////////////////////////////////////////////////////////////////////////////////

// press any key to start the test
$("body").keydown(function(e){
	skill_touch(e);
	return false;
});

// key pressed test
function skill_touch(e){
	// get the keyboard key value
	var code = (e.keyCode ? e.keyCode : e.which);

	// if the code = one of the basic skills keys, do something
	if(code==skill1 || code==skill2 || code==skill3){
		if(code==skill1){
			item = "quas";
		}
		if(code==skill2){
			item = "wex";
		}
		if(code==skill3){
			item = "exort";
		}

		$("#keys_set li:nth-child(" + spell_case_index + ")").removeClass();
		$("#keys_set li:nth-child(" + spell_case_index + ")").addClass(item);

		spell_case_index++;

		if(spell_case_index==4){
			spell_case_index=1;
		}

		$("#primary_skill,#secondary_skill").removeClass("press");
	}

	// if the code = ulti key, do something
	if(code==ulti){
		var nbr_quas = $("li.quas").length;
		var nbr_wex = $("li.wex").length;
		var nbr_exort = $("li.exort").length;

		$("#primary_skill").removeClass();
		$("#secondary_skill").removeClass();

		if(nbr_quas==3 && nbr_wex==0 && nbr_exort==0){
			$("#primary_skill span").html("Cold Snap");
			$("#primary_skill").addClass("cold-snap");
		}
		if(nbr_quas==0 && nbr_wex==3 && nbr_exort==0){
			$("#primary_skill span").html("EMP");
			$("#primary_skill").addClass("emp");
		}
		if(nbr_quas==0 && nbr_wex==0 && nbr_exort==3){
			$("#primary_skill span").html("Sun Strike");
			$("#primary_skill").addClass("sun-strike");
		}

		if(nbr_quas==1 && nbr_wex==1 && nbr_exort==1){
			$("#primary_skill span").html("Deafening Blast");
			$("#primary_skill").addClass("deafening-blast");
		}

		if(nbr_quas==2 && nbr_wex==1 && nbr_exort==0){
			$("#primary_skill span").html("Ghost Walk");
			$("#primary_skill").addClass("ghost-walk");
		}
		if(nbr_quas==2 && nbr_wex==0 && nbr_exort==1){
			$("#primary_skill span").html("Ice Wall");
			$("#primary_skill").addClass("ice-wall");
		}

		if(nbr_quas==1 && nbr_wex==2 && nbr_exort==0){
			$("#primary_skill span").html("Tornado");
			$("#primary_skill").addClass("tornado");
		}
		if(nbr_quas==0 && nbr_wex==2 && nbr_exort==1){
			$("#primary_skill span").html("Alacrity");
			$("#primary_skill").addClass("alacrity");
		}

		if(nbr_quas==1 && nbr_wex==0 && nbr_exort==2){
			$("#primary_skill span").html("Forge Spirit");
			$("#primary_skill").addClass("forge-spirit");
		}
		if(nbr_quas==0 && nbr_wex==1 && nbr_exort==2){
			$("#primary_skill span").html("Chaos Meteor");
			$("#primary_skill").addClass("chaos-meteor");
		}

		// keep old success in history..
		historique2 = historique1;
		historique2_txt = historique1_txt;
		historique1 = $("#primary_skill").attr("class");
		historique1_txt = $("#primary_skill span").html();

		// ... and use this to complete the secondary spell zone
		$("#secondary_skill span").html(historique2_txt);
		$("#secondary_skill").addClass(historique2);
	}

	// if the code = key 4 or 5
	if(code==skill4 || code==skill5){
		if(code==skill4){
			// if already activated, it's a double press
			if($("#primary_skill").is(".press")) {
				double_press("#primary_skill");
			}

			skill_key = "#primary_skill"

			$("#secondary_skill").removeClass("press");
			$("#primary_skill").addClass("press");
		}
		if(code==skill5){
			// if already activated, it's a double press
			if($("#secondary_skill").is(".press")) {
				double_press("#secondary_skill");
			}

			skill_key = "#secondary_skill"

			$("#primary_skill").removeClass("press");
			$("#secondary_skill").addClass("press");
		}
		// if quickcast, fire instantly
		if(quickcast == 1) {
			fire_on_target();
			fast_activation();
		}
		// some skills instant cast (just like quickcast)
		if($(skill_key).is(".ghost-walk")) {
			fire_on_target();
			fast_activation();
		}
		if($(skill_key).is(".forge-spirit")) {
			fire_on_target();
			fast_activation();
		}
	}
};


//////////////////////////////////////////////////////////////////////////////////////
// Double Press
//////////////////////////////////////////////////////////////////////////////////////
function double_press(key) {
	if($(key).is(".alacrity")) {
		fire_on_target();
		fast_activation();
	}
}


//////////////////////////////////////////////////////////////////////////////////////
// Fast activation (visual only)
//////////////////////////////////////////////////////////////////////////////////////
function fast_activation() {
	$("#target").addClass("fastactivation");

	var remove_quickcast_activated = setInterval(function () {
		$("#target").removeClass("fastactivation");

		clearInterval(remove_quickcast_activated);
	}, 100);
}


//////////////////////////////////////////////////////////////////////////////////////
// target clicking
//////////////////////////////////////////////////////////////////////////////////////
function valider_et_enlever(){
	if(combo<=1){			points += 1;
	}else if(combo<=10){	points += 2;
	}else if(combo<=20){	points += 3;
	}else if(combo<=40){	points += 5;
	}else if(combo<=60){	points += 10;
	}

	if(reponses<=1){			time = 5000;
	}else if(reponses<=10){		time = 4500;
	}else if(reponses<=20){		time = 4000;
	}else if(reponses<=30){		time = 3500;
	}else if(reponses<=40){		time = 3000;
	}else if(reponses<=50){		time = 2500;
	}else if(reponses<=100){	time = 2000;
	}else if(reponses<=200){	time = 1500;
	}else if(reponses<=250){	time = 1000;
	}else if(reponses<=350){	time = 800;
	}else if(reponses<=500){	time = 500;
	}

	valider_ou_echec_commun();

	$("#points span").html(points);
	combo += 1;
	$("#combo_points span").html(combo);
	reponses += 1;
	set_timer();
}

function valider_ou_echec_commun(){
	clearInterval(timer);
	$("#questions_list li:first-child").remove();
	if($("#questions_list li:first-child").is("#combo")){
		var combo_length = $("#questions_list li:first-child>div").length;
		time=time*combo_length;
	}
	add_defi(1);
}

function echec_time(){
	if(typeof clignement_error !== 'undefined'){
		clearInterval(clignement_error);
	}

	// blinking effect
	var i = 2;
	$("#start").addClass("gameover");
	clignement_error = setInterval(function () {
		if(i%2==0){
			$("#start").removeClass("gameover");
		}else{
			$("#start").addClass("gameover");
		}
		i++;
		if(i==10){
			$("#start").removeClass("gameover");
			clearInterval(clignement_error);
		}
	}, 100);

	valider_ou_echec_commun();

	combo = 0;
	$("#combo_points span").html(combo);
	life -= 1;
	$("#start i:first-child").remove();

	if(life==0){
		game = 0;
		$("#start").html("GAME OVER Try again ?");
		$("#start").removeClass("selected");
		$("#start").addClass("gameover");
		$(".loading_bar").addClass("gameover");

		$("#start").click(function(){
			start_game(this)
		});
	}else{
		set_timer();
	}
}

function fire_on_target() {
	if(game==1 && skill_key!=0){
		if($(skill_key).hasClass($("#questions_list>li:first-child").attr("class"))){
			valider_et_enlever();
		}else if($(skill_key).hasClass($("#questions_list>li:first-child #s1").attr("class"))){
			$("#questions_list>li:first-child #s1").addClass("selected");
			$("#questions_list>li:first-child #s1").html("<i class='icon-ok-sign'></i>");
		}else if($(skill_key).hasClass($("#questions_list>li:first-child #s2").attr("class"))){
			$("#questions_list>li:first-child #s2").addClass("selected");
			$("#questions_list>li:first-child #s2").html("<i class='icon-ok-sign'></i>");
		}else{
			echec_time();
		}

		$("#primary_skill,#secondary_skill").removeClass("press");
		skill_key = 0;
	}
}

$("#target").mousedown(function(){
	var activated_key = $("#spells_display .press");
	// first, test if the key is not null or undefined
	if(activated_key.length > 0) {
		if(activated_key.is(".ghost-walk")) {
			// don't trigger, it's only an instancast spell
		} else if(activated_key.is(".forge-spirit")) {
			// don't trigger, it's only an instancast spell
		} else {
			fire_on_target();
			$(this).addClass("press");
		}
	}
});

$("#target").mouseup(function(){
	$(this).removeClass("press");
});


//////////////////////////////////////////////////////////////////////////////////////
// Edit keybinding
//////////////////////////////////////////////////////////////////////////////////////
$("#keys_binding_btn").click(function(){
	var touche = 1;
	$("body").unbind('keydown');

	$("#message_content").empty();
	$("#message_content").html("<h2>configure your keys</h2><p>Press the key for <span>skill 1</span></p>");

	$("#message").slideDown();

	$("body").keydown(function(e){
		var code = (e.keyCode ? e.keyCode : e.which);

		if(touche==1){
			skill1=code
			$("#message p").html("Press the key for <span>skill "+(touche+1)+"</span>");
		}
		if(touche==2){
			skill2=code
			$("#message p").html("Press the key for <span>skill "+(touche+1)+"</span>");
		}
		if(touche==3){
			skill3=code
			$("#message p").html("Press the key for <span>skill "+(touche+1)+"</span>");
		}
		if(touche==4){
			skill4=code
			$("#message p").html("Press the key for <span>skill "+(touche+1)+"</span>");
		}
		if(touche==5){
			skill5=code
			$("#message p").html("Press the key for <span>ULTI</span>");
		}
		if(touche==6){
			ulti=code
		}

		touche++;

		if(touche==7){
			touche==1
			$("body").unbind('keydown');
			$("#message").slideUp();

			$("body").keydown(function(e){
				skill_touch(e);
				return false;
			});/* keydown */
		}
		return false;
	});

	return false;
});


//////////////////////////////////////////////////////////////////////////////////////
// visual help
//////////////////////////////////////////////////////////////////////////////////////
$("#visual").click(function(){
	if($("#questions_list").is(".visual_help_on")) {
		$("#questions_list").removeClass("visual_help_on");
	} else {
		$("#questions_list").addClass("visual_help_on");
	}
	return false;
});


//////////////////////////////////////////////////////////////////////////////////////
// Quickcast
//////////////////////////////////////////////////////////////////////////////////////
$("#quickcast_btn").click(function(){
	if(quickcast == 0) {
		quickcast = 1;
		$("#target").addClass("quickcast");
	} else {
		quickcast = 0;
		$("#target").removeClass("quickcast");
	}

	return false;
});


//////////////////////////////////////////////////////////////////////////////////////
// create a question
//////////////////////////////////////////////////////////////////////////////////////
function add_defi(nbr){
	for(var i=0;i<nbr;i++){
		var skill_precedent = skill_random;

		skill_random = Math.ceil(Math.random()*10);

		if(skill_random==skill_precedent){
			skill_random = Math.ceil(Math.random()*10);
		}

		var combo = 0;
		var skill_name;
		var skill_name_text;

		if(skill_random==1){skill_name="alacrity";skill_name_text="Alacrity";}
		else if(skill_random==2){skill_name="chaos-meteor";skill_name_text="Chaos meteor";}
		else if(skill_random==3){skill_name="cold-snap";skill_name_text="Cold snap";}
		else if(skill_random==4){skill_name="deafening-blast";skill_name_text="Deafening blast";}
		else if(skill_random==5){skill_name="emp";skill_name_text="EMP";}
		else if(skill_random==6){skill_name="forge-spirit";skill_name_text="Forge spirit";}
		else if(skill_random==7){skill_name="ghost-walk";skill_name_text="Ghost walk";}
		else if(skill_random==8){skill_name="ice-wall";skill_name_text="Ice wall";}
		else if(skill_random==9){skill_name="sun-strike";skill_name_text="Sun strike";}
		else if(skill_random==10){skill_name="tornado";skill_name_text="Tornado";}


		$("#questions_list").append("<li class='"+skill_name+"'><span>"+skill_name_text+"</span></li>");
		$("#questions_list li:last-child").append("<div class='o1'></div><div class='o2'></div><div class='o3'></div>");
	}
}
add_defi(10);


//////////////////////////////////////////////////////////////////////////////////////
// create a timer
//////////////////////////////////////////////////////////////////////////////////////
function set_timer(){
	$(".loading_bar").stop();
	$(".loading_bar").css("width","100%")
	$(".loading_bar").animate({width:'0%'}, time,"linear")
	$(".loading_bar span").html(time/1000);

	timer = setInterval(function () {
		echec_time();
	}, time);
}


//////////////////////////////////////////////////////////////////////////////////////
// start the game
//////////////////////////////////////////////////////////////////////////////////////
function start_game(e){
	points = 0;
	combo = 0;
	reponses = 0;
	life = 5;
	time = 10000;

	$(".loading_bar").removeClass("gameover");

	$("#message").slideUp(200);

	$(e).html("Health: ");

	for(var i=0;i<life;i++){
		$(e).append("<i class='icon-heart'> </i>");
	}

	$(e).addClass("selected");

	set_timer();

	game = 1;

	$("#start").unbind("click");
}
$("#start").click(function(){
	start_game(this)
});


//////////////////////////////////////////////////////////////////////////////////////
// show the rtules
//////////////////////////////////////////////////////////////////////////////////////
$("#message .close").click(function(){
	$("#message").slideUp();
});


// end document ready
});
