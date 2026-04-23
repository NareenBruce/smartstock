from anthropic import Anthropic
import os
from dotenv import load_dotenv

load_dotenv()

client = Anthropic(
    api_key= os.getenv("ILMU_API_KEY"),
    base_url="https://api.ilmu.ai/anthropic",
)

message = client.messages.create(
    model="ilmu-glm-5.1",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "Hello"}
    ],
)

print(message.content[0].text)