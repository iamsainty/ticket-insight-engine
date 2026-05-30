import pandas as pd
import os

REPORT_DIR = "report"

def generate_excel_report(
    original_rows,
    clustered_tickets,
    original_filename
):

    try:

        final_rows = []

        # Create quick lookup
        cluster_lookup = {}

        for ticket in clustered_tickets:

            cluster_lookup[ticket["number"]] = {
                "issue": ticket["issue"],
                "root_cause": ticket["root_cause"],
                "resolution": ticket["resolution"],
                "cluster_id": ticket["cluster_id"]
            }

        # Build final rows
        for row in original_rows:

            ticket_number = row.get("Number", "")

            ai_data = cluster_lookup.get(
                ticket_number,
                {}
            )

            final_row = {
                "Number": row.get("Number", ""),
                "Assigned to": row.get("Assigned to", ""),
                "Assignment group": row.get(
                    "Assignment group",
                    ""
                ),
                "Service": row.get("Service", ""),
                "Sub-service": row.get(
                    "Sub-service",
                    ""
                ),
                "Short description": row.get(
                    "Short description",
                    ""
                ),
                "Description": row.get(
                    "Description",
                    ""
                ),
                "Close notes": row.get(
                    "Close notes",
                    ""
                ),
                "Additional comments (User View)": row.get(
                    "Additional comments (User View)",
                    ""
                ),

                # AI Columns
                "AI Issue": ai_data.get(
                    "issue",
                    ""
                ),
                "AI Root Cause": ai_data.get(
                    "root_cause",
                    ""
                ),
                "AI Resolution": ai_data.get(
                    "resolution",
                    ""
                ),
                "Issue Cluster": ai_data.get(
                    "cluster_id",
                    ""
                )
            }

            final_rows.append(final_row)

        # Create dataframe
        df = pd.DataFrame(final_rows)

        # Output filename
        output_filename = (
            f"enriched_{original_filename}"
        )

        output_path = os.path.join(
            REPORT_DIR,
            output_filename
        )

        # Export excel
        df.to_excel(
            output_path,
            index=False
        )

        return {
            "success": True,
            "message": "Excel report generated successfully",
            "data": {
                "report_path": output_path,
                "report_filename": output_filename
            }
        }

    except Exception as e:

        return {
            "success": False,
            "message": f"Error generating report: {str(e)}",
            "data": None
        }