import os
import requests

AWS_SESSION_TOKEN = os.environ['AWS_SESSION_TOKEN']

def get_secret_values(ssm_parameter_path: str):
    response = requests.get(
        f"http://localhost:2773/systemsmanager/parameters/get?name={ssm_parameter_path}",
        headers = {
            "X-Aws-Parameters-Secrets-Token": AWS_SESSION_TOKEN
        }
    )
    if response.status_code != 200:
        print(response.text)
        raise Exception("Failed to get response from Aws-Parameters-Secrets-Token")

    return response.json()


def lambda_handler(event, context):
    config = get_secret_values("")

    print(config)
