# 🎵 Aura Sound | AI Music Classifier

O **Aura Sound** é uma solução Full Stack que utiliza Processamento Digital de Sinais (DSP) e Machine Learning para identificar gêneros musicais e organizar bibliotecas de áudio automaticamente.

---

## Como Executar

## 1. Backend (Python)

Certifique-se de ter o Python 3.8+ instalado.

1. **Instale as dependências:**

```bash
pip install fastapi uvicorn librosa numpy scikit-learn joblib python-multipart

```

2. **Treine o modelo:**
Organize suas músicas em `dataset/[genero]/musica.mp3` e execute:

```bash
python ai/train.py

```

3. **Inicie a API:**

```bash
uvicorn main:app --reload

```

## 2. Frontend (Web)

Para evitar problemas de permissão de arquivos e requisições (CORS), execute o frontend utilizando um servidor HTTP:

1. No front end do projeto (onde está o `index.html`), execute:

```bash
python3 -m http.server 5501

```

2. Acesse no seu navegador:
`http://localhost:5501`

---

## 🛠️ Tecnologias

* **FastAPI:** Backend assíncrono de alta performance.
* **Librosa:** Extração de MFCCs, Chroma e RMS.
* **Scikit-Learn:** Classificação via Random Forest.
* **Glassmorphism UI:** Interface moderna com CSS puro.

---

## 📂 Estrutura do Projeto

```text
├── ai/
│   ├── features.py   # Extração de dados matemáticos do áudio
│   ├── train.py      # Script de treinamento do Random Forest
│   └── model.joblib  # Modelo binário salvo
├── main.py           # API principal e rotas (Analyze/Organize)
├── index.html        # UI com sistema de Dropzone
├── style.css         # Design futurista e responsivo
└── script.js         # Integração com a API e player de áudio

```

---

## 🧠 Lógica de Análise Neural

A IA não "ouve" a música, ela interpreta dados extraídos do sinal de áudio:

1. **MFCCs (13 coeficientes):** Capturam o timbre e a "textura" do som.
2. **Chroma STFT:** Identifica a intensidade das 12 notas musicais (harmonia).
3. **RMS:** Mede a energia e potência sonora da faixa.

---

## ⚙️ Funcionalidades

* **Análise em Lote:** Importe múltiplos arquivos de uma vez.
* **Feedback em Tempo Real:** Status visual do processamento via badges.
* **Player Integrado:** Ouça a música diretamente na tabela após a análise.
* **Organização Automática:** Move os arquivos para pastas baseadas no gênero detectado.

---

⚡ *Powered by Aura Engine IA*
