const AWS_SESSION_TOKEN = process.env.AWS_SESSION_TOKEN;

const getSecretValues = async (ssmParameterPath) => {
  const response = await fetch(
    `http://localhost:2773/systemsmanager/parameters/get?name=${ssmParameterPath}`,
    {
      headers: {
        "X-Aws-Parameters-Secrets-Token": AWS_SESSION_TOKEN,
      },
    }
  );
  if (response.status !== 200) {
    console.warn(await response.text());
    throw new Error("Failed to get response from Aws-Parameters-Secrets-Token");
  }

  return response.json();
};

export const handler = async () => {
  const config = getSecretValues("");

  console.dir(config);
};
