from app.services.clustering.clustering_engine import (
    assign_cluster
)


def create_ticket_clusters(embedded_tickets):

    try:

        clusters = []

        clustered_tickets = []

        for ticket in embedded_tickets:

            cluster_result = assign_cluster(
                ticket,
                clusters
            )

            if not cluster_result["success"]:

                return cluster_result

            ticket["cluster_id"] = (
                cluster_result["data"]["cluster_id"]
            )

            ticket["similarity_score"] = (
                cluster_result["data"]["similarity"]
            )

            clustered_tickets.append(ticket)

        return {
            "success": True,
            "message": "Ticket clustering completed successfully",
            "data": {
                "tickets": clustered_tickets,
                "clusters": clusters
            }
        }

    except Exception as e:

        return {
            "success": False,
            "message": f"Error creating ticket clusters: {str(e)}",
            "data": None
        }