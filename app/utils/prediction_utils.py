import pickle
import sys
import json
import logging
from pathlib import Path
import os

import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

MODELS_PATH = Path(__file__).parent.parent / 'models'

def check_dependencies():
    dependencies = {
        'numpy': 'NumPy',
        'sklearn': 'scikit-learn',
    }
    
    for module, name in dependencies.items():
        try:
            __import__(module)
            logging.info(f"{name} imported successfully")
        except ImportError as e:
            logging.error(f"{name} is not installed. Error: {str(e)}")
            logging.error(f"Please install it using: pip install {module}")
            sys.exit(1)
        except Exception as e:
            logging.error(f"Error importing {name}: {str(e)}")
            sys.exit(1)

    # Print Python and package versions
    import numpy
    import sklearn
    logging.info(f"Python version: {sys.version}")
    logging.info(f"NumPy version: {numpy.__version__}")
    logging.info(f"scikit-learn version: {sklearn.__version__}")

check_dependencies()

def create_and_save_models():
    # Create a dummy dataset
    X = np.random.rand(100, 4)  # 100 samples, 4 features
    y = np.random.randint(0, 3, 100)  # 3 classes

    # Create and fit the scaler
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    # Create and fit the model
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_scaled, y)

    # Save the scaler
    with open(MODELS_PATH / 'scaler.pkl', 'wb') as f:
        pickle.dump(scaler, f)

    # Save the model
    with open(MODELS_PATH / 'model.pkl', 'wb') as f:
        pickle.dump(model, f)

    logging.info("New scaler and model created and saved successfully.")

def load_model(file_name):
    file_path = MODELS_PATH / file_name
    try:
        if not file_path.exists():
            raise FileNotFoundError(f"File '{file_name}' not found in '{MODELS_PATH}'.")
        
        logging.info(f"Loading model from {file_path}")
        with open(file_path, 'rb') as f:
            model = pickle.load(f)
        logging.info(f"Model loaded successfully: {type(model)}")
        return model
    except Exception as e:
        logging.error(f"Error loading '{file_name}': {e}")
        logging.error(f"File size: {os.path.getsize(file_path) if file_path.exists() else 'N/A'}")
        return None

def load_alert_models():
    logging.info("Loading alert models...")
    scaler = load_model('scaler.pkl')
    model = load_model('model.pkl')
    
    if scaler is None or model is None:
        logging.warning("Models not found or corrupted, creating new models...")
        create_and_save_models()
        scaler = load_model('scaler.pkl')
        model = load_model('model.pkl')
    
    return scaler, model

def predict_alert(features):
    scaler, model = load_alert_models()
    logging.info(f"Original features: {features}")
    
    try:
        scaled_features = scaler.transform(np.array(features).reshape(1, -1))
        logging.info(f"Scaled features: {scaled_features}")
        
        prediction = model.predict_proba(scaled_features)
        logging.info(f"Raw prediction: {prediction}")
        
        predicted_class = np.argmax(prediction)
        return str(predicted_class)
    except Exception as e:
        logging.error(f"Error during alert prediction: {e}")
        return "Error occurred during prediction"

if __name__ == "__main__":
    if len(sys.argv) != 3:
        logging.error("Usage: python prediction_utils.py <predict_alert|predict_significance> '<features>'")
        sys.exit(1)

    prediction_type = sys.argv[1]
    try:
        features = json.loads(sys.argv[2])
        logging.info(f"Received features: {features}")
    except json.JSONDecodeError as e:
        logging.error(f"Invalid JSON input for features: {e}")
        sys.exit(1)

    if not isinstance(features, list) or len(features) != 4 or not all(isinstance(f, (int, float)) for f in features):
        logging.error("Features must be a list of 4 numeric values.")
        sys.exit(1)

    if prediction_type == "predict_alert":
        result = predict_alert(features)
    else:
        logging.error(f"Unknown prediction type: {prediction_type}")
        sys.exit(1)

    logging.info(f"Prediction result: {result}")
    print(result)

