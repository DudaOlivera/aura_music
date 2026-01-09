import librosa
import numpy as np

def extract_features(file_path, duration=30):
    y, sr = librosa.load(file_path, duration=duration)

    mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)
    mfcc_mean = mfcc.mean(axis=1)

    chroma = librosa.feature.chroma_stft(y=y, sr=sr).mean(axis=1)
    rms = librosa.feature.rms(y=y).mean()

    return np.hstack([mfcc_mean, chroma, rms])
