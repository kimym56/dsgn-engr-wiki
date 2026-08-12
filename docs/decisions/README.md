# Decision records

This directory records durable product and technical choices so future contributors can understand both the decision and its reasoning.

## Status values

- **Proposed** — recommended but not yet approved for implementation
- **Accepted** — approved and currently governing the project
- **Superseded** — replaced by a newer decision record
- **Rejected** — considered and intentionally not adopted

## Index

| ID                                                     | Decision                                       | Status   |
| ------------------------------------------------------ | ---------------------------------------------- | -------- |
| [0001](0001-recommended-tech-stack.md)                 | Recommended technology stack                   | Accepted |
| [0002](0002-reference-records-and-external-sources.md) | Reference records and external-source handling | Accepted |
| [0003](0003-source-graph-discovery.md)                 | Source-graph discovery                         | Accepted |

## Adding a decision

1. Copy [`templates/decision-record.md`](../../templates/decision-record.md).
2. Assign the next four-digit identifier.
3. Describe the context and realistic alternatives before stating the decision.
4. Explain consequences and how the decision will be validated.
5. Add the record to this index.

Accepting a decision requires explicit review. A proposed decision should not silently become implementation policy merely because it exists in this directory.
