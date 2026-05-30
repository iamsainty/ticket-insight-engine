from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")


def generate_ticket_embeddings(gpt_result):

    try:

        embedded_tickets = []

        for ticket in gpt_result:

            ticket_data = ticket.get(
                "analysis",
                {}
            ).get(
                "data",
                {}
            )

            number = ticket_data.get("number", "")
            issue = ticket_data.get("issue", "")
            root_cause = ticket_data.get("root_cause", "")
            resolution = ticket_data.get("resolution", "")

            semantic_text = f"""
            Issue: {issue}
            Root Cause: {root_cause}
            """.strip()

            embedding = model.encode(semantic_text)

            embedded_ticket = {
                "number": number,
                "issue": issue,
                "root_cause": root_cause,
                "resolution": resolution,
                "semantic_text": semantic_text,
                "embedding": embedding.tolist()
            }

            embedded_tickets.append(embedded_ticket)

        return {
            "success": True,
            "message": "Ticket embeddings generated successfully",
            "data": embedded_tickets
        }

    except Exception as e:

        return {
            "success": False,
            "message": f"Error generating ticket embeddings: {str(e)}",
            "data": None
        }