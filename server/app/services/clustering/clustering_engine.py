from app.services.clustering.clustering_service import (
    calculate_similarity
)

SIMILARITY_THRESHOLD = 0.75


def update_centroid(
    current_centroid,
    new_embedding,
    total_tickets
):

    updated_centroid = []

    for i in range(len(current_centroid)):

        updated_value = (
            (
                current_centroid[i]
                * (total_tickets - 1)
            )
            + new_embedding[i]
        ) / total_tickets

        updated_centroid.append(
            updated_value
        )

    return updated_centroid


def assign_cluster(ticket, clusters):

    try:

        ticket_number = ticket.get("number")
        ticket_embedding = ticket.get("embedding")
        ticket_number = ticket.get("number")
        ticket_embedding = ticket.get("embedding")
        ticket_service = ticket.get("service", "")
        ticket_sub_service = ticket.get("sub_service", "")

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

        # First cluster creation
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

            similarity = similarity_result[
                "data"
            ]

            cluster_service = cluster.get(
                "service",
                ""
            )

            cluster_sub_service = cluster.get(
                "sub_service",
                ""
            )

            # Service match boost
            if (
                ticket_service
                and cluster_service
                and (
                    ticket_service
                    == cluster_service
                )
            ):
                similarity += 0.02

            # Sub-service match boost
            if (
                ticket_sub_service
                and cluster_sub_service
                and (
                    ticket_sub_service
                    == cluster_sub_service
                )
            ):
                similarity += 0.02

            similarity = similarity_result["data"]

            if similarity > best_similarity:

                best_similarity = similarity
                best_cluster = cluster

        # Assign to existing cluster
        if (
            best_cluster is not None
            and best_similarity >= SIMILARITY_THRESHOLD
        ):

            best_cluster["ticket_ids"].append(
                ticket_number
            )

            # Update centroid dynamically
            total_tickets = len(
                best_cluster["ticket_ids"]
            )

            updated_centroid = update_centroid(
                best_cluster["centroid_embedding"],
                ticket_embedding,
                total_tickets
            )

            best_cluster["centroid_embedding"] = (
                updated_centroid
            )

            return {
                "success": True,
                "message": "Assigned to existing cluster successfully",
                "data": {
                    "cluster_id": (
                        best_cluster["cluster_id"]
                    ),
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
            "message": (
                f"Error assigning cluster: {str(e)}"
            ),
            "data": None
        }