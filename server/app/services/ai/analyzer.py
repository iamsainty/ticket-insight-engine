from app.services.ai.client import client, deployment_name
from app.services.ai.prompts import SYSTEM_PROMPT

import json


def analyze_ticket(ticket):

    try:

        user_prompt = f"""
Short Description:
{ticket.get("short_description", "")}

Description:
{ticket.get("description", "")}

Additional Comments:
{ticket.get("additional_comments", "")}

Closing Notes:
{ticket.get("closing_notes", "")}
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
            "data": {
                "issue": parsed_response.get("issue", ""),
                "root_cause": parsed_response.get("root_cause", ""),
                "resolution": parsed_response.get("resolution", "")
            },
            "error": None
        }

    except Exception as e:

        return {
            "success": False,
            "data": None,
            "error": str(e)
        }


def analyze_tickets(tickets):

    analyzed_tickets = []

    for ticket in tickets:

        result = analyze_single_ticket(ticket)

        analyzed_tickets.append({
            "ticket_number": ticket.get("Number", ""),
            "analysis": result
        })

    return analyzed_tickets