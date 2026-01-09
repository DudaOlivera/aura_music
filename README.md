```markdown
# 🎵 Aura Sound | AI Music Classifier

O **Aura Sound** é um ecossistema inteligente de análise de áudio que utiliza Processamento Digital de Sinais (DSP) e Machine Learning para identificar gêneros musicais e organizar bibliotecas automaticamente.

---

## 🚀 Como Executar

### 1. Preparação do Ambiente
Certifique-se de ter o Python 3.8 ou superior instalado.

**Instale as dependências:**
```bash
pip install fastapi uvicorn librosa numpy scikit-learn joblib python-multipart

```

## 2. Treinamento da IA

Para que a IA saiba identificar os gêneros, você precisa treiná-la com seus próprios arquivos:

1. Crie uma pasta `dataset/`.
2. Dentro dela, crie subpastas com os nomes dos gêneros (ex: `Rock`, `Pop`, `Jazz`).
3. Coloque amostras `.mp3` dentro de cada respectiva pasta.
4. Execute o treino:

```bash
python ai/train.py

```

## 3. Execução do Servidor

Com o modelo `model.joblib` gerado, inicie o backend:

```bash
uvicorn main:app --reload

```

*O frontend pode ser aberto simplesmente iniciando o `index.html` no navegador.*

---

## 🛠️ Tecnologias Utilizadas

| Camada | Tecnologia |
| --- | --- |
| **Backend** | FastAPI (Python) |
| **IA/DSP** | Librosa, Scikit-Learn, Joblib |
| **Frontend** | Vanilla JS, CSS Glassmorphism |
| **Audio Engine** | Web Audio API |

---

## 📂 Estrutura do Projeto

* **`ai/features.py`**: Extrai MFCCs, Chroma e RMS do áudio (converte som em números).
* **`ai/train.py`**: Treina o classificador Random Forest.
* **`main.py`**: API que recebe o áudio, aplica o modelo e organiza os arquivos.
* **`script.js`**: Gerencia o upload, fila de processamento e player de áudio.
* **`style.css`**: Interface moderna com foco em UX e efeitos de brilho.

---

## 🧠 Como a IA Analisa a Música?

O sistema extrai características matemáticas únicas de cada arquivo:

* **MFCCs:** Analisam o timbre e a "cor" do som.
* **Chroma:** Identifica a estrutura harmônica e notas predominantes.
* **RMS:** Captura a energia e a variação de volume da faixa.

---

## ⚙️ Funcionalidades

* ✅ **Análise Neural em Lote**: Processe várias músicas simultaneamente.
* ✅ **Preview de Áudio**: Player integrado para conferir a faixa analisada.
* ✅ **Organização Dinâmica**: Move arquivos para pastas categorizadas via sistema.
* ✅ **Interface Futurista**: Totalmente responsiva com efeitos Glassmorphism.

---

⚡ *Powered by Aura Engine IA*

```
