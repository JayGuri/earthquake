import pickle
import numpy as np
from pathlib import Path
import sys
import json

def load_alert_models():
    models_path = Path(__file__).parent.parent / 'models'
    
    with open(models_path / 'label_encoder.pkl', 'rb') as f:
        label_encoder = pickle.load(f)
    
    with open(models_path / 'scaler.pkl', 'rb') as f:
        scaler = pickle.load(f)
    
    with open(models_path / 'best_xgb_model.pkl', 'rb') as f:
        model = pickle.load(f)
    
    return label_encoder, scaler, model

def load_significance_models():
    models_path = Path(__file__).parent.parent / 'models'
    
    with open(models_path / 'sig_feature_info.pkl', 'rb') as f:
        feature_info = pickle.load(f)
    
    with open(models_path / 'sig_model.pkl', 'rb') as f:
        model = pickle.load(f)
    
    with open(models_path / 'sig_selected_features.pkl', 'rb') as f:
        selected_features = pickle.load(f)
    
    with open(models_path / 'sig_transformers.pkl', 'rb') as f:
        transformers = pickle.load(f)
    
    return feature_info, model, selected_features, transformers

def predict_alert(features):
    label_encoder, scaler, model = load_alert_models()
    # Scale the features
    scaled_features = scaler.transform(np.array(features).reshape(1, -1))
    
    # Make prediction
    prediction = model.predict(scaled_features)
    
    # Decode the prediction
    predicted_label = label_encoder.inverse_transform(prediction)[0]
    
    return predicted_label

def predict_significance(features):
    feature_info, model, selected_features, transformers = load_significance_models()
    # Prepare the features
    feature_dict = dict(zip(selected_features, features))
    X = np.array([feature_dict[feature] for feature in selected_features]).reshape(1, -1)
    
    # Apply transformations
    for feature, transformer in transformers.items():
        if feature in selected_features:
            col_index = selected_features.index(feature)
            X[:, col_index] = transformer.transform(X[:, col_index].reshape(-1, 1)).ravel()
    
    # Make prediction
    prediction = model.predict(X)
    
    return prediction[0]

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python prediction_utils.py <predict_alert|predict_significance> '<features>'")
        sys.exit(1)

    prediction_type = sys.argv[1]
    features = json.loads(sys.argv[2])

    if prediction_type == "predict_alert":
        result = predict_alert(features)
    elif prediction_type == "predict_significance":
        result = predict_significance(features)
    else:
        print(f"Unknown prediction type: {prediction_type}")
        sys.exit(1)

    print(result)

