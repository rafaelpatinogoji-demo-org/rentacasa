---
description: Verify MongoDB access using MCP
auto_execution_mode: 3
---

Objective:
Use the MongoDB MCP Server to check connectivity and permissions against the cluster, the "sample_airbnb" database and the "listingsAndReviews" collection. Do not modify data.

Instructions for Cascade:

Connection

Use the MongoDB MCP Server that is already configured by the user to connect to the cluster.
Verify that the MCP Server responds correctly.


Cluster Verifications

List the accessible databases using MCP.
Confirm that "sample_airbnb" exists and is accessible.
If it doesn't appear, report "DB not found or no permission" with root cause.


Database and Collection Verifications

Within "sample_airbnb", list the collections using MCP.
Confirm that "listingsAndReviews" exists. If not, try to locate by equivalent name "listings and reviews".
Once the collection is confirmed, execute in parallel using MCP tools:

Document count with count.
A sample document with findOne without filters.
Defined indexes with listIndexes.


Use MCP tools in parallel whenever possible to be more efficient.


Required Output Format

First, show an executive summary with emojis in this exact order:

MCP Server MongoDB connected: ✅/❌
Access to database "sample_airbnb": ✅/❌
Access to collection "listingsAndReviews": ✅/❌
findOne reading allowed: ✅/❌
Document count: exact number or N/A
Indexes configured: total number and list of names or N/A


Then provide a "Verification Details" section that includes:

Cluster statistics: number of accessible databases.
Database statistics: size in MB if available.
Brief description of the sample document obtained.
Detailed list of indexes with their names and fields.


Finish with a "Final Status" that summarizes whether everything is operational or what's missing.
In case of failure in any step, return specific root cause and suggested action such as "Invalid URI", "IP not authorized in whitelist", "role without read permission", or "collection doesn't exist".


Critical Rules

DO NOT modify data or configurations under any circumstances.
Operation must be idempotent: if you repeat the step, the state must be exactly the same.
DO NOT expose credentials, connection URIs, or secrets in the output.
Use professional, clear and scannable format with well-defined sections.
If you find errors, stop execution immediately and report the problem with specific context.
