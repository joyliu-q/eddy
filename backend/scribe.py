from transformers import pipeline

# Load the model
rec = pipeline("automatic-speech-recognition")

def transcribe_audio(audio: bytes) -> str:
    # Run the model
    output = rec(audio)

    return output

