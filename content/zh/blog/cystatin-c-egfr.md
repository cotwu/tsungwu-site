---
title: 術前評估只看 creatinine，會漏掉什麼？
description: 肌肉量少的病人，creatinine 會讓腎功能看起來比實際好。同一位 80 歲病人，只用 creatinine 算 eGFR 是 57，加上 cystatin C 算是 28。這個差距在術後併發症、用藥劑量與風險分層上都有影響。
tags: 麻醉安全, 術前評估
date: 2026-09-21
---

# 術前評估只看 creatinine，會漏掉什麼？

一位 80 歲女性，45 公斤，準備接受手術。術前抽血，creatinine 1.0 mg/dL。

用 CKD-EPI 2021 公式算，她的 eGFR 是 57 mL/min/1.73 m²，CKD 第 3a 期。不算漂亮，但不會有人為這個數字在術前停下來。

同一天的同一管血，如果再驗一個 cystatin C，是 3.0 mg/L。

| 算法 | eGFR | CKD 分期 |
| --- | --- | --- |
| 只用 creatinine | 57 | G3a |
| 只用 cystatin C | 16 | G4 |
| 兩者合併 | 28 | G4 |

單位 mL/min/1.73 m²。三列依序為 CKD-EPI 2021 creatinine、CKD-EPI 2012 cystatin C、CKD-EPI 2021 creatinine–cystatin C。

同一個病人、同一管血，三個數字。Sugammadex、morphine、enoxaparin、抗生素的劑量判斷都建立在這個數字上，而這幾個數字會導向不同的決定。

## 差別來自肌肉

Creatinine 來自肌肉代謝。肌肉少的人 creatinine 天生就低，那是非腎臟的原因，但任何建立在 creatinine 上的估計都會把它讀成「腎功能好」。

麻醉碰到的高風險族群，老年、肌少症、肝硬化、癌症惡病質、長期臥床，正好都是肌肉少的人。

Cystatin C 是 13 kDa 的蛋白，由全身有核細胞穩定產生，自由過濾後在近曲小管回收分解。它不帶肌肉這個訊號，所以估出來的 GFR 不受肌肉量干擾。它自己的干擾因子是甲狀腺功能異常、高劑量類固醇、肥胖、抽菸與活動性發炎。

KDIGO 2024 的建議是：兩者都有時，合併公式最準確；creatinine 不可靠時，例如肌肉量極端或肝硬化，改用 cystatin C。

## 這不是少數個案

美國腎臟基金會體系的 CKD-PC 世代做了一份 82 萬門診加 4 萬住院病人的個體資料統合分析，2025 年發表在 JAMA。結果是：**住院病人有 35% 的 eGFRcys 比 eGFRcr 低 30% 以上。** 門診族群是 11%。

在門診世代追蹤 11 年，差距大的那群人全因死亡風險 HR 1.69、心衰竭 1.54、心血管死亡 1.61。住院族群沒有做結果分析。

## 手術族群的證據

| 文獻 | 族群 | 一句話結論 |
| --- | --- | --- |
| Lei, *Anesthesiology* 2026 | 中國兩院 58,905 位非心臟手術病人 | 每 10 mL/min 的差距對應術後併發症或死亡的勝算多 12%，兩家醫院各自算都一樣。73% 的病人 eGFRcys 低於 eGFRcr，平均差 10。心血管、AKI、感染、肺部分開看也都成立 |
| Prowle, *Clin Kidney J* 2024（METS） | 1,347 位 40 歲以上非心臟手術，前瞻性 | 兩個 eGFR 放進同一個模型（校正年齡、性別），cystatin C 仍與術後 AKI 相關，creatinine 就不再顯著 |
| Shlipak, *Am J Kidney Dis* 2011（TRIBE-AKI） | 1,147 位心臟手術，6 院前瞻性 | 腎功能最差的五分之一（對照最好的五分之二）：用 cystatin C 分，術後 AKI 勝算比 4.8；用 creatinine 分只有 1.8。加入 cystatin C 後，約兩成病人被移到更正確的風險分級 |
| Lees, *Br J Cancer* 2025 | 1,611 位癌症病人，1,837 次實際測量 GFR | 以實測 GFR 為標準，eGFRcr-cys 的準確度、偏差、精確度都最好。只用 creatinine 會讓 10 到 20% 的病人 carboplatin 劑量算得過高，改用 eGFRcr-cys 後這種情況少了 3 到 4 倍 |

前三篇問的是術後結果，第四篇問的是準不準。

## 如果不能全面驗，從哪裡開始

全面篩檢還很遠。如果要先挑一群人驗，下面是 JAMA 那篇 Table 4 裡兩個 eGFR 差距最大的特徵，門診族群、已校正其他變項。「差距大」的定義是 eGFRcys 比 eGFRcr 低 30% 以上。

