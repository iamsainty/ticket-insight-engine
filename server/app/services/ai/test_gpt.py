from client import client, deployment_name

response = client.chat.completions.create(
    model=deployment_name,
    messages=[
        {
            "role": "user",
            "content": "Say hello"
        }
    ],
    temperature=0
)

print(response.choices[0].message.content)