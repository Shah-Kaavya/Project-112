Prediction_1="";
Prediction_2="";
Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
});
camera = document.getElementById("camera");
Webcam.attach( '#camera' );
function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Mh4OnMuk9/model.json',modelLoaded);
function modelLoaded()
{
    console.log('Model Loaded!');
}
function speak()
{
    var synth = window.speechSynthesis;
    speak_data_1 = "The First Prediction is " + Prediction_1;
    speak_data_2 = " And The Second Prediction is " + Prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}
function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}
function gotResult(error, results)  {
    if(error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        Prediction_1 = results[0].label;
        Prediction_2 = results[1].label;
        speak();
        if(results[0].label == "Best")
        {
            document.getElementById("update_emoji").innerHTML = "&#128077;";
        }
        if(results[0].label == "Amazing")
        {
            document.getElementById("update_emoji").innerHTML = "&#128076;";
        }
        if(results[0].label == "Victory")
        {
            document.getElementById("update_emoji").innerHTML = "&#9996;";
        }

        if (results[1].label == "Best")
        {
            document.getElementById("update_emoji2").innerHTML = "&#128077;";
        }
        if (results[1].label == "Amazing")
        {
            document.getElementById("update_emoji2").innerHTML = "&#128076;";
        }
        if (results[1].label == "Victory")
        {
            document.getElementById("update_emoji2").innerHTML = "&#9996;";
        }
    }
}