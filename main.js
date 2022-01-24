song="";
song1="";
leftwristX=0;
leftwristY=0;
rightwristX=0;
rightwristY=0;
scoreleftwrist=0;
scorerightwrist=0;
function preload(){
    song=loadSound("music.mp3");
    song1=loadSound("music.mp3");
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function draw(){
    image(video,0,0,600,500);
    fill("#ff0000");
    stroke("#ff0000");
    if(scoreleftwrist>0.2){
        circle(leftwristX,leftwristY,20);
        song1.stop();
        song.play();
    }
}
function modelLoaded(){
    console.log('Posenet Is Initialized');
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        leftwristX= results[0].pose.leftWrist.x;
        leftwristY= results[0].pose.leftWrist.y;
        rightwristX= results[0].pose.rightWrist.x;
        rightwristY= results[0].pose.rightWrist.y;
        console.log("leftwristX="+leftwristX+"leftwrristY="+leftwristY);
        console.log("rightwristX="+rightwristX+"rightwrristY="+rightwristY);
        scoreleftwrist=results[0].pose.keypoints[9].score;
        scorerightwrist=results[0].pose.keypoints[10].score;
        console.log("scoreleftwrist="+scoreleftwrist+"scorerightwrist="+scorerightwrist);
    }
}