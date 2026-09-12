---
title: "The Hypotension Prediction Index, 2018–2026"
description: A machine-learning index that predicts intraoperative hypotension minutes ahead: its 2018 validation, the trials that followed, the critique that its performance is largely that of mean arterial pressure itself, and the 2025–2026 trials that tested it against outcomes and against a simple MAP trigger.
about: Q275419 Q615057
track: Perioperative hemodynamics
---

# The Hypotension Prediction Index, 2018–2026

<p class="lede">An algorithm that reads the arterial waveform and warns, minutes ahead, that blood pressure is about to fall. Eight years after its introduction, the question has shifted from whether it predicts hypotension to whether it predicts anything that mean arterial pressure alone does not, and whether acting on the warning changes what happens to patients.</p>

*Disclosure: the author of this site is first author of one of the trials discussed below (Wu et al. 2026).*

## Mechanism

**What the index is.** The Hypotension Prediction Index (HPI) is a proprietary machine-learning model trained on features of the high-fidelity arterial pressure waveform. It outputs a number from 0 to 100, updated every 20 seconds, intended as the probability that mean arterial pressure (MAP) will fall below 65 mmHg for at least one minute within the next 15 minutes. In the original description, 3,022 features per cardiac cycle were extracted and the model trained on 1,334 patient records ([Hatib et al., *Anesthesiology* 2018](https://doi.org/10.1097/ALN.0000000000002300)). The default alarm threshold is an index above 85.

**What it is meant to change.** Hypotension is ordinarily treated after it appears. A warning that arrives minutes earlier is meant to let the anesthesiologist treat before the threshold is crossed, converting a reactive practice into a proactive one. Whether the warning carries information beyond the current MAP, and whether earlier treatment improves anything beyond the exposure metric, are the two questions the literature since 2018 has been sorting out.

## Evidence

### 2018–2021: the promise

**Validation.** In the 2018 paper, using a case–control (backward) analysis, the index predicted a hypotensive event 15 minutes ahead with sensitivity 88% and specificity 87% (area under the curve 0.95); at 5 minutes, sensitivity and specificity were both around 90% ([Hatib et al. 2018](https://doi.org/10.1097/ALN.0000000000002300)).

Expressed as likelihood ratios, which do not depend on prevalence, and using the developers' own 2024 re-validation with a forward (cohort) analysis of invasive waveform data, at the optimal cutoff ([Davies et al., *Anesthesiology* 2024](https://doi.org/10.1097/ALN.0000000000004989)):

| Predicting hypotension 15 min ahead | Sensitivity | Specificity | Positive LR | Negative LR |
|---|---|---|---|---|
| HPI (forward analysis) | 0.87 | 0.84 | **5.4** | **0.15** |
| MAP alone (forward analysis) | 0.88 | 0.84 | **5.5** | **0.14** |
| *For comparison:* high-sensitivity troponin T, single measurement at presentation, for acute myocardial infarction ([Al-Saleh et al., *CMAJ Open* 2014](https://doi.org/10.9778/cmajo.20130074); meta-analysis, 9 studies, 9,186 patients) | 0.94 | 0.73 | **3.5** | **0.08** |

On these figures the index's discrimination for hypotension is of the same order as a single high-sensitivity troponin for myocardial infarction: a stronger positive ratio, a weaker negative one. The same table also shows that MAP alone, analyzed the same way, has the same likelihood ratios. Whether the discrimination is the index's own is the subject of the second act.

**The first randomized trial was positive.** In 68 patients undergoing elective noncardiac surgery, the index with a treatment protocol reduced time-weighted average (TWA) hypotension below 65 mmHg from 0.44 to 0.10 mmHg ([Wijnberge et al., HYPE trial, *JAMA* 2020](https://doi.org/10.1001/jama.2020.0592)).

**The second was not.** In 214 patients, TWA hypotension was 0.14 mmHg with guidance and 0.14 mmHg without. About half the alerts were not followed by treatment ([Maheshwari et al., *Anesthesiology* 2020](https://doi.org/10.1097/ALN.0000000000003557)). Two smaller trials with protocolized management reported reductions in hypotension ([Schneck et al., *J Clin Monit Comput* 2020](https://doi.org/10.1007/s10877-019-00433-6); [Tsoumpa et al., *J Clin Med* 2021](https://doi.org/10.3390/jcm10245884)).

### 2022–2025: the critique

**Selection bias in the original validation.** The 2018 data selection meant that any MAP below 75 mmHg was, by construction, followed by hypotension. Enevoldsen and Vistisen argued that this inflated the apparent predictive value of the current MAP: and, since MAP is an input to the index, of the index itself ([Enevoldsen & Vistisen, *Anesthesiology* 2022](https://doi.org/10.1097/ALN.0000000000004320)).

**Re-validation by the developers' group.** Davies and colleagues reanalyzed 2,022 patients (4.15 million measurements) with a forward, cohort-style method. The index's area under the curve fell from 0.957 to 0.923 at 5 minutes and was essentially unchanged at 10 and 15 minutes, still high. In the same analysis, MAP alone predicted hypotension with an area under the curve of 0.93 at every horizon, no other variable exceeded 0.7, and 77% of the variance in the index was explained by MAP ([Davies et al., *Anesthesiology* 2024](https://doi.org/10.1097/ALN.0000000000004989)). Both findings sit in the same paper: the index performs well, and so does MAP.

**MAP agrees with the index most of the time.** In 100 patients, a MAP threshold of 73 mmHg coincided with the default index alarm 97% of the time; for hypotension within 5 minutes, the area under the curve was 0.89 for the index and 0.88 for concurrent MAP ([Mulder et al., *Anesthesiology* 2024](https://doi.org/10.1097/ALN.0000000000004990); see also [Mulder et al., *Anesthesiology* 2023](https://doi.org/10.1097/ALN.0000000000004541)). A separate analysis reached the same conclusion from the other direction: MAP is the major determinant of the index ([Jacquet-Lagrèze et al., *Eur J Anaesthesiol* 2025](https://doi.org/10.1097/EJA.0000000000001991)). The position that the index is not a validated predictor was set out in a formal debate ([Vistisen, *Eur J Anaesthesiol* 2024](https://doi.org/10.1097/EJA.0000000000001939)), with a further observation that adherence to index-based protocols leads to more aggressive treatment ([Vistisen, *Crit Care Med* 2025](https://doi.org/10.1097/CCM.0000000000006633)).

If the index alarm and a MAP of about 72–73 mmHg fire at nearly the same moments, then an index-guided trial is, in effect, a trial of treating at a higher MAP threshold.

### 2025–2026: outcomes, and the direct comparison

**No outcome benefit.** In a 28-hospital trial of 917 patients undergoing moderate- to high-risk abdominal surgery, index-guided management (alarm above 80) versus real-world standard care did not reduce moderate-to-severe acute kidney injury (6.1% vs 7.0%; risk ratio 0.89, 95% CI 0.54–1.49), overall complications, renal replacement therapy, or 30-day mortality ([Ripollés-Melchor et al., *Anesthesiology* 2025](https://doi.org/10.1097/ALN.0000000000005355)).

**Index versus a higher MAP target, same protocol.** In 100 adults undergoing major noncardiac surgery at two centers, patients were randomized to treatment triggered by an index of 85 or more, or by a MAP of 73 mmHg or less, both followed by the same predefined hemodynamic protocol. TWA hypotension was 0.07 mmHg with the index and 0.16 mmHg with the MAP trigger (P = 0.119); area under the threshold 22 versus 59.7 mmHg·min (P = 0.172); hypertension burden, norepinephrine dose, length of stay, and 30-day mortality did not differ. Index-guided management was not superior to the proactive MAP target. The trial was designed for superiority, so the result indicates no demonstrated superiority rather than equivalence ([Wu et al., *Anesthesiology* 2026](https://doi.org/10.1097/ALN.0000000000006335)).

**MAP alarm versus index, non-inferiority.** In a single-center blinded trial of 143 patients, a MAP alarm at 72 mmHg was compared with the index alarm at 85. Area under the 65 mmHg threshold was 3.75 versus 4.00 mmHg·min; the log-transformed difference was 0.03 (95% CI −0.24 to 0.29), within the non-inferiority margin. Secondary hemodynamic, alarm, outcome, and medication measures did not differ ([Florax et al., *Anesthesiology* 2026](https://doi.org/10.1097/ALN.0000000000006338)).

The two 2026 trials ask complementary questions (is the index better than a higher MAP trigger? is a MAP alarm as good as the index?) and arrive at compatible answers.

## Open questions

The model is proprietary, and its features cannot be independently examined; what it adds beyond MAP has to be inferred from external comparisons rather than inspected directly.

Whether treating at a higher MAP threshold improves patient outcomes, rather than the exposure metric, remains untested; the one large outcome trial found no difference, and neither 2026 trial was powered for clinical endpoints.

In the trial with a null result, half of the alerts were not acted on. How much of any effect depends on the warning being used, and how much on the warning existing, has not been separated.

Which MAP threshold should serve as a proactive trigger (72, 73, or another value) has been chosen empirically from agreement with the index rather than from outcome data.
