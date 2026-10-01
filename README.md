# Does multi-agent collaboration improve investment research?

Primer's paid research task for the Applied AI Researcher role.

**Test whether a team of collaborating AI agents produces better investment
research than a single agent. You decide how the agents collaborate, what
better means, and how to measure it.**

Choose a hypothesis about how collaboration could help and compare three setups:

- A capable single-agent baseline.
- A single agent with extra review or compute.
- Your own multi-agent collaborative approach.

This helps distinguish a benefit from collaboration from a benefit that comes
from spending more or using a stronger model.

We're interested in how you approach an open research question. Pick an idea
you're curious about, test it and show us what you found.
A small, well-designed experiment is enough. You do not need to use every
company or build production software.

1. Read [TASK.md](TASK.md).
2. Choose your data. The supplied [company histories](challenge/offline-data/INDEX.md) are an optional starting point.
3. Write your evaluation plan before running the final comparison.
4. Build, test and submit privately using [SUBMISSION.md](SUBMISSION.md).

## What's supplied

1,139 frozen Markdown documents across Home Depot, Analog Devices, Hays plc
and Deere & Company: filings, earnings-call sections and presentation text.
The corpus was frozen on 14 August 2026; it is not current market data or a
guaranteed complete history. Company indexes show the actual coverage.
You do not have to use these documents. Bring your own sources or combine them
with the supplied material, and explain why they suit your experiment.

We supply the research material, not a finished agent or an answer key.
Use any tools or methods you want: models, frameworks, coding agents, retrieval
tools and evaluation approaches. There is no required stack or set of metrics.
Explain your choices and keep the comparison fair and reproducible.

## What you submit

Submit a private repository containing your code, evaluation plan, research
materials, results and write-up. Create a new private repo and copy the starter
files into it; you do not need to include supplied documents you did not use.
Include the data you used where you can share it, or precise source and access
instructions where you cannot. Everything reviewers need to understand and
reproduce the experiment should be documented, except credentials.
See [SUBMISSION.md](SUBMISSION.md) for the details.

## Payment, access and questions

Selected applicants receive $500 USD for the agreed task: $10 upfront and
$490 for a complete, good-faith submission. Payment does not depend on a positive
result or a hiring decision. There is no task time limit.

The $500 covers your time and any model, API or tool costs you choose to incur.
There is no separate expense reimbursement. Use your own tool access; free and
local tools are welcome, and there is no required spend. Primer does not provide
model accounts, API keys or credits, and you do not need our approval to choose
a model or tool.

Your personal invitation confirms payment method and timing before you start.
To submit, give `smallwoodal` access to your private repo and email its link and
final commit hash to [alistair@primerapp.com](mailto:alistair@primerapp.com).
You can also email that address with questions.

This starter repository is public. Keep your submission private so other
candidates cannot see your work. Data sources and notices are described in
[DATA.md](DATA.md) and [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

Brief version: 2026-10-01-v6.
