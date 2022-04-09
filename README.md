# SpecFlow - Specification reimagined

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
