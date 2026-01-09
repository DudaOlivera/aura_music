const audioInput = document.getElementById("audioInput");
const startBtn = document.getElementById("startBtn");
const tableBody = document.getElementById("musicTableBody");
const fileCountText = document.getElementById("fileCount");

let globalAudio = new Audio(); 
let currentPlayBtn = null;

audioInput.addEventListener("change", function() {
    const newFiles = Array.from(this.files);
    if (newFiles.length > 0) {
        fileCountText.innerText = `${newFiles.length} arquivos prontos`;
        startBtn.disabled = false;
        newFiles.forEach(file => {
            const row = document.createElement("tr");
            row.fileData = file;
            row.dataset.status = "pending"; 
            row.innerHTML = `
                <td>${file.name}</td>
                <td class="status-cell"><span class="badge">Aguardando</span></td>
                <td class="action-cell" style="text-align: center;">---</td>
            `;
            tableBody.appendChild(row);
        });
    }
});

startBtn.addEventListener("click", async () => {
    const pendingRows = Array.from(tableBody.querySelectorAll('tr[data-status="pending"]'));
    startBtn.disabled = true;
    startBtn.innerText = "IA ANALISANDO...";
    for (const row of pendingRows) {
        await analyzeFile(row);
    }
    startBtn.innerText = "ANÁLISE CONCLUÍDA";
});

async function analyzeFile(row) {
    const statusCell = row.querySelector(".status-cell");
    const actionCell = row.querySelector(".action-cell");
    statusCell.innerHTML = `<span class="badge active" style="color:var(--primary-glow)">Processando...</span>`;

    const formData = new FormData();
    formData.append("file", row.fileData);

    try {
        const response = await fetch("http://127.0.0.1:8000/analyze", { method: "POST", body: formData });
        const data = await response.json();
        row.dataset.status = "done";
        statusCell.innerHTML = `<span class="badge active">${data.genre}</span>`;
        
        actionCell.innerHTML = `
            <div class="action-group">
                <button class="mini-btn btn-play">▶ Ouvir</button>
                <button class="mini-btn btn-org" style="border-color:var(--primary-glow); color:var(--primary-glow)">Organizar</button>
            </div>
        `;

        const playBtn = actionCell.querySelector(".btn-play");
        playBtn.onclick = () => {
            if (currentPlayBtn === playBtn) {
                if (!globalAudio.paused) {
                    globalAudio.pause();
                    playBtn.innerText = "▶ Ouvir";
                    playBtn.classList.remove("playing");
                } else {
                    globalAudio.play();
                    playBtn.innerText = "⏸ Pausar";
                    playBtn.classList.add("playing");
                }
                return;
            }
            if (currentPlayBtn) {
                currentPlayBtn.innerText = "▶ Ouvir";
                currentPlayBtn.classList.remove("playing");
            }
            const fileURL = URL.createObjectURL(row.fileData);
            globalAudio.src = fileURL;
            globalAudio.play();
            currentPlayBtn = playBtn;
            playBtn.innerText = "⏸ Pausar";
            playBtn.classList.add("playing");
        };
    } catch (err) {
        statusCell.innerHTML = `<span class="badge" style="color:#ff4b4b">Erro</span>`;
    }
}