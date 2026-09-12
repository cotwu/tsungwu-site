---
title: 臨界關閉壓（Pcc）
description: 什麼是臨界關閉壓、為什麼它讓「全身血管阻力」成為定義不清的量、床邊如何用脈壓 × 心率估算 Pcc，以及近年五個世代研究確立了什麼、還沒確立什麼。
track: 圍術期血流動力學
updated: 2026-09-12
---

# 臨界關閉壓（Pcc）

<p class="lede">血流不是在動脈壓降到靜脈壓時才停止，而是更早——在一個由血管張力與周圍組織決定的壓力就停了。那個壓力就是臨界關閉壓（critical closing pressure, Pcc），它改變了「阻力」與「灌流壓」的意義。</p>

## 機制

**歷史線。** 1914 年，Patterson 與 Starling 為了維持離體心臟的冠脈灌流，把降主動脈放進一個加壓腔，發現舒張壓降不到腔壓以下（[Patterson & Starling, *J Physiol* 1914](https://doi.org/10.1113/jphysiol.1914.sp001669)）。Burton 在 1951 年把這個概念形式化：具有主動壁張力的小血管，存在一個壓力，低於它血管就關閉——即*臨界關閉壓*（[Burton, *Am J Physiol* 1951](https://doi.org/10.1152/ajplegacy.1951.164.2.319)）。

**血管層面發生什麼。** 當血管周圍的壓力（來自管壁張力或組織間壓）超過管內壓，血管塌陷、血流暫停；管內壓隨後回升到上游值，血管重新開通、血流恢復，循環再來一次。這種*斷續（stuttering）*行為，就是 Pcc 作為循環有效背壓的直接證據。2026 年一篇開放取用的敘述性回顧，把生理模型與它的力學基礎接了起來（[Castro et al., *J Crit Care* 2026](https://doi.org/10.1016/j.jcrc.2026.155485)）。

**Vascular waterfall。** Permutt 與 Riley 在 1963 年證明，有張力的可塌陷血管表現得像瀑布：流量取決於上游壓到關閉點的壓差，只要下游壓低於關閉點，下游壓就與流量無關（[Permutt & Riley, *J Appl Physiol* 1963](https://doi.org/10.1152/jappl.1963.18.5.924)）。Pcc 是這道瀑布在動脈側的高度；靜脈側對應的量是[平均系統充盈壓（Pmsf）](/zh/concepts/mean-systemic-filling-pressure/)，而 Pcc − Pmsf 這段落差就是瀑布本身損失掉的壓力。

**兩個床邊重要的後果。**

1. *全身血管阻力失去意義。* 如果 waterfall 存在，相關的壓差是 MAP − Pcc，不是 MAP − CVP。我們熟悉的 (MAP − CVP) / CO 就根本不是阻力。Chandrasekhar 等人在提出床邊 Pcc 估算的那篇論文裡明講了這點（[Chandrasekhar et al., *Nat Med* 2023](https://doi.org/10.1038/s41591-023-02474-6)）。
2. *灌流壓應該對 Pcc 來量。* MAP − Pcc 被命名為*組織灌流壓*（tissue perfusion pressure, TPP）。兩個 MAP 相同的病人，TPP 可以差很多。

**Pcc 在疾病中的位置。** 心輸出量低時，血管張力升高、Pcc 升高。Vasoplegia 時，Pcc 塌向平均系統充盈壓（Pmsf），waterfall 消失。Castro 等人的回顧整理了證據：升壓劑要在把 Pcc 拉離 Pmsf 時才改善灌流，而不只是把 MAP 拉高。

## 證據

**不停心怎麼估 Pcc。** Pcc 是流量–壓力關係外推到零流量時的壓力截距。要畫出這條線，得製造足夠的心輸出量變異，常規照護做不到。Chandrasekhar 等人（2023）提出以脈壓 × 心率（PP × HR）作為脈動性流量的替代物，論證是：任何與流量*成比例*、且流量為零時也歸零的替代物，必然給出同一個截距——比例常數被吸收進斜率。所以這個論證是關於截距，不是關於 PP × HR 估心輸出量準不準——而它要求那個比例常數（也就是動脈順應性）在取樣窗內維持不變。Liljestrand 與 Zander 早在 1928 年就指出動脈可擴張性是脈壓乘積的主要限制，引用 Recklinghausen 的關係式：振幅 × 頻率 ＝ 每分輸出量 ÷ 動脈可擴張性（[Liljestrand & Zander, *Z Ges Exp Med* 1928](https://doi.org/10.1007/BF02608853)）。

**2023–2026 年的五個世代。** 四篇用 PP × HR 作流量替代，一篇用實測熱稀釋心輸出量。

| | Chandrasekhar 2023 | Ayers 2025 | Miles 2026 | Wang J-Y 2026 | Wang C-C 2026 |
|---|---|---|---|---|---|
| 場域 | 心臟 ICU | 體外循環 | 心臟術後 | 敗血症 | 心臟移植 |
| n | 5,988 + 864（MIMIC-III） | 1,038 | 1,224 | 6,769 + 17,168（MIMIC-IV） | 269 |
| 流量替代 | PP × HR | PP × HR | PP × HR | PP × HR | 熱稀釋 CO |
| 取樣 | 逐搏，120 Hz | 逐搏 | 5 分鐘平均 | 每小時平均 | 每小時 |
| 視窗 | 1 分鐘 | 誘導 → 上機 | 5 分鐘 | 3 小時 | 72 小時 |
| 主要結果 | TPP < 34、MAP < 74 mmHg 預測預後；外部驗證只有 TPP 仍顯著 | 上機前 Pcc 越高，急性腎損傷越多 | TPP < 38 mmHg 與急性腎損傷相關 | 低 Pcc 與低 TPP 和死亡相關，呈 U 形 | TPP 對腎臟替代治療風險的重分類優於 MAP |
| 文獻 | [Nat Med](https://doi.org/10.1038/s41591-023-02474-6) | [JCVA](https://doi.org/10.1053/j.jvca.2024.11.010) | [JTCVS](https://doi.org/10.1016/j.jtcvs.2025.07.009) | [Anesthesiology](https://doi.org/10.1097/ALN.0000000000005881) | [JHLT](https://doi.org/10.1016/j.healun.2026.07.025) |

**把五篇並排後可以看到的三件事。**

1. *估計值收斂。* 取樣解析度相差三個數量級以上——逐搏 120 Hz 對每小時平均——但每個世代的 Pcc 中位數都落在大約 36–45 mmHg。
2. *兩篇方向相反，而 waterfall 模型剛好都預測到。* 體外循環後，Pcc 越高與腎損傷相關（Ayers 2025）；敗血症中，Pcc 越高與存活相關，且呈 U 形（Wang J-Y 2026）。用 waterfall 框架讀，這是同一條曲線的兩端：敗血症端的低 Pcc 代表 vasoplegia、waterfall 塌掉；心臟手術端的高 Pcc 代表張力過度。Wang J-Y 等人自己就報告了 U 形。
3. *只有一篇量了靜脈側。* Wang J-Y 等人同時估算了 Pmsf（CVP 對 PP × HR 的截距），因此能算出 waterfall 梯度 Pcc − Pmsf。其他世代只描述了動脈側。

## 未解問題

在完整循環中估得的 Pcc，在取樣解析度相差三個數量級的世代裡都聚在 40 mmHg 上下。這些估計值是否對應到血流真正停止的壓力，尚未確立；原始方法的作者自己指出，他們的數值「可能高於心臟停止時所測得的 Pcrit」（[Chandrasekhar et al. 2023](https://doi.org/10.1038/s41591-023-02474-6)）。隨附的社論寫道，脈壓 × 心率估計值對停流測量的準確性「需要被驗證」（[Pinsky, *Anesthesiology* 2026](https://doi.org/10.1097/ALN.0000000000005908)）。

方法背後的比例論證，要求動脈順應性在取樣窗內維持不變。這個假設已有一世紀之久，在目前估算 Pcc 的場域中尚未被直接檢驗。

Vascular waterfall 框架本身假設穩態與固定的 Pcc；其作者指出穩態之外的變異「仍未被完整描述」，並把數個提出的機制標為 informed speculation（[Castro et al. 2026](https://doi.org/10.1016/j.jcrc.2026.155485)）。

---

*本站條目會隨證據更新而改寫。最後修訂：2026 年 9 月 12 日。*
