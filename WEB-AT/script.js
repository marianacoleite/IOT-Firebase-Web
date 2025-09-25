// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAI3W33hH-Nu1ZqWoEzePSPdCnMt48PwtQ",
  authDomain: "ledweb-7233e.firebaseapp.com",
  databaseURL: "https://ledweb-7233e-default-rtdb.firebaseio.com",
  projectId: "ledweb-7233e",
  storageBucket: "ledweb-7233e.appspot.com",
  messagingSenderId: "136599173577",
  appId: "1:136599173577:web:481a82dacb5524bcd6d018"
};

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const switches = [
  {
    key: "main",
    switchElement: document.getElementById("switchVermelho"),
    statusElement: document.getElementById("statusVermelho"),
    imgElement: document.getElementById("imgVermelho"),
    lampButton: document.getElementById("lampVermelho")
  },
  {
    key: "yellow",
    switchElement: document.getElementById("switchAmarelo"),
    statusElement: document.getElementById("statusAmarelo"),
    imgElement: document.getElementById("imgAmarelo"),
    lampButton: document.getElementById("lampAmarelo")
  },
  {
    key: "green",
    switchElement: document.getElementById("switchVerde"),
    statusElement: document.getElementById("statusVerde"),
    imgElement: document.getElementById("imgVerde"),
    lampButton: document.getElementById("lampVerde")
  }
];

function atualizarEstadoLED(key, switchEl, statusEl, imgEl, lampBtn) {
  const path = `led/${key}`;

  database.ref(path).on("value", (snapshot) => {
    const estado = snapshot.val();

    if (estado === 1) {
      switchEl.classList.add("on");
      statusEl.textContent = "Ligado";

      let nomeImagemLigada = "";
      switch (key) {
        case "main":
          nomeImagemLigada = "ledver.png";
          break;
        case "yellow":
          nomeImagemLigada = "ledamarelo.png";
          break;
        case "green":
          nomeImagemLigada = "ledverde.png";
          break;
      }

      imgEl.src = `img/${nomeImagemLigada}`;
      imgEl.classList.add("led-on-animation", "glow");
      lampBtn.classList.add("on");
    } else {
      switchEl.classList.remove("on");
      statusEl.textContent = "Desligado";
      imgEl.src = "img/ledapagada.png";
      imgEl.classList.remove("led-on-animation", "glow");
      lampBtn.classList.remove("on");
    }
  });

  const toggleEstado = () => {
    database.ref(path).once("value").then((snapshot) => {
      const estadoAtual = snapshot.val();
      const novoEstado = estadoAtual === 1 ? 0 : 1;
      database.ref(path).set(novoEstado);
    });
  };

  switchEl.addEventListener("click", toggleEstado);
  lampBtn.addEventListener("click", toggleEstado);
}

switches.forEach(({ key, switchElement, statusElement, imgElement, lampButton }) => {
  atualizarEstadoLED(key, switchElement, statusElement, imgElement, lampButton);
});
