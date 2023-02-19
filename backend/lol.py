from transformers import pipeline

rec = pipeline("automatic-speech-recognition", model="openai/whisper-small.en")

output = rec("mlk.flac")
print(output)