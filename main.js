function setup(){
    canvas = createCanvas(280,280);
    canvas.center();
    background("white");
    synth = window.SpeechSynthesis;
    canvas.mouseReleased(classifyCanvas);
}

function clearcanvas(){
    background("white");
}
function preload(){
    classifier = ml5.imageClassifier('DoodleNet');
}

function draw(){
    strokeWeight(12);
    stroke(0);
    if (mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);

    }
}

function classifyCanvas(){
    classifier.classify(canvas, gotResults);
}

function gotResults(error, results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("name_drawn_sketch").innerHTML = "Label= " + results[0].label;
        document.getElementById("confidence_drawn_sketch").innerHTML = "confidence= " + Math.round(results[0].confidence * 100) + "%";
        utterThis = new SpeechSynthesisUtterance(results[0].label);
        synth.speak(utterThis);
    }
}