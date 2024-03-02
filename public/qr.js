var qrcode = new QRCode("qrcode", {
    text: "http://vps-44df9322.vps.ovh.net/?id?=" + socket.id,
    width: 128,
    height: 128,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
  })