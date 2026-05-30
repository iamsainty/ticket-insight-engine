from sklearn.metrics.pairwise import cosine_similarity

def calculate_similarity(embedding1, embedding2):

    try:

        similarity = cosine_similarity(
            [embedding1],
            [embedding2]
        )[0][0]

        return {
            "success": True,
            "message": "Similarity calculated successfully",
            "data": float(similarity)
        }

    except Exception as e:

        return {
            "success": False,
            "message": f"Error calculating similarity: {str(e)}",
            "data": None
        }