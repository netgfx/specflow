# SpecFlow - Specification reimagined

## Main Site: https://specflow.7linternational.com/

## Components

- Supabase Connector
	- Connects to a Supabase Project and allows the use of the Supabase API
- Airtable Connector
	- Connects to an Airtable base and allows pulling data from it
- SelectTable Node
	- Allows the selection of a Supabase database for further querying
- Filter Node
	- Allows filtering of the database table data
- Display output node
	- Displays the raw data returned from the previous nodes connected to it (usually filter node)

![mind-mappng](https://user-images.githubusercontent.com/864248/162585141-3692205c-3320-4a93-bcf4-2fe4f5bf8d45.png)


Our vision of this tool is that it can help aleviate some pain points when developing APIs and Specification for a product or a service. For our PoC we picked Supabase to connect to and pull tables and data into our flow components thus giving a graphical overview of the actions associated with fetching those data.
This procedure helps visualize the flow of data and so it is easier to design and develop around.

Supabase was also used for the complete account management of our website and project (flows) storage. Specifically we used the following Supabase capabilities:

- User Auth
- Storage (serving assets)
- Database Functions (to delete user and fetch public table names)
- Database query for records

---

> Special Thanks to @Envans (e.doni@7linternational.com), @gbarmpas7L (g.barmpas@7linternational.com), @EmilyPapadourou (e.papadourou@7linternational.com
) for developing this hackathon entry and PoC 👍
