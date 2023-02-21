from transformers import pipeline

# Load the model
# rec = pipeline("automatic-speech-recognition",  max_length=2000)
rec = pipeline("automatic-speech-recognition", model="openai/whisper-small.en")


def transcribe_audio(audio: bytes) -> str:
    # Run the model
    output = rec(audio)

    return output

