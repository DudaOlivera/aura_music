import os
import numpy as np
import joblib
from sklearn.ensemble import RandomForestClassifier
from features import extract_features

DATASET_DIR = "../dataset"
X, y = [], []

for genre in os.listdir(DATASET_DIR):
    genre_path = os.path.join(DATASET_DIR, genre)
    if not os.path.isdir(genre_path):
        continue

    for file in os.listdir(genre_path):
        if file.endswith(".mp3"):
            path = os.path.join(genre_path, file)
            features = extract_features(path)
            X.append(features)
            y.append(genre)

model = RandomForestClassifier(n_estimators=200)
model.fit(X, y)

joblib.dump(model, "model.joblib")
print("✅ Modelo treinado e salvo")
