from app.services.ai.client import client, deployment_name
from app.services.ai.prompt import SYSTEM_PROMPT

import json


def analyze_ticket(ticket):

    try:

        user_prompt = f"""
        Short Description:
        {ticket.get("Short description", "")}

        Description:
        {ticket.get("Description", "")}

        Additional Comments:
        {ticket.get("Additional comments (User View)", "")}

        Closing Notes:
        {ticket.get("Close notes", "")}
        """

        response = client.chat.completions.create(
            model=deployment_name,
            messages=[
                {
                    "role": "system",
                    "content": SYSTEM_PROMPT
                },
                {
                    "role": "user",
                    "content": user_prompt
                }
            ],
            temperature=0,
            response_format={"type": "json_object"}
        )

        content = response.choices[0].message.content

        parsed_response = json.loads(content)

        return {
            "success": True,
            "message": "Ticket analyzed successfully",
            "data": {
                "number": ticket.get("Number", ""),
                "issue": parsed_response.get("issue", ""),
                "root_cause": parsed_response.get("root_cause", ""),
                "resolution": parsed_response.get("resolution", "")
            }
        }

    except Exception as e:

        return {
            "success": False,
            "message": f"Error analyzing ticket: {str(e)}",
            "data": None
        }


def analyze_tickets(tickets):

    try:

        analyzed_tickets = []

        for ticket in tickets:

            result = analyze_ticket(ticket)

            analyzed_tickets.append({
                "ticket_number": ticket.get("Number", ""),
                "analysis": result
            })

        return {
            "success": True,
            "message": "Tickets analyzed successfully",
            "data": analyzed_tickets
        }

    except Exception as e:

        return {
            "success": False,
            "message": f"Error analyzing tickets: {str(e)}",
            "data": None
        }