# Private submission

Your submission is a private repository containing your code, evaluation plan,
results, write-up and the research materials you used. Create a new private repo
and copy the starter files into it. The supplied documents are optional and unused
ones can be left out. If you use a subset, record the original paths and hashes
from `challenge/manifest.json` so we can identify the exact documents.
The starter's `corpus:verify` command only checks the full original pack; you
do not need to pass it after choosing a subset or using other data.
The starter is public; keep your work in your private submission repository.
When ready, give the GitHub account `smallwoodal` access to your private repo.
Email the repository link and final commit hash to alistair@primerapp.com so we
know which version to review.

Suggested layout (equivalent layouts are fine):

```text
README.md                 Setup and exact commands to reproduce
data/ or challenge/       Research materials used and a record of their sources
evaluation-plan.json      Hypothesis, cases, measures and protocol
src/                      Your systems and evaluator
config/                   Models, prompts, budgets and architecture definitions
cases/                    Research questions and per-case eligible source lists
results/                  One row per run plus raw outputs, traces and failures
audits/                   Source-based checks and evaluator disagreements
REPORT.md                 Conclusions, limitations and next experiment
```

Use any tools or methods you want. Document what you used so we can understand
your choices and reproduce the experiment.

Include the model and software versions, prompts, the commit containing your
plan, a record of the data used, and random seeds where applicable. List the
environment variables needed to run the code, without including credentials.

For your own data, record source locations, versions or retrieval dates, and
any preparation steps. Include it where you have permission to share it;
otherwise give exact access instructions and identify any access costs or
restrictions. Explain how to reproduce your selected subset of documents.

For every run record at least its case, architecture, repetition, output/trace
location, outcome or failure, quality measurements and resource use. Choose
your own measurements and machine-readable format; preserve the raw evidence
behind aggregate scores. Report missing cost/usage values as missing, not zero.

Your report should make the experiment understandable without reading every
trace: why this comparison, why these measures, what happened, how much it cost,
where it failed and how strong the conclusion is. Keep it as short as that allows.
Include a short results table comparing the single-agent baseline, the single
agent with extra review or compute, and your multi-agent approach.
Finish with the architecture you would choose for this problem and what evidence
would change your mind, or the next test needed if the result is inconclusive.

Commit the results and supporting records, not just the code. Check your
ignore rules so required files are actually included in the submission.

Before sharing, test the reproduction commands from a clean checkout, check for
secrets and identify external services/costs. Reviewers will run submitted code
in isolation, without staff credentials. Do not include code that uploads the
data or results to external services without documenting it, or uploads credentials.

You retain your pre-existing tools. This repository does not itself transfer
ownership of your submission; your invitation confirms assessment-use and
confidentiality terms. Keep your submission private during the hiring process.
