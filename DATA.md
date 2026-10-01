# Data and provenance

These documents are optional. You can use your own sources or combine them with
this pack. This file describes the supplied material; record equivalent source
and version information for any other data you use.

The corpus is copied unchanged from the initial participant snapshot of
[kernlai/agents-vs-wall-street-starter](https://github.com/kernlai/agents-vs-wall-street-starter)
at commit `b28967472354c5b3839e2ae6689fe68320d6bee9`.
Later commits add a completed forecasting pipeline and derived results; those
are deliberately not supplied. This task is about designing your own evaluation.

| Company | Ticker | Documents | Earliest | Latest |
| --- | --- | ---: | --- | --- |
| Home Depot | HD | 319 | 2012-05-15 | 2026-05-21 |
| Analog Devices | ADI | 271 | 2015-01-29 | 2026-06-02 |
| Hays plc | LSE:HAS | 239 | 2015-09-18 | 2026-08-03 |
| Deere & Company | DE | 310 | 2012-05-16 | 2026-05-28 |

There are 507 filings, 538 transcript sections and 94 slide documents. Transcript
sections are not necessarily distinct earnings events. Index files are not
counted as documents. No structured, verified financial time series or answer
key is supplied: figures must be read in context from the original disclosures.
The old starter's `.xlsx` files are blank forecast forms, not historical models,
so they are not included.

`challenge/manifest.json` records every document's path, SHA-256, byte count,
company, date, type, period and source URL where available. The whole pack was
frozen on 2026-08-14. Dates/periods are ingestion metadata; check ambiguous or
inconsistent labels against the document text. Missing source URLs stay null.
Some slides refer to images that are not supplied. Extracted text/descriptions
may be incomplete, and an index claiming coverage is not proof of completeness.

Run `npm run corpus:verify` on the complete, unchanged starter to check file
hashes and inventory. It expects all 1,139 documents; it does not validate a
candidate's chosen subset or new data. If you change the dataset, skip this
starter check and record and check your own sources instead. The optional
search helper accepts an inclusive `--before YYYY-MM-DD` publication-date filter
and never calls a network service. This is not a sandbox: an agent with unrestricted
filesystem access can still read later files. For historical cases, isolate an
allowlisted source subset in your own system. Put later outcomes/reference
material in the evaluator, not in the research agent's context.

A frozen corpus is also not a model-training cutoff. State the limits of any
claim about historical forecasting, generalisation or investment performance.

## Rights

Company documents retain their owners' rights and source terms; they are not
MIT-licensed. They are included in this public starter as research material.
You can choose your own model service or tools without separate approval from
Primer. Use your own accounts and follow
the source and service terms that apply. See
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
