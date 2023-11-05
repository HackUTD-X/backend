import lightgbm as lgb
import pandas as pd
import sklearn
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
from sklearn.preprocessing import StandardScaler
import numpy as np

import sys
# Load your dataset into a DataFrame
# For example, if you have a CSV file, you can use pd.read_csv('your_dataset.csv')
df = pd.read_csv("restaurant_dataset.csv")
# Split the data into features and labels
X = df.drop('Risk_Prediction', axis=1)  # Features
y = df['Risk_Prediction']  # Continuous labels
scaler = StandardScaler()
# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

X_train = X_train.to_numpy()  # Convert to numpy array
X_train_scaled = scaler.fit_transform(X_train)

# Transform the test data
X_test = X_test.to_numpy()  # Convert to numpy array
X_test_scaled = scaler.transform(X_test)

# Create a LightGBM dataset for training
train_data = lgb.Dataset(X_train_scaled, label=y_train)

# Set LightGBM parameters
params = {
    'objective': 'regression',
    'metric': 'mse',  # Mean Squared Error
    'boosting_type': 'gbdt',
    'num_leaves': 31,
    'learning_rate': 0.05,
    'feature_fraction': 0.9,
    'verbose': -1
}

# Train the LightGBM model
model = lgb.train(params, train_data, num_boost_round=100)

# Make predictions on the test set
y_pred = model.predict(X_test_scaled)

# Calculate the Mean Squared Error (MSE) as an example metric
mse = mean_squared_error(y_test, y_pred)
print(f'Mean Squared Error: {mse}')

# Get feature importances (weights)
feature_importances = model.feature_importance(importance_type='split')

# Assign feature importances to feature names
feature_names = X.columns
feature_importance_dict = dict(zip(feature_names, feature_importances))

# Print feature importances
print("Feature Importances:")
for feature, importance in feature_importance_dict.items():
    print(f"{feature}: {importance}")

data_row = np.array([sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5]])  # Make sure it matches the model's feature set

# Make the prediction
prediction = model.predict(data_row.reshape(1, -1))

# The 'prediction' variable now contains the predicted value or probabilities, depending on your model's task (e.g., regression or classification).
print("Prediction:", prediction[0])

#--------------------------------------------------------------------------------------------------------------------------------------------------#

df_ins = pd.read_csv("realistic_insurance_dataset.csv")
# Split the data into features and labels
X = df_ins.drop('Insurance_Premium', axis=1)  # Features
y = df_ins['Insurance_Premium']  # Continuous labels
scaler = StandardScaler()
# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

X_train = X_train.to_numpy()  # Convert to numpy array
X_train_scaled = scaler.fit_transform(X_train)

# Transform the test data
X_test = X_test.to_numpy()  # Convert to numpy array
X_test_scaled = scaler.transform(X_test)

# Create a LightGBM dataset for training
train_data = lgb.Dataset(X_train_scaled, label=y_train)

# Set LightGBM parameters
params = {
    'objective': 'regression',
    'metric': 'mse',  
    'boosting_type': 'gbdt',
    'num_leaves': 51,
    'learning_rate': 0.05,
    'feature_fraction': 0.9,
    'verbose': -1
}

# Train the LightGBM model
nmodel = lgb.train(params, train_data, num_boost_round=1000)

# Make predictions on the test set
y_pred = nmodel.predict(X_test_scaled)

# Calculate the Mean Squared Error (MSE) as an example metric
mse = mean_squared_error(y_test, y_pred)
print(f'Mean Squared Error: {mse}')

# Get feature importances (weights)
feature_importances = nmodel.feature_importance(importance_type='split')

# Assign feature importances to feature names
feature_names = X.columns
feature_importance_dict = dict(zip(feature_names, feature_importances))

# Print feature importances
print("Feature Importances:")
for feature, importance in feature_importance_dict.items():
    print(f"{feature}: {importance}")

data_row = np.array([prediction[0], sys.argv[6], sys.argv[7], sys.argv[8]])  # Make sure it matches the model's feature set

# Make the prediction
prediction = nmodel.predict(data_row.reshape(1, -1))

# The 'prediction' variable now contains the predicted value or probabilities, depending on your model's task (e.g., regression or classification).
print("Prediction:", prediction[0])
