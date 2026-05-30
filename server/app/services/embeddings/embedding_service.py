from sentence_transformers import SentenceTransformer

model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)


def generate_ticket_embeddings(gpt_result):

    try:

        embedded_tickets = []

        for ticket in gpt_result:

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

            semantic_text = f"""
            Service: {service}
            Sub Service: {sub_service}
            Issue: {issue}
            Root Cause: {root_cause}
            """.strip()

            embedding = model.encode(
                semantic_text
            )

            embedded_ticket = {
                "number": number,
                "service": service,
                "sub_service": sub_service,
                "issue": issue,
                "root_cause": root_cause,
                "resolution": resolution,
                "semantic_text": semantic_text,
                "embedding": embedding.tolist()
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