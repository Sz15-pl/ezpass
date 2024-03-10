var qrcode = new QRCode("qrcode", {
    text: window.location + "/?id=" + ID,
    width: 128,
    height: 128,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
  })