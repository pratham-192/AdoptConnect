from transformers import pipeline

classifier = pipeline("zero-shot-classification")
sentiment_labels = ["Prompt","Postpone"]

def get_prediction(text: str) -> str:
    if text.strip() == "":
        return "unknown"
    else:
        result = classifier(text, sentiment_labels)
        return result["labels"][0]