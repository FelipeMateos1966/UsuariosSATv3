document.addEventListener('DOMContentLoaded', () => {
  const requestButton = document.getElementById('request-perms-btn');
  const videoPreview = document.getElementById('preview');
  const statusElement = document.getElementById('status');
  let stream;

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    statusElement.textContent = 'La API de MediaDevices no es soportada en este navegador.';
    requestButton.disabled = true;
    return;
  }

  requestButton.addEventListener('click', async () => {
    try {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      
      statusElement.textContent = 'Solicitando acceso...';
      stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      
      videoPreview.srcObject = stream;
      videoPreview.style.display = 'block';
      statusElement.textContent = 'Acceso concedido. La cámara y el micrófono están activos para grabación.';
      requestButton.textContent = 'Reiniciar Cámara';
      
    } catch (err) {
      console.error('Error al solicitar acceso a medios:', err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        statusElement.textContent = 'Permiso denegado. Por favor, habilita el acceso en la configuración de tu navegador.';
      } else {
        statusElement.textContent = `Error: ${err.name} - ${err.message}`;
      }
    }
  });
});