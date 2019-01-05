$(document).ready(function() {

/* prechargement */
function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
        // Alternatively you could use:
        // (new Image()).src = this;
    });
}

// Usage:

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
/* prechargement */


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
var skill_random;
var historique1;
var historique2;
var historique3;
var historique4;
var historique5;
var historique1_txt;
var historique2_txt;
var historique3_txt;
var historique4_txt;
var historique5_txt;
var skill_key = 0;

var i = 1;
var item;
var game = 0;
$("body").keydown(function(e){
	skill_touch(e);
	return false;
});/* keydown */
$("body").keyup(function(e){
	skill_touch_release(e);
	return false;
});/* keydown */

function skill_touch(e){
	var code = (e.keyCode ? e.keyCode : e.which);
	
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
		
		$("#champs li:nth-child("+i+")").removeClass();
		$("#champs li:nth-child("+i+")").addClass(item);
		i++;
		if(i==4){i=1}
	}//if code 1 2 3
	
	if(code==ulti){
		var nbr_quas = $("li.quas").length;
		var nbr_wex = $("li.wex").length;
		var nbr_exort = $("li.exort").length;
		
		$("#skill").removeClass();
		$("#skill_secondaire").removeClass();
		
		if(nbr_quas==3 && nbr_wex==0 && nbr_exort==0){
			$("#skill span").html("Cold Snap");
			$("#skill").addClass("cold-snap");
		}
		if(nbr_quas==0 && nbr_wex==3 && nbr_exort==0){
			$("#skill span").html("EMP");
			$("#skill").addClass("emp");
		}
		if(nbr_quas==0 && nbr_wex==0 && nbr_exort==3){
			$("#skill span").html("Sun Strike");
			$("#skill").addClass("sun-strike");
		}
		
		if(nbr_quas==1 && nbr_wex==1 && nbr_exort==1){
			$("#skill span").html("Deafening Blast");
			$("#skill").addClass("deafening-blast");
		}
		
		if(nbr_quas==2 && nbr_wex==1 && nbr_exort==0){
			$("#skill span").html("Ghost Walk");
			$("#skill").addClass("ghost-walk");
		}
		if(nbr_quas==2 && nbr_wex==0 && nbr_exort==1){
			$("#skill span").html("Ice Wall");
			$("#skill").addClass("ice-wall");
		}
		
		if(nbr_quas==1 && nbr_wex==2 && nbr_exort==0){
			$("#skill span").html("Tornado");
			$("#skill").addClass("tornado");
		}
		if(nbr_quas==0 && nbr_wex==2 && nbr_exort==1){
			$("#skill span").html("Alacrity");
			$("#skill").addClass("alacrity");
		}
		
		if(nbr_quas==1 && nbr_wex==0 && nbr_exort==2){
			$("#skill span").html("Forge Spirit");
			$("#skill").addClass("forge-spirit");
		}
		if(nbr_quas==0 && nbr_wex==1 && nbr_exort==2){
			$("#skill span").html("Chaos Meteor");
			$("#skill").addClass("chaos-meteor");
		}
		
		//historique
		historique5 = historique4;
		historique5_txt = historique4_txt;
		historique4 = historique3;
		historique4_txt = historique3_txt;
		historique3 = historique2;
		historique3_txt = historique2_txt;
		historique2 = historique1;
		historique2_txt = historique1_txt;
		historique1 = $("#skill").attr("class");
		historique1_txt = $("#skill span").html();
		
		$("#skill_secondaire span").html(historique2_txt);
		$("#skill_secondaire").addClass(historique2);
		
		//Les combos
		if(historique3 == "cold-snap" && historique2 == "sun-strike" && historique1 == "alacrity"){
			$("#skill").addClass("combo1");
		}
	}/* id code ulti */
	
	
	if(code==skill4 || code==skill5){
		$("#skill,#skill_secondaire").removeClass("press");
		if(code==skill4){
			skill_key = "#skill"
			$("#skill").addClass("press");
		}
		if(code==skill5){
			skill_key = "#skill_secondaire"
			$("#skill_secondaire").addClass("press");
		}
	}// if skill 4 ou skill 5   montrer le skill dans l'afficheur
};/* press key */

