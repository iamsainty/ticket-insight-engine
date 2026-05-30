from app.services.clustering.clustering_service import (
    calculate_similarity
)

SIMILARITY_THRESHOLD = 0.75


def assign_cluster(ticket, clusters):

    try:

        ticket_number = ticket.get("number")
        ticket_embedding = ticket.get("embedding")

        if not ticket_number:

            return {
                "success": False,
                "message": "Ticket number is required",
                "data": None
            }

        if not ticket_embedding:

            return {
                "success": False,
                "message": "Ticket embedding is required",
                "data": None
            }

        # First cluster
        if len(clusters) == 0:

            cluster = {
                "cluster_id": "Cluster1",
                "centroid_embedding": ticket_embedding,
                "ticket_ids": [ticket_number]
            }

            clusters.append(cluster)

            return {
                "success": True,
                "message": "First cluster created successfully",
                "data": {
                    "cluster_id": "Cluster1",
                    "similarity": 1.0
                }
            }

        best_similarity = -1
        best_cluster = None

        # Compare with existing clusters
        for cluster in clusters:

            similarity_result = calculate_similarity(
                ticket_embedding,
                cluster["centroid_embedding"]
            )

            if not similarity_result["success"]:
                continue

            similarity = similarity_result["data"]

            if similarity > best_similarity:

                best_similarity = similarity
                best_cluster = cluster

        # Existing cluster assignment
        if (
            best_cluster is not None
            and best_similarity >= SIMILARITY_THRESHOLD
        ):

            best_cluster["ticket_ids"].append(
                ticket_number
            )

            return {
                "success": True,
                "message": "Assigned to existing cluster successfully",
                "data": {
                    "cluster_id": best_cluster["cluster_id"],
                    "similarity": best_similarity
                }
            }

        # Create new cluster
        new_cluster_id = (
            f"Cluster{len(clusters) + 1}"
        )

        new_cluster = {
            "cluster_id": new_cluster_id,
            "centroid_embedding": ticket_embedding,
            "ticket_ids": [ticket_number]
        }

        clusters.append(new_cluster)

        return {
            "success": True,
            "message": "New cluster created successfully",
            "data": {
                "cluster_id": new_cluster_id,
                "similarity": best_similarity
            }
        }

    except Exception as e:

        return {
            "success": False,
            "message": f"Error assigning cluster: {str(e)}",
            "data": None
        }