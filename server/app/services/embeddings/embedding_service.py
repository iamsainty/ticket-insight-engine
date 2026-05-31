import os

from openai import AzureOpenAI
from dotenv import load_dotenv

load_dotenv()

client = AzureOpenAI(
    api_key=os.getenv(
        "AZURE_OPENAI_EMBEDDING_API_KEY"
    ),
    api_version=os.getenv(
        "AZURE_OPENAI_EMBEDDING_API_VERSION"
    ),
    azure_endpoint=os.getenv(
        "AZURE_OPENAI_EMBEDDING_ENDPOINT"
    )
)

deployment_name = os.getenv(
    "AZURE_OPENAI_EMBEDDING_DEPLOYMENT"
)


def generate_ticket_embeddings(gpt_result):

    try:

        embedded_tickets = []

        semantic_texts = []

        for ticket in gpt_result:

            service = ticket.get(
                "service",
                ""
            )

            sub_service = ticket.get(
                "sub_service",
                ""
            )

            issue = ticket.get(
                "issue",
                ""
            )

            root_cause = ticket.get(
                "root_cause",
                ""
            )

            semantic_text = f"""
            Service: {service}
            Sub Service: {sub_service}
            Issue: {issue}
            Root Cause: {root_cause}
            """.strip()

            semantic_texts.append(
                semantic_text
            )

        response = client.embeddings.create(
            input=semantic_texts,
            model=deployment_name
        )

        embeddings = [
            item.embedding
            for item in response.data
        ]

        for index, ticket in enumerate(gpt_result):

            number = ticket.get(
                "number",
                ""
            )

            service = ticket.get(
                "service",
                ""
            )

            sub_service = ticket.get(
                "sub_service",
                ""
            )

            issue = ticket.get(
                "issue",
                ""
            )

            root_cause = ticket.get(
                "root_cause",
                ""
            )

            resolution = ticket.get(
                "resolution",
                ""
            )

            semantic_text = semantic_texts[index]

            embedded_ticket = {
                "number": number,
                "service": service,
                "sub_service": sub_service,
                "issue": issue,
                "root_cause": root_cause,
                "resolution": resolution,
                "semantic_text": semantic_text,
                "embedding": embeddings[index]
            }

            embedded_tickets.append(
                embedded_ticket
            )

        return {
            "success": True,
            "message": (
                "Ticket embeddings generated successfully"
            ),
            "data": embedded_tickets
        }

    except Exception as e:

        return {
            "success": False,
            "message": (
                f"Error generating ticket embeddings: {str(e)}"
            ),
            "data": None
        }