---
title: Mean systemic filling pressure (Pmsf)
description: What mean systemic filling pressure is, why it, not central venous pressure, is the upstream pressure driving venous return, how it has been measured in humans, and where the estimates disagree.
about: Q3506185 Q1642137
track: Perioperative hemodynamics
updated: 2026-09-12
---

# Mean systemic filling pressure (Pmsf)

<p class="lede">If the heart stopped and pressures everywhere in the circulation equilibrated, the single pressure that remained would be the mean systemic filling pressure. It is the pressure the blood volume exerts on the vessels that contain it, and it is the upstream pressure that drives blood back to the heart.</p>

## Mechanism

**Definition.** Pmsf is the equilibrium pressure of the systemic circulation at zero flow. It depends on two things only: the *stressed* blood volume, the part of the volume that stretches the vessel walls, and the compliance of the vessels holding it. Volume that merely fills the vessels without stretching them (the *unstressed* volume) contributes nothing to Pmsf. Because veins hold most of the blood and are far more compliant than arteries, Pmsf is a venous-side quantity and sits close to venous pressures, not arterial ones ([Magder, *Crit Care* 2016](https://doi.org/10.1186/s13054-016-1438-7)).

**Venous return.** Guyton's experiments in the 1950s established that venous return is set by the gradient from Pmsf down to right atrial pressure, divided by the resistance to venous return: VR = (Pmsf − CVP) / RVR ([Guyton, Lindsey & Kaufmann, *Am J Physiol* 1955](https://doi.org/10.1152/ajplegacy.1955.180.3.463)). Cardiac output is the point where this venous return curve meets the cardiac function curve ([Guyton, *Physiol Rev* 1955](https://doi.org/10.1152/physrev.1955.35.1.123)). Two consequences follow. First, central venous pressure is the *downstream* pressure of venous return: a rise in CVP with no change in Pmsf *reduces* venous return rather than signalling more volume. Second, the driving gradient is normally small, a few mmHg, so small changes in either term matter.

**What moves Pmsf.** A fluid bolus raises Pmsf by adding stressed volume. A venoconstrictor raises Pmsf by converting unstressed to stressed volume, without adding any. Venodilation (sepsis, anaesthetic induction, sympatholysis) does the opposite: the same blood volume exerts less pressure, Pmsf falls, and venous return falls even if the heart is unchanged. Positive airway pressure raises CVP; whether venous return falls depends on whether Pmsf rises with it ([Jellinek et al., *J Appl Physiol* 2000](https://doi.org/10.1152/jappl.2000.88.3.926); [Berger et al., *Am J Physiol Heart Circ Physiol* 2016](https://doi.org/10.1152/ajpheart.00931.2015)).

**Relation to critical closing pressure.** Pmsf is the venous-side end of the pressure profile; on the arterial side, the corresponding quantity is the [critical closing pressure (Pcc)](/en/concepts/critical-closing-pressure/). Between them lies the vascular waterfall. Flow through the tissues depends on MAP − Pcc; flow back to the heart depends on Pmsf − CVP; and the gap Pcc − Pmsf is the pressure lost across the waterfall itself. In vasoplegia Pcc falls toward Pmsf and this gap closes.

## Evidence

**Measuring Pmsf in humans.** Four approaches have been used; they do not give the same numbers.

1. *Circulatory arrest.* During ventricular fibrillation induced for defibrillator testing, arterial and venous pressures converge within seconds to a static filling pressure of roughly 10 mmHg ([Schipke et al., *Am J Physiol Heart Circ Physiol* 2003](https://doi.org/10.1152/ajpheart.00604.2003); [Jellinek et al. 2000](https://doi.org/10.1152/jappl.2000.88.3.926)). In critically ill patients measured shortly after death, the equilibrium pressure averaged about 13 mmHg with wide variation, and was not explained by the usual clinical variables ([Repessé et al., *Am J Physiol Heart Circ Physiol* 2015](https://doi.org/10.1152/ajpheart.00413.2015)).
2. *Inspiratory-hold manoeuvres.* Holding the airway at several pressures changes CVP and cardiac output stepwise; extrapolating the resulting venous return curve to zero flow gives Pmsf. In postoperative cardiac surgery patients this produced values in the high teens to low twenties of mmHg: higher than arrest-based values ([Maas et al., *Crit Care Med* 2009](https://doi.org/10.1097/CCM.0b013e3181961481)). The method builds on instantaneous venous return curves first obtained in animals ([Pinsky, *J Appl Physiol* 1984](https://doi.org/10.1152/jappl.1984.56.3.765)).
3. *Arm occlusion.* Inflating a cuff above arterial pressure and reading the plateau in the arm's arterial pressure gives a local equilibrium pressure.
4. *Model analogue (Pmsa).* A mathematical model computes an analogue of Pmsf from MAP, CVP, cardiac output, and anthropometrics, without any manoeuvre ([Parkin & Leaning, *J Clin Monit Comput* 2008](https://doi.org/10.1007/s10877-008-9147-7)).

When the last three were compared in the same patients, absolute values differed but changes tracked one another ([Maas et al., *Intensive Care Med* 2012](https://doi.org/10.1007/s00134-012-2586-0)). A systematic review of the clinical methods reached the same conclusion: agreement between methods is limited, and none has been validated against a true zero-flow reference in the intact circulation ([Wijnberge et al., *Ann Intensive Care* 2018](https://doi.org/10.1186/s13613-018-0418-2)). In an experimental model, the inspiratory-hold estimate diverged from the directly measured value as volume status changed ([Werner-Moller et al., *J Appl Physiol* 2019](https://doi.org/10.1152/japplphysiol.00897.2018)).

**Pmsf during a fluid challenge.** In postsurgical ICU patients, a fluid bolus raised the model-derived Pmsf in responders and non-responders alike; what distinguished responders was that the gradient Pmsf − CVP increased, whereas in non-responders CVP rose in step with Pmsf ([Cecconi et al., *Intensive Care Med* 2013](https://doi.org/10.1007/s00134-013-2928-6)). A later study used the same analogue to describe the "efficiency" of the heart relative to venous return after cardiac surgery ([Gupta et al., *Intensive Care Med* 2015](https://doi.org/10.1007/s00134-014-3611-2)).

**The venous side of the waterfall.** In a large sepsis cohort, Pmsf was estimated as the intercept of CVP against pulse pressure × heart rate, the venous counterpart of the arterial method used for Pcc, allowing the gradient Pcc − Pmsf to be computed for each patient. This is the only cohort to date in which both ends of the waterfall have been estimated together ([Wang J-Y et al., *Anesthesiology* 2026](https://doi.org/10.1097/ALN.0000000000005881)).

## Open questions

Arrest-based measurements in humans cluster around 10–13 mmHg; manoeuvre-based estimates in ventilated patients are higher. Whether the difference reflects true physiology (positive-pressure ventilation, sympathetic tone, the postoperative state) or the extrapolation method has not been resolved. The systematic review notes that the clinical methods have not been validated against a zero-flow reference in the intact circulation ([Wijnberge et al. 2018](https://doi.org/10.1186/s13613-018-0418-2)).

The quantity that matters physiologically is the gradient Pmsf − CVP, not Pmsf alone. Bedside methods that report Pmsf with an error of several mmHg may therefore be unable to resolve a gradient that is itself only a few mmHg wide.

No trial has tested whether guiding fluids or vasopressors by Pmsf improves patient outcomes. The estimates of Pmsf from pulse pressure × heart rate inherit the same proportionality assumption discussed in the [Pcc entry](/en/concepts/critical-closing-pressure/), and have not been compared with arrest-based measurement.

---

*Entries on this site are revised as the evidence moves. Last revised 12 September 2026.*
