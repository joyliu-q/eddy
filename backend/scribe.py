from transformers import pipeline

# Load the model
rec = pipeline("automatic-speech-recognition", model="openai/whisper-small.en",  max_length=2000)

def transcribe_audio(audio: bytes) -> str:
    # Run the model
    output = rec(audio, max_length=2000)

    return output