| 特徵 | 差距大的人 vs 一般人 | 校正後 OR（95% CI） |
| --- | --- | --- |
| 目前吸菸 | 21.0% vs 11.0% | 2.09（1.59–2.74） |
| 心衰竭 | 18.5% vs 2.6% | 1.81（1.53–2.14） |
| 肝病 | 9.7% vs 5.7% | 1.79（1.12–2.88） |
| 年齡（每大 10 歲） | 平均 69 vs 58 歲 | 1.68（1.55–1.81） |
| 慢性阻塞性肺病 | 15.4% vs 2.9% | 1.61（1.38–1.89） |
| 周邊動脈疾病 | 4.5% vs 0.8% | 1.60（1.48–1.74） |
| BMI ≥30（每增 5） | 平均 31 vs 28 | 1.53（1.37–1.69） |

中風、心房顫動、冠心病、糖尿病、癌症、高血壓也都達顯著，但幅度較小，OR 在 1.12 到 1.23 之間。BMI ≥30 這一項有兩種解釋同時成立：肥胖本身會拉高 cystatin C，而高 BMI 也可能合併肌肉量少，讓 creatinine 偏低。原文沒有取得肌肉量的資料，作者列為限制之一，所以這兩個機轉分不開。

有一個發現值得單獨提。差距大的人裡面，**有 37.2% 的 eGFRcr 在 90 以上**，也就是 creatinine 看起來完全正常。和 eGFRcr 45 到 59 的人相比，eGFRcr 90 以上出現大幅差距的校正後勝算反而高 1.56 倍（95% CI 1.15–2.10）；eGFRcr 低於 30 的人反而比較低（0.56，0.46–0.69）。

換句話說，只挑「creatinine 已經不好看」的病人加驗，會漏掉最需要驗的那一群。

這份資料的限制要一併說：JAMA 那篇是門診與住院的一般族群，不是手術病人。住院族群的差距更常見，整體 35%，兩個 cohort 分別 38.1% 與 43.8%，心衰竭（1.63）、肝病（1.74）、周邊動脈疾病（1.38）、慢性阻塞性肺病（1.36）、癌症（1.25）在住院族群仍然顯著，冠心病則反過來（0.78）。麻醉族群目前還沒有同樣的分析。

## 一個附帶好處

Cr 與 cystatin C 兩者都有時，可同時算 sarcopenia index（Cr/CysC），一次抽血得到腎功能與肌少症兩個術前衰弱指標。髖部骨折的老年病人裡，術前的 sarcopenia index 可以預測術後併發症。

## 檢驗室要先確認一件事

Cystatin C 的檢驗方法必須是 IFCC 標準化、可追溯至 ERM-DA471，CKD-EPI 2012 與 2021 的公式才適用。這件事值得在導入前先跟檢驗科確認。

公式本身不必自己推：National Kidney Foundation 有 [CKD-EPI 2021 creatinine–cystatin C](https://www.kidney.org/professionals/ckd-epi-creatinine-cystatin-equation-2021) 與 [CKD-EPI 2012 cystatin C](https://www.kidney.org/professionals/ckd-epi-cystatin-c-equation-2012) 的線上計算。

## 參考文獻

1. Lei SH, Zhuo XY, Qu L, et al. Discordances between preoperative creatinine- and cystatin C-based estimated glomerular filtration rate and outcomes after noncardiac surgery: an observational study. *Anesthesiology*. 2026;144(4):811-822. PMID: [41270262](https://pubmed.ncbi.nlm.nih.gov/41270262/)
2. Prowle JR, Croal B, Abbott TEF, Cuthbertson BH, Wijeysundera DN; METS study investigators. Cystatin C or creatinine for pre-operative assessment of kidney function and risk of post-operative acute kidney injury: a secondary analysis of the METS cohort study. *Clin Kidney J*. 2024;17(1):sfae004. PMID: [38269033](https://pubmed.ncbi.nlm.nih.gov/38269033/)
3. Estrella MM, Ballew SH, Sang Y, et al. Discordance in creatinine- and cystatin C-based eGFR and clinical outcomes: a meta-analysis. *JAMA*. 2025;334(21):1915-1926. PMID: [41202182](https://pubmed.ncbi.nlm.nih.gov/41202182/)
4. Shlipak MG, Coca SG, Wang Z, et al. Presurgical serum cystatin C and risk of acute kidney injury after cardiac surgery. *Am J Kidney Dis*. 2011;58(3):366-373. PMID: [21601336](https://pubmed.ncbi.nlm.nih.gov/21601336/)
5. Lees JS, Fu EL, Faucon AL, et al. Accuracy of glomerular filtration rate estimates among patients with cancer. *Br J Cancer*. 2025;133(11):1652-1659. PMID: [40973716](https://pubmed.ncbi.nlm.nih.gov/40973716/)
6. Chen X, Shen Y, Hou L, et al. Sarcopenia index based on serum creatinine and cystatin C predicts the risk of postoperative complications following hip fracture surgery in older adults. *BMC Geriatr*. 2021;21(1):541. PMID: [34641805](https://pubmed.ncbi.nlm.nih.gov/34641805/)

KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease. *Kidney Int*. 2024.

本文的病人是依 CKD-EPI 公式計算的示例，不是真實病歷。數值以各文獻原文為準。
