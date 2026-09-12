---
title: Critical closing pressure (Pcc)
description: What critical closing pressure is, why it makes systemic vascular resistance an ill-defined quantity, how bedside estimates of Pcc are derived from pulse pressure × heart rate, and what five recent cohorts do and do not establish.
track: Perioperative hemodynamics
updated: 2026-09-12
---

# Critical closing pressure (Pcc)

<p class="lede">Blood flow does not stop when arterial pressure reaches venous pressure. It stops earlier — at a pressure set by vessel tone and surrounding tissue. That pressure is the critical closing pressure, and it changes what "resistance" and "perfusion pressure" mean.</p>

## Mechanism

**Historical line.** In 1914, Patterson and Starling placed the descending aorta of an isolated heart preparation inside a pressurised chamber and observed that diastolic pressure could not fall below chamber pressure ([Patterson & Starling, *J Physiol* 1914](https://doi.org/10.1113/jphysiol.1914.sp001669)). Burton formalised the idea in 1951: a small vessel with active wall tension has a pressure below which it closes, the *critical closing pressure* ([Burton, *Am J Physiol* 1951](https://doi.org/10.1152/ajplegacy.1951.164.2.319)).

**What happens at the vessel.** When the pressure surrounding a vessel — from wall tone or interstitial pressure — exceeds the pressure inside it, the vessel collapses and flow pauses. Intraluminal pressure then rebuilds toward the upstream value, the vessel reopens, flow resumes, and the cycle repeats. This *stuttering* behaviour is the direct signature of Pcc acting as the effective back-pressure of the circulation. A 2026 narrative review connects the physiological model to its mechanical basis and is open access ([Castro et al., *J Crit Care* 2026](https://doi.org/10.1016/j.jcrc.2026.155485)).

**The vascular waterfall.** Permutt and Riley showed in 1963 that a collapsible vessel with tone behaves like a waterfall: flow depends on the pressure drop from upstream to the closing point, and downstream pressure is irrelevant as long as it stays below that point ([Permutt & Riley, *J Appl Physiol* 1963](https://doi.org/10.1152/jappl.1963.18.5.924)). Pcc is the height of that waterfall on the arterial side; on the venous side the corresponding quantity is the [mean systemic filling pressure (Pmsf)](/en/concepts/mean-systemic-filling-pressure/), and the gap Pcc − Pmsf is the pressure lost across the waterfall itself.

**Two consequences that matter at the bedside.**

1. *Systemic vascular resistance loses its meaning.* If a waterfall exists, the relevant pressure drop is MAP − Pcc, not MAP − CVP. The familiar quantity (MAP − CVP) / CO is then not a resistance at all. Chandrasekhar and colleagues state this explicitly in the paper that introduced bedside Pcc estimation ([Chandrasekhar et al., *Nat Med* 2023](https://doi.org/10.1038/s41591-023-02474-6)).
2. *Perfusion pressure should be measured against Pcc.* The difference MAP − Pcc has been named *tissue perfusion pressure* (TPP). Two patients with the same MAP can have very different TPP.

**Where Pcc sits in disease.** With low cardiac output, vascular tone rises and Pcc rises. In vasoplegia, Pcc falls toward mean systemic filling pressure (Pmsf) and the waterfall disappears. The review by Castro et al. summarises evidence that a vasopressor improves perfusion when it lifts Pcc away from Pmsf, and not merely when it raises MAP.

## Evidence

**How Pcc is estimated without stopping the heart.** Pcc is the pressure intercept of the flow–pressure relationship extrapolated to zero flow. Producing enough variation in cardiac output to draw that line is not feasible in routine care. Chandrasekhar et al. (2023) proposed pulse pressure × heart rate (PP × HR) as a surrogate for pulsatile flow, arguing that any surrogate that is *proportional* to flow and goes to zero when flow goes to zero must give the same intercept: the proportionality constant is absorbed into the slope. The argument is therefore about the intercept, not about the accuracy of PP × HR as a cardiac-output estimate — and it requires that the constant of proportionality, which is arterial compliance, stays constant within the sampling window. Liljestrand and Zander identified arterial distensibility as the principal limitation of the pulse-pressure product in 1928, citing Recklinghausen's relation that amplitude × frequency = minute output ÷ arterial distensibility ([Liljestrand & Zander, *Z Ges Exp Med* 1928](https://doi.org/10.1007/BF02608853)).

**Five cohorts, 2023–2026.** Four used PP × HR as the flow surrogate; one used measured thermodilution cardiac output.

| | Chandrasekhar 2023 | Ayers 2025 | Miles 2026 | Wang J-Y 2026 | Wang C-C 2026 |
|---|---|---|---|---|---|
| Setting | Cardiac ICU | Cardiopulmonary bypass | Post-cardiac surgery | Sepsis | Heart transplantation |
| n | 5,988 + 864 (MIMIC-III) | 1,038 | 1,224 | 6,769 + 17,168 (MIMIC-IV) | 269 |
| Flow surrogate | PP × HR | PP × HR | PP × HR | PP × HR | Thermodilution CO |
| Sampling | Beat-to-beat, 120 Hz | Beat-to-beat | 5-min means | Hourly means | Hourly |
| Window | 1 min | Induction → bypass | 5 min | 3 h | 72 h |
| Main finding | TPP < 34 and MAP < 74 mmHg predict outcome; in external validation only TPP remained significant | Higher pre-bypass Pcc associated with acute kidney injury | TPP < 38 mmHg associated with acute kidney injury | Low Pcc and low TPP associated with mortality, U-shaped relationship | TPP reclassified renal-replacement risk better than MAP |
| Reference | [Nat Med](https://doi.org/10.1038/s41591-023-02474-6) | [JCVA](https://doi.org/10.1053/j.jvca.2024.11.010) | [JTCVS](https://doi.org/10.1016/j.jtcvs.2025.07.009) | [Anesthesiology](https://doi.org/10.1097/ALN.0000000000005881) | [JHLT](https://doi.org/10.1016/j.healun.2026.07.025) |

**Three observations that follow from placing the cohorts side by side.**

1. *The estimates converge.* Sampling resolution differs by more than three orders of magnitude — beat-to-beat at 120 Hz versus hourly means — yet median Pcc falls in the range of roughly 36–45 mmHg in every cohort.
2. *Two cohorts point in opposite directions, and the waterfall model predicts both.* After cardiopulmonary bypass, higher Pcc was associated with kidney injury (Ayers 2025). In sepsis, higher Pcc was associated with survival, with a U-shaped curve (Wang J-Y 2026). Read through the waterfall framework, these are two ends of the same curve: in sepsis a low Pcc marks vasoplegia and a collapsed waterfall; in cardiac surgery a high Pcc marks excessive tone. Wang J-Y and colleagues report the U-shape directly.
3. *Only one cohort measured the venous side.* Wang J-Y et al. also estimated Pmsf (the intercept of CVP against PP × HR) and could therefore compute the waterfall gradient Pcc − Pmsf. The other cohorts characterise the arterial side only.

## Open questions

Estimates of Pcc in the intact circulation cluster around 40 mmHg across cohorts differing by three orders of magnitude in sampling resolution. Whether these estimates correspond to the pressure at which flow actually ceases has not been established; the authors of the original method note that their value "is likely higher than the Pcrit that would be measured if the heart stopped" ([Chandrasekhar et al. 2023](https://doi.org/10.1038/s41591-023-02474-6)). An accompanying editorial states that the accuracy of pulse-pressure × heart-rate estimates against stop-flow measurement "needs to be verified" ([Pinsky, *Anesthesiology* 2026](https://doi.org/10.1097/ALN.0000000000005908)).

The proportionality argument underlying the method requires arterial compliance to be constant within the sampling window. This assumption is a century old and has not been tested directly in the settings where Pcc is now being estimated.

The vascular waterfall framework itself assumes steady-state conditions and a fixed Pcc; its authors note that variability outside steady state "remains incompletely characterized," and label several of the proposed mechanisms as informed speculation ([Castro et al. 2026](https://doi.org/10.1016/j.jcrc.2026.155485)).

---

*Entries on this site are revised as the evidence moves. Last revised 12 September 2026.*
