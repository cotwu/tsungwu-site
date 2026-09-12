---
title: "Estimating cardiac output from pulse pressure: a 120-year genealogy"
description: From Erlanger and Hooker in 1904 to the tissue-perfusion-pressure method of 2023, every attempt to read cardiac output from the arterial pulse has run into the same constant, arterial compliance. How each generation handled it, and why the newest method rests on the oldest assumption.
track: Perioperative hemodynamics
---

# Estimating cardiac output from pulse pressure: a 120-year genealogy

<p class="lede">Pulse pressure times heart rate is proportional to cardiac output, with a constant of proportionality that is the compliance of the arteries. That sentence was written, in one form or another, in 1904, in 1928, in 1993, and again in 2023. What changed each time was not the relation but how the constant was handled.</p>

## Mechanism

**Where the relation comes from.** In 1899 Otto Frank described the arterial tree as a *Windkessel*: an elastic chamber that stores part of each stroke volume in systole and releases it in diastole. In that model the pressure rise produced by a stroke is the volume divided by the chamber's compliance, PP ≈ SV / C, so pulse pressure reads stroke volume through the compliance of the vessel wall ([Frank 1899; English translation by Sagawa et al., *J Mol Cell Cardiol* 1990](https://doi.org/10.1016/0022-2828(90)91459-K)). Multiply by heart rate and the same constant carries over: PP × HR ≈ CO / C.

**The constant is not a constant.** Arterial compliance falls as pressure rises (the wall stiffens as it is stretched), falls with age, and changes acutely with vascular tone. Any method that reads flow from pulse pressure must therefore either measure C, model it, correct for it, or assume it fixed for the duration of the measurement. The history below is the history of those four choices.

## Evidence

**1904: assume it.** Erlanger and Hooker, studying blood pressure and pulse pressure in humans, proposed that pulse pressure indexes stroke volume and that pulse pressure × heart rate indexes cardiac output (Erlanger J, Hooker DR. An experimental study of blood-pressure and of pulse-pressure in man. *Johns Hopkins Hosp Rep* 1904;12:145–378). The proportionality constant was left implicit.

**1928: correct for it.** Liljestrand and Zander compared pulse-pressure estimates with Fick-based measurements and proposed dividing pulse pressure by the sum of systolic and diastolic pressure, an empirical correction for the fall in compliance with pressure: before multiplying by heart rate ([Liljestrand & Zander, *Z Ges Exp Med* 1928](https://doi.org/10.1007/BF02608853)). In the same paper they named the principal limitation of the whole approach: arterial distensibility, citing Recklinghausen's relation that amplitude × frequency = minute output ÷ distensibility.

**1993: model it.** Wesseling and colleagues computed aortic flow from the pressure waveform with a nonlinear three-element Windkessel whose aortic compliance is a function of pressure, age, and sex, the Modelflow method, and the ancestor of today's pulse-contour monitors ([Wesseling et al., *J Appl Physiol* 1993](https://doi.org/10.1152/jappl.1993.74.5.2566)). The commercial devices that followed split into two branches: those that calibrate the compliance term against an independent measurement of cardiac output, and those that estimate it from patient characteristics alone. Their relative accuracy is a literature of its own and is not reviewed here.

**2009: test them all.** Sun and colleagues built a public test set from the MIMIC-II database, 120 ICU patients with radial arterial waveforms and contemporaneous thermodilution, and ran eight pulse-pressure and pulse-contour algorithms against it. All eight tracked the *direction* of change better than mean arterial pressure. But only one was a significantly better *quantitative* estimator than MAP: the 1928 formula of Liljestrand and Zander ([Sun et al., *Crit Care Med* 2009](https://doi.org/10.1097/CCM.0b013e3181930174)). An eighty-one-year-old hand correction for compliance outperformed everything that came after it.

**2012: derive it again.** Starting from conservation of mass during systole, Papaioannou and colleagues derived a "systolic volume balance" estimator whose simplified form is CO = k × C × PP / T. The compliance C is still there in the formula ([Papaioannou et al., *Am J Physiol Heart Circ Physiol* 2012](https://doi.org/10.1152/ajpheart.00052.2012)).

**2015: take it outside the ICU.** Applied to beat-to-beat pressure in 67 healthy young adults, the Liljestrand–Zander formula correlated only moderately with Modelflow-derived cardiac output (r = 0.42 overall), better in men than in women ([Koenig et al., *Biomed Sci Instrum* 2015](https://pubmed.ncbi.nlm.nih.gov/25996703/)). Outside the setting it was calibrated for, the correction is not enough.

**2020: watch it move.** The ratio of pulse pressure to stroke volume is, by definition, the effective arterial elastance Ea, the reciprocal of the compliance term above. In pigs instrumented with conductance catheters, Monge García and colleagues showed that this ratio, and its dynamic counterpart Eadyn, shift with phenylephrine and nitroprusside, with bleeding and volume, and with esmolol and dobutamine ([Monge García et al., *Front Physiol* 2020](https://doi.org/10.3389/fphys.2020.00284)). The constant moves with exactly the interventions used in the operating room.

**2023: need only proportionality.** Chandrasekhar and colleagues did not use pulse pressure × heart rate to estimate cardiac output. They used it as a *surrogate* for pulsatile flow in order to extrapolate the critical closing pressure: any quantity that is proportional to flow, and goes to zero when flow does, yields the same zero-flow intercept, because the proportionality constant is absorbed into the slope ([Chandrasekhar et al., *Nat Med* 2023](https://doi.org/10.1038/s41591-023-02474-6)). The method therefore does not need to know C: but it needs C to be constant within the sampling window, so that the slope is a single number. That is the assumption of 1904, restated for a one-minute window, and the limitation Liljestrand and Zander wrote down in 1928. The argument is discussed further in the [Pcc entry](/en/concepts/critical-closing-pressure/).

## Open questions

Whether arterial compliance is stable enough within a one-minute window during anesthesia and surgery, with induction, vasopressors, blood loss and positive-pressure ventilation acting on it, has not been measured in the settings where the 2023 method is now applied.

The 1928 correction, dividing by systolic plus diastolic pressure, was fitted to a small number of subjects and has never been re-derived from a physiological model; why it outperforms later algorithms in ICU data is not explained.

No study has compared pulse-pressure-based flow surrogates against directly measured flow during the same manoeuvres used to estimate critical closing pressure.
