window.addEventListener('DOMContentLoaded', () => {
  const imageInput = document.getElementById('imageInput');
  const topTextInput = document.getElementById('topText');
  const bottomTextInput = document.getElementById('bottomText');
  const generateBtn = document.getElementById('generateBtn');
  const downloadBtn = document.getElementById('downloadBtn');
  const instagramBtn = document.getElementById('instagramBtn');
  const canvas = document.getElementById('memeCanvas');
  const ctx = canvas.getContext('2d');

  let image = null;

  // Load and preview the selected image
  imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function () {
      image = new Image();
      image.src = reader.result;

      image.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      };
    };
    reader.readAsDataURL(file);
  });

  // Generate meme with text
  generateBtn.addEventListener('click', () => {
    if (!image) return alert('Please upload an image first.');

    const topText = topTextInput.value.toUpperCase();
    const bottomText = bottomTextInput.value.toUpperCase();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.textAlign = 'center';
    ctx.font = 'bold 30px Impact';

    // Draw top text
    ctx.fillText(topText, canvas.width / 2, 40);
    ctx.strokeText(topText, canvas.width / 2, 40);

    // Draw bottom text
    ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);
    ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20);
  });

  // Download meme as PNG
  downloadBtn.addEventListener('click', () => {
    const imageUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'my-meme.png';
    link.href = imageUrl;
    link.click();
  });

  // Open Instagram
  instagramBtn.addEventListener('click', () => {
    alert("Instagram doesn't allow direct uploads from browsers. You can upload it manually after downloading.");
    window.open('https://www.instagram.com/', '_blank');
  });
});