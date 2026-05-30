from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")

def create_semantic_text(gpt_result):

    try:

        issue = gpt_result.get("issue", "")
        root_cause = gpt_result.get("root_cause", "")
        resolution = gpt_result.get("resolution", "")

        semantic_text = f"""
        Issue: {issue}
        Root Cause: {root_cause}
        Resolution: {resolution}
        """

        return {
            "success": True,
            "message": "Semantic text created successfully",
            "data": semantic_text.strip()
        }

    except Exception as e:

        return {
            "success": False,
            "message": f"Error creating semantic text: {str(e)}",
            "data": None
        }


def generate_embedding(text):

    try:

        embedding = model.encode(text)

        return {
            "success": True,
            "message": "Embedding generated successfully",
            "data": embedding.tolist()
        }

    except Exception as e:

        return {
            "success": False,
            "message": f"Error generating embedding: {str(e)}",
            "data": None
        }