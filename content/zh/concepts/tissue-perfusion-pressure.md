---
title: 組織灌流壓：MAP − Pcc，還是 Pcc − Pmsf？
description: 兩個研究團隊都把「驅動組織灌流的壓力」這句話用在不同的差值上——MAP − Pcc 與 Pcc − Pmsf。各自量的是什麼、證據說了什麼、以及為什麼單靠 MAP 目標分不出兩者。
track: 圍術期血流動力學
---

# 組織灌流壓：MAP − Pcc，還是 Pcc − Pmsf？

<p class="lede">從主動脈到腔靜脈，壓力分三段往下掉：從動脈壓降到臨界關閉壓、跨過 vascular waterfall 降到平均系統充盈壓、再從那裡降到右心房。兩個研究團隊各自把前兩段中的一段稱為「驅動組織灌流的壓力」。他們量的不是同一個東西。</p>

## 機制

**三段串聯的壓差。** 把整條迴路寫出來：

> MAP − CVP = (MAP − Pcc) + (Pcc − Pmsf) + (Pmsf − CVP)

第一項把血推過小動脈與微血管。第三項是 Guyton 描述的靜脈回流梯度（見 [Pmsf 條目](/zh/concepts/mean-systemic-filling-pressure/)）。中間那項就是 vascular waterfall 本身：在血管關閉點被「損失」掉的壓力，對兩側的血流都沒有貢獻。Castro、Pinsky 等人在 2026 年的回顧裡把這條壓力剖面明確畫了出來（[Castro et al., *J Crit Care* 2026](https://doi.org/10.1016/j.jcrc.2026.155485)，圖 1）。

**為什麼 waterfall 把兩側斷開。** Permutt 與 Riley 證明，一旦有張力的可塌陷血管成為限流段，流量只取決於上游壓減關閉壓；只要下游壓低於關閉點，下游壓就無關緊要（[Permutt & Riley, *J Appl Physiol* 1963](https://doi.org/10.1152/jappl.1963.18.5.924)）。肺提供了熟悉的類比：West 的 zone 2 裡，血流由動脈壓減肺泡壓決定，靜脈壓不進入方程式（[West, Dollery & Naimark, *J Appl Physiol* 1964](https://doi.org/10.1152/jappl.1964.19.4.713)）。在系統循環中，同樣的邏輯把動脈壓力系統和靜脈壓力系統分開。Andrei 等人把 waterfall 描述為「將動脈與靜脈循環斷開成兩個壓力系統」的東西（[Andrei et al., *Intensive Care Med Exp* 2023](https://doi.org/10.1186/s40635-023-00539-x)）。

**Waterfall 有高度，而且高度會動。** 血管張力高時，Pcc 高、瀑布高。Vasoplegia 時張力消失，Pcc 塌向 Pmsf，瀑布變平——兩個壓力系統重新連通。能恢復張力的升壓劑會拉高 Pcc、重建瀑布；但它會不會這麼做，和它會不會拉高 MAP，是兩個不同的問題。

**「灌流壓」的兩種定義。**

| | Chandrasekhar 等（2023–2026） | Andrei、Guinot 等（2023–2026） |
|---|---|---|
| 量 | **組織灌流壓 TPP = MAP − Pcc** | **Vascular waterfall VW = Pcc − Pmsf** |
| 怎麼量 | 脈壓 × 心率對 MAP 的截距；只有動脈側 | 吸氣暫停操作；Pcc 與 Pmsf 都量 |
| 描述為 | 可用來推動血流過組織的壓力 | 「驅動微循環血流的壓力梯度」 |
| 連結到 | 急性腎損傷、死亡率、腎臟替代治療 | norepinephrine 反應、微血管再充填時間、pCO₂ gap |

前者是瀑布*上方*那一段，後者是瀑布*本身*。兩組人用的是同一個物理模型，只是切在不同的地方。兩者從未在同一群病人身上被比較過。

## 證據

**Vasoplegia 時瀑布很低，而 norepinephrine 不一定能重建它。** 三十位心臟術後、輸液無效的 vasoplegic 低血壓病人，基線的 Pcc − Pmsf 只有幾 mmHg。Norepinephrine 在所有人身上都拉高了動脈壓與總周邊阻力。但只有 30 人中的 19 人（63%）瀑布上升——從 3.5 到 43.6 mmHg——而這些人的心臟指數、微血管再充填時間、pCO₂ gap 都改善了。另外 11 人 MAP 一樣上升，瀑布卻沒動，灌流指標也沒變。沒有任何基線參數能預測病人會落在哪一組（[Andrei et al. 2023](https://doi.org/10.1186/s40635-023-00539-x)）。

**微血管再充填時間跟著瀑布走——透過它的動脈端。** 在 74 位心臟術後病人的較大世代中，依表型分別給 norepinephrine、輸液或 dobutamine；再充填時間延長的病人瀑布較低（2.8 vs 18.3 mmHg），再充填時間的變化與瀑布的變化相關（ρ = −0.40）。相關的是 ΔPcc（ρ = −0.42），不是 ΔPmsf（ρ = −0.03）（[Andrei et al., *Ann Intensive Care* 2026](https://doi.org/10.1016/j.aicoj.2026.100105)）。

**TPP 比 MAP 多告訴我們一些事。** 在提出這個指標的世代裡，TPP < 34 與 MAP < 74 mmHg 都能預測預後，但外部驗證中只有 TPP 仍然顯著（[Chandrasekhar et al., *Nat Med* 2023](https://doi.org/10.1038/s41591-023-02474-6)）。心臟術後，TPP < 38 mmHg 與急性腎損傷相關（[Miles et al., *J Thorac Cardiovasc Surg* 2026](https://doi.org/10.1016/j.jtcvs.2025.07.009)）。心臟移植後，以熱稀釋實測而非估計的心輸出量計算，TPP 對腎臟替代治療風險的重分類優於 MAP（[Wang C-C et al., *J Heart Lung Transplant* 2026](https://doi.org/10.1016/j.healun.2026.07.025)）。

**同一個世代裡的瀑布兩端。** 只有一個研究大規模地同時估算了 Pcc 與 Pmsf：6,769 位敗血症病人，Pmsf 取 CVP 對脈壓 × 心率的截距，得到每位病人的瀑布梯度，閾值約 17 mmHg（[Wang J-Y et al., *Anesthesiology* 2026](https://doi.org/10.1097/ALN.0000000000005881)）。

**兩個方向相反的世代——而 waterfall 模型兩個都預測到。** 體外循環後，上機前 Pcc *越高*與急性腎損傷相關（[Ayers et al., *J Cardiothorac Vasc Anesth* 2025](https://doi.org/10.1053/j.jvca.2024.11.010)）。敗血症中，Pcc *越低*與死亡相關，且呈 U 形（[Wang J-Y et al. 2026](https://doi.org/10.1097/ALN.0000000000005881)）。用 waterfall 模型讀，這是同一條曲線的兩端：低 Pcc 代表 vasoplegia、瀑布塌掉；高 Pcc 代表張力過度、瀑布太高，同樣的 MAP 已經越不過去。Wang J-Y 等人自己就報告了 U 形。

**這對 MAP 目標意味著什麼。** 上面每一項發現都指向同一件事。一個 MAP 目標分不出 Pcc 是 25 mmHg 還是 55 mmHg 的病人——在同樣的 MAP 下，兩人的 TPP 差了 30 mmHg。它也分不出瀑布被重建的 norepinephrine responder，和只有 MAP 上升的 non-responder。被設為目標的壓力，和灌流組織的壓力，不是同一個數字。

## 未解問題

哪一段才是「灌流壓」尚未定論，因為兩種定義從未在同一群病人身上被量過。脈壓法只給動脈側，算不出 Pcc − Pmsf；吸氣暫停法需要機械通氣與暫停呼吸，手術中不可行。每種方法都有它到不了的場域。

Norepinephrine non-response 的機制不明；作者指出沒有基線參數能預測它（[Andrei et al. 2023](https://doi.org/10.1186/s40635-023-00539-x)）。

以脈壓 × 心率估算 Pcc 尚未對照停流測量驗證；隨附社論寫道這個準確性「需要被驗證」（[Pinsky, *Anesthesiology* 2026](https://doi.org/10.1097/ALN.0000000000005908)）。Waterfall 模型本身假設穩態與固定的 Pcc，其作者把數個提出的機制標為 informed speculation（[Castro et al. 2026](https://doi.org/10.1016/j.jcrc.2026.155485)）。

沒有任何試驗以 TPP 或瀑布梯度作為治療目標。