function skill_touch_release(e){
	var code = (e.keyCode ? e.keyCode : e.which);
};/* release key */

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
}//valider_et_enlever
function valider_ou_echec_commun(){
	clearInterval(timer);
	$("#liste li:first-child").remove();
	if($("#liste li:first-child").is("#combo")){
		var combo_length = $("#liste li:first-child>div").length;
		time=time*combo_length;
	}
	add_defi(1);
}//valider_ou_echec_commun
function echec_time(){
	if(typeof clignement_error !== 'undefined'){
		clearInterval(clignement_error);
	}
	//clignotement
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
	//END clignotement
	
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
		$(".chargement").addClass("gameover");
		
		$("#start").click(function(){
			start_game(this)
		});
	}else{
		set_timer();
	}
}/* echec_time */

$("#target").click(function(){
	if(game==1 && skill_key!=0){
		if($(skill_key).hasClass($("#liste>li:first-child").attr("class"))){
			valider_et_enlever();
		}else if($(skill_key).hasClass($("#liste>li:first-child #s1").attr("class"))){
			$("#liste>li:first-child #s1").addClass("selected");
			$("#liste>li:first-child #s1").html("<i class='icon-ok-sign'></i>");
		}else if($(skill_key).hasClass($("#liste>li:first-child #s2").attr("class"))){
			$("#liste>li:first-child #s2").addClass("selected");
			$("#liste>li:first-child #s2").html("<i class='icon-ok-sign'></i>");
		}else{
			echec_time();
		}
		
		$("#skill,#skill_secondaire").removeClass("press");
		skill_key = 0;
	}//if game
});

/* CONFIGURER LES TOUCHES *************************************/
$("#keys").click(function(){
	var touche = 1;
	$("body").unbind('keydown');
	
	$("#message h2").html("configure your keys");
	$("#message p").html("Press the key for <span>skill 1</span>");
	$("#message").slideDown();
	
	$("body").keydown(function(e){
		var code = (e.keyCode ? e.keyCode : e.which);
		$("#message p").html("Press the key for <span>skill "+(touche+1)+"</span>");
		
		if(touche==1){
			skill1=code
		}
		if(touche==2){
			skill2=code
		}
		if(touche==3){
			skill3=code
		}
		if(touche==4){
			skill4=code
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
	});/* keydown */
	
	return false;
});/* keys clic */
/* END CONFIGURER LES TOUCHES *************************************/

/* AIDE VISUELLE *****************************************/
$("#visual").click(function(){
	$(".o1").show();
	$(".o2").show();
	$(".o3").show();
return false;
});
/* END AIDE VISUELLE *****************************************/

/* FONCTION CREER UN DEFI ********************************/
function add_defi(nbr){
	for(var i=0;i<nbr;i++){
		var skill_precedent = skill_random;
		skill_random = Math.ceil(Math.random()*11);
		if(skill_random==skill_precedent){
			skill_random = Math.ceil(Math.random()*11);
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
		else if(skill_random==11){skill_name="combo1";skill_name_text="Solo target combo !";combo=1;}
		
		if(combo==1){
			$("#liste").append("<li id='combo' class='"+skill_name+"'><span>"+skill_name_text+"</span></li>");
			$("#liste li:last-child").append("<div id='s1' class='cold-snap'></div><div id='s2' class='sun-strike'></div><div id='s3' class='alacrity'></div>");
		}else{
			$("#liste").append("<li class='"+skill_name+"'><span>"+skill_name_text+"</span></li>");
			$("#liste li:last-child").append("<div class='o1'></div><div class='o2'></div><div class='o3'></div>");
		}
	}
}
add_defi(10);
/* FONCTION CREER UN DEFI ********************************/

/* TIMER **************************************/
function set_timer(){
	$(".chargement").stop();
	$(".chargement").css("width","100%")
	$(".chargement").animate({width:'0%'}, time,"linear")
	$(".chargement span").html(time/1000);
	
	timer = setInterval(function () {
		echec_time();
	}, time);
}

$("#start").click(function(){
	start_game(this)
});
function start_game(e){
	points = 0;
	combo = 0;
	reponses = 0;
	life = 5;
	time = 10000;
	
	$(".chargement").removeClass("gameover");	
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
/* END TIMER **************************************/

/* RULES **********************************************/
$("#message .close").click(function(){
	$("#message").slideUp();
});
/* END RULES **********************************************/




















/* PUR VISUEL ***************************/
$("#target").mousedown(function(){
	$(this).addClass("press");
});
$("#target").mouseup(function(){
	$(this).removeClass("press");
});



/* END PUR VISUEL ***************************/

});/* doc ready */