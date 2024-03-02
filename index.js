
const input = document.getElementById('enviarArchivo')

    input.addEventListener('change', (event) => {
      const target = event.target
      if (target.files && target.files[0]) {
        const maxAllowedSize = 25 * 1024 * 1024;
        if (target.files[0].size > maxAllowedSize) {
          target.value = ''
        }
      }
    })



    const socket = io({
      transports: ['websocket'],
      upgrade: false,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: Infinity,
      autoConnect: true,
      maxHttpBufferSize: 1e8, 
    });

    const id = document.getElementById("tuid");
   
    socket.on("connect", () => {
      id.innerText = socket.id;

      qrcode.clear();
      qrcode.makeCode("http://vps-44df9322.vps.ovh.net/?id?=" + socket.id);

      socket.on(socket.id, (mensaje) => {
        console.log(mensaje);

        const downloadButton = document.createElement("button");
        downloadButton.innerText = "Descargar Archivo";
        downloadButton.addEventListener("click", () => {
          const linkSource = mensaje.archivo;
          const downloadLink = document.createElement("a");
          downloadLink.href = linkSource;
          downloadLink.download = mensaje.nombre;
          downloadLink.click();
        });

        const recibidoArchivoDiv = document.getElementById("recibido_Archivo");
        recibidoArchivoDiv.innerHTML = "";
        recibidoArchivoDiv.appendChild(downloadButton);
      });
    });

