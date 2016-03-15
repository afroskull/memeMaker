    function textChangeListener (evt) {
      var id = evt.target.id;
      var text = evt.target.value;
      
      if (id == "topText") {
        window.topText = text;
      } else {
        window.bottomText = text;
      }
      
      redrawMeme(window.imageSrc, window.topText, window.bottomText);
    }
    
    function redrawMeme(image, topLine, bottomLine) {
      // Get daMeme2DContext
      var daMeme = document.querySelector('#daMeme');
      var ctx = daMeme.getContext("2d");
      //draw image 
      ctx.drawImage(image, 0,0, daMeme.width, daMeme.height);

      ctx.font ='30pt Impact';
      ctx.textAlign = 'center';
      ctx.strokeWidth = 1;
      ctx.fillStyle = "white";
      ctx.fillText(bottomText, daMeme.width/2, daMeme.height - 20);
      ctx.strokeText(bottomText, daMeme.width/2, daMeme.height - 20);

      ctx.fillText(topText, daMeme.width/2, 50);
      ctx.strokeText(topText, daMeme.width/2, 50);

    }

    function handleFileSelect(evt) {
      var daMemeWidth = 500;
      var daMemeHeight = 500;
      var file = evt.target.files[0];
      
      
      
      var reader = new FileReader();
      reader.onload = function(fileObject) {
        var data = fileObject.target.result;
        
        // Create an image object
        var image = new Image();
        image.onload = function() {
          
          window.imageSrc = this;
          redrawMeme(window.imageSrc, null, null);
        }
        
        // Set image data to background image.
        image.src = data;
        console.log(fileObject.target.result);
      };
      reader.readAsDataURL(file)
    }
    
    window.topText = "";
    window.bottomText = "";
    var input1 = document.getElementById('topText');
    var input2 = document.getElementById('bottomText');
    input1.oninput = textChangeListener;
    input2.oninput = textChangeListener;
    document.getElementById('file').addEventListener('change', handleFileSelect, false);

  function dlCanvas() {
  var dt = daMeme.toDataURL('image/png');

  dt = dt.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');

  dt = dt.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=dankNess.png');

  this.href = dt;
};

document.getElementById("download").addEventListener('click', dlCanvas, false);
