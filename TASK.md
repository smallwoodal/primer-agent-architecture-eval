# The task

## What we're trying to learn

We're exploring whether teams of AI agents can produce better equity research
than a single capable agent, and when that collaboration helps.

Choose a hypothesis about how agents could collaborate, build a small experiment
and evaluate the results. You choose the multi-agent architecture: the roles,
how agents share information and how they produce a final answer.

Agents might investigate different parts of a business, challenge each other's
assumptions, or co-author a report. Collaboration can also add overhead or
reinforce mistakes. We want to understand when it helps and when it doesn't.

For example, you could investigate what explains a change in a company's demand,
then test whether independent investigations followed by synthesis produce a
better explanation than one agent working alone. This is just an example;
choose a question and architecture that interest you.

**You decide what better research means, what to measure, and how to measure it.**
We want to understand your decisions and what you find. A careful result showing
that the alternative doesn't help is just as useful.

## 1. Design the evaluation

Choose research questions that involve business interpretation, not just finding
a figure in a document. You can use the supplied company histories, your own
sources, or a combination of both.
Explain the cases you chose and why they are a good test. Decide the number of
companies, questions and repeated runs needed for the claim you want to make.
A small, well-designed experiment is enough. You do not need to use every
company or build production software. Choose a scope you can test properly.

Define research quality in terms an investor could care about. Correctness,
supporting evidence, useful insights and important issues the system misses are
possible things to investigate, alongside cost and time. You decide which
measures suit your research question and how to judge them.

For each measure, explain:

- What it captures and why it matters.
- How you calculate or judge it, including reference evidence where needed.
- How you will check that it measures the intended thing rather than style,
  verbosity or agreement with a particular investment view.
- Its likely failure modes and what you will not conclude from it.

Before the final comparison, write down the questions you'll test, the sources
available to each system, your budget and how you'll judge the results. Commit
that plan so we can follow how your thinking develops. You can change it later;
keep the earlier version and explain any changes made after seeing results.
Explain how you avoid tuning your systems or measures to the answers in your
final comparison. You choose a method that fits the size of your experiment.

## 2. Build a fair comparison

Compare these three setups on the same research questions:

1. **A capable single agent.** Give it the tools and instructions it needs to do
   the research well.
2. **A single agent with extra review or compute.** Give the same agent more
   opportunity to investigate and check its work, with a budget comparable to
   your collaborative system. This tests whether extra effort alone explains
   any improvement.
3. **Your multi-agent approach.** Build the collaboration described in your
   hypothesis. Explain what the agents do together and why you expect it to help.

Keep model capability, tools and source access comparable across the setups.
If you use different models or access, explain how you separate their effects
from collaboration, and any limits that leaves on your conclusion.

Record what each setup actually uses: cost, tokens, tool calls and elapsed time
where available. Explain missing measurements. Setting the same budget doesn't
necessarily mean the systems spend the same amount.

Show how your systems work: what each agent does, what information it sees and
when it stops. Keep the original outputs and failed runs. Explain any human input
and apply it consistently; don't hand-edit the answers you're comparing.

## 3. Run it and test the evaluator too

Run the comparison and show the individual results alongside any averages.
Check whether your conclusion depends on luck, a particular question or the
way you're scoring answers. If you use an LLM to judge the work, check whether
you can trust its judgments. Pick some outputs from each architecture and check
their important claims and calculations against the sources. Tell us how you
chose those outputs and what you found.

You choose the other checks. Repeating runs, holding back questions during
development, hiding architecture names from a judge or changing answer order
are possible approaches. These are suggestions, not a checklist to complete.
Use the checks that help you understand your results and explain their limits.

Explain what evidence supports your conclusion and what else might explain it.
If the alternative wins, is the improvement due to the architecture, more
resources, better prompts or an evaluator preference? If it loses, what failed?

Based on your evidence, which architecture would you use for this research
problem, and what would make you change your mind? If the evidence is not strong
enough to choose, explain what you would test next.

## Materials and boundaries

The supplied documents are an optional starting point. Use whichever data best
fits your research question, and explain why you chose it. Record your sources,
versions and any information cutoffs so we can understand and rerun the experiment.
Give the architectures comparable access to evidence unless that difference is
what you are testing.

Think about the limitations of LLMs when designing your evaluation. With
historical information, a model may have encountered the companies, documents
or later outcomes in its training data. How could that affect your results?
Explain how your design addresses this, what uncertainty remains, and what you
can reasonably conclude. Choosing how to investigate this is part of the task.

Use any tools or methods you want, including any models, frameworks, coding
agents, retrieval tools or evaluation approaches. Explain what you used and why;
the comparison should still be fair and reproducible. There is no task time
limit and no reward for excessive spend or elaborate infrastructure. Choose
tools and an experiment size that fit your budget; free and local tools are welcome.

## Deliverables

Submit a private repository containing the research materials you used,
your plan, runnable code, prompts, the questions and sources for each test,
original outputs and run logs, a short results table covering all three setups,
usage records and a short write-up.
Include access instructions for any data you cannot share.
[SUBMISSION.md](SUBMISSION.md) explains how to organise and send it.

## What we'll look for

| Area | Weight | What we're looking for |
| --- | --- | --- |
| Research design | 25% | A worthwhile question and a fair comparison that tests your idea. |
| Evaluation quality | 25% | Measures that capture useful research, checks that they work, and conclusions supported by the evidence. |
| Technical execution | 20% | Working systems, clear run records and an experiment we can reproduce. |
| Financial judgment | 20% | Correct interpretation of sources and calculations, with reasoning useful to an investor. |
| Initiative and communication | 10% | Thoughtful decisions, how you handle problems, and a clear account of what you learned. |

We assess the quality of your work and reasoning. A careful negative or
inconclusive result can score highly. Spending more, using more agents or
producing a longer report doesn't earn extra credit. A human reviewer makes
the hiring assessment; your experiment's own score isn't a hiring score.

## Completion and payment

The task pays $500 USD: $10 before you start and $490 after a complete,
good-faith submission meeting this agreed brief. Completion means the materials
above are present and we can inspect your experiment and conclusions. If
something is missing, we will identify it and give you an opportunity to fix it.
We will not introduce a new case count or pass score after you start.

The $500 is the total payment, covering your time and any model, API or tool
costs you choose to incur. There is no separate expense reimbursement. You
arrange your own tool access; we do not require a paid service or minimum spend.

Payment is separate from the hiring assessment and whether your architecture
outperforms the baseline. Technical failures count as findings when documented,
with enough records to understand what happened. Personal invitations confirm
payment method and timing.
