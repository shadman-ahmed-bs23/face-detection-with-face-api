let input1 = document.getElementById('img1');
let croppedImage1 = document.getElementById('cropped-img1');
let image1;

// Load the model.
Promise.all([
  faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
]).then(() => {
    image1 = detectface(input1, croppedImage1);
  }
)

// Function to detect the face.
var detectface = async function (input, croppedImage){
  const output = await faceapi.detectAllFaces(input);
  detections = output[0].box;
  let res = extractFaceFromBox(input, detections, croppedImage);
  return res;
}

// Function to draw image from the box data.
async function extractFaceFromBox(imageRef, box, croppedImage) {
  const regionsToExtract = [
    new faceapi.Rect(box.x, box.y, box.width, box.height)
  ];
  let faceImages = await faceapi.extractFaces(imageRef, regionsToExtract);

  if (faceImages.length === 0) {
    console.log("No face found");
  } else {

    faceImages.forEach((cnv) => {
      croppedImage.src = cnv.toDataURL();
    });
    console.log(croppedImage.src);
    return croppedImage.src;
  }
}
