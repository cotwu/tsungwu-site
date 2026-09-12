---
title: 平均系統充盈壓（Pmsf）
description: 什麼是平均系統充盈壓、為什麼驅動靜脈回流的上游壓力是它而不是中心靜脈壓、人體怎麼量、以及各種估計方法在哪裡不一致。
track: 圍術期血流動力學
updated: 2026-09-12
---

# 平均系統充盈壓（Pmsf）

<p class="lede">如果心臟停止、循環各處的壓力達到平衡，剩下的那一個壓力就是平均系統充盈壓（mean systemic filling pressure, Pmsf）。它是血液容積對容納它的血管所施加的壓力，也是把血液推回心臟的上游壓力。</p>

## 機制

**定義。** Pmsf 是系統循環在零流量時的平衡壓力。它只取決於兩件事：*應力容積*（stressed volume）——也就是真正把血管壁撐開的那部分血量——以及容納它的血管順應性。只是填滿血管而沒有撐開它的血量（*非應力容積*）對 Pmsf 沒有貢獻。因為靜脈容納了大部分血液、順應性又遠高於動脈，Pmsf 是一個靜脈側的量，數值接近靜脈壓而非動脈壓（[Magder, *Crit Care* 2016](https://doi.org/10.1186/s13054-016-1438-7)）。

**靜脈回流。** Guyton 在 1950 年代的實驗確立：靜脈回流由 Pmsf 到右心房壓的梯度、除以靜脈回流阻力所決定：VR = (Pmsf − CVP) / RVR（[Guyton, Lindsey & Kaufmann, *Am J Physiol* 1955](https://doi.org/10.1152/ajplegacy.1955.180.3.463)）。心輸出量就是這條靜脈回流曲線與心功能曲線的交點（[Guyton, *Physiol Rev* 1955](https://doi.org/10.1152/physrev.1955.35.1.123)）。兩個後果：第一，中心靜脈壓是靜脈回流的*下游*壓力——Pmsf 不變而 CVP 上升，靜脈回流是*減少*的，不代表血量變多。第二，這個驅動梯度平常很小——只有幾 mmHg——所以任一項的小變化都有影響。

**什麼會改變 Pmsf。** 輸液增加應力容積，Pmsf 上升。靜脈收縮劑把非應力容積轉成應力容積，不加一滴水也能拉高 Pmsf。靜脈擴張（敗血症、麻醉誘導、交感阻斷）則相反：同樣的血量施加的壓力變小，Pmsf 下降，即使心臟本身沒變，靜脈回流也跟著下降。正壓通氣會拉高 CVP；靜脈回流會不會掉，取決於 Pmsf 有沒有一起上升（[Jellinek et al., *J Appl Physiol* 2000](https://doi.org/10.1152/jappl.2000.88.3.926)；[Berger et al., *Am J Physiol Heart Circ Physiol* 2016](https://doi.org/10.1152/ajpheart.00931.2015)）。

**與臨界關閉壓的關係。** Pmsf 是壓力剖面的靜脈端；動脈端對應的量是[臨界關閉壓（Pcc）](/zh/concepts/critical-closing-pressure/)。兩者之間就是 vascular waterfall。流過組織的血流取決於 MAP − Pcc；流回心臟的血流取決於 Pmsf − CVP；而 Pcc − Pmsf 這段落差，就是 waterfall 本身損失掉的壓力。Vasoplegia 時 Pcc 塌向 Pmsf，這段落差消失。

## 證據

**人體怎麼量 Pmsf。** 用過四種方法，數字並不一致。

1. *循環停止。* 在植入式去顫器測試時誘發的心室顫動中，動脈壓與靜脈壓在數秒內收斂到約 10 mmHg 的靜態充盈壓（[Schipke et al., *Am J Physiol Heart Circ Physiol* 2003](https://doi.org/10.1152/ajpheart.00604.2003)；[Jellinek et al. 2000](https://doi.org/10.1152/jappl.2000.88.3.926)）。在重症病人死亡後不久測得的平衡壓平均約 13 mmHg，個體差異很大，且無法由常見的臨床變項解釋（[Repessé et al., *Am J Physiol Heart Circ Physiol* 2015](https://doi.org/10.1152/ajpheart.00413.2015)）。
2. *吸氣暫停操作。* 把氣道維持在幾個不同壓力，CVP 與心輸出量會階梯式改變；把得到的靜脈回流曲線外推到零流量即得 Pmsf。在心臟術後病人，這個方法得到的數值落在十幾到二十出頭 mmHg——高於循環停止法的數值（[Maas et al., *Crit Care Med* 2009](https://doi.org/10.1097/CCM.0b013e3181961481)）。這個方法源自最早在動物身上取得的瞬時靜脈回流曲線（[Pinsky, *J Appl Physiol* 1984](https://doi.org/10.1152/jappl.1984.56.3.765)）。
3. *手臂阻斷。* 把壓脈帶充到高於動脈壓，讀取手臂動脈壓的平台值，得到一個局部平衡壓。
4. *模型類比值（Pmsa）。* 用數學模型從 MAP、CVP、心輸出量與體型參數算出 Pmsf 的類比值，不需任何操作（[Parkin & Leaning, *J Clin Monit Comput* 2008](https://doi.org/10.1007/s10877-008-9147-7)）。

後三種方法在同一群病人身上比較時，絕對值不同，但變化方向彼此一致（[Maas et al., *Intensive Care Med* 2012](https://doi.org/10.1007/s00134-012-2586-0)）。一篇臨床方法的系統性回顧得到同樣結論：方法之間的一致性有限，而且沒有任何一種在完整循環中對照過真正的零流量參考值（[Wijnberge et al., *Ann Intensive Care* 2018](https://doi.org/10.1186/s13613-018-0418-2)）。在動物模型中，吸氣暫停法的估計值會隨容積狀態改變而偏離直接測量值（[Werner-Moller et al., *J Appl Physiol* 2019](https://doi.org/10.1152/japplphysiol.00897.2018)）。

**輸液挑戰時的 Pmsf。** 在外科 ICU 病人，一次輸液使模型推算的 Pmsf 在有反應者與無反應者都上升；區分兩者的是 Pmsf − CVP 這個梯度：有反應者梯度變大，無反應者的 CVP 則與 Pmsf 同步上升（[Cecconi et al., *Intensive Care Med* 2013](https://doi.org/10.1007/s00134-013-2928-6)）。後續研究用同一個類比值描述心臟術後心臟相對於靜脈回流的「效率」（[Gupta et al., *Intensive Care Med* 2015](https://doi.org/10.1007/s00134-014-3611-2)）。

**Waterfall 的靜脈端。** 在一個大型敗血症世代中，Pmsf 以 CVP 對脈壓 × 心率的截距估算——也就是估 Pcc 那個動脈側方法的靜脈側對應版——因此能算出每位病人的 Pcc − Pmsf 梯度。這是迄今唯一同時估出 waterfall 兩端的世代（[Wang J-Y et al., *Anesthesiology* 2026](https://doi.org/10.1097/ALN.0000000000005881)）。

## 未解問題

人體循環停止法的測量值聚在 10–13 mmHg；通氣中病人用操作法的估計值較高。這個差異反映的是真實生理（正壓通氣、交感張力、術後狀態）還是外推方法本身，尚未釐清。系統性回顧指出，臨床方法都沒有在完整循環中對照過零流量參考值（[Wijnberge et al. 2018](https://doi.org/10.1186/s13613-018-0418-2)）。

生理上真正重要的量是 Pmsf − CVP 這個梯度，不是 Pmsf 本身。床邊方法若報出的 Pmsf 誤差達數 mmHg，可能就無法分辨一個本身只有幾 mmHg 寬的梯度。

沒有任何試驗檢驗過以 Pmsf 指引輸液或升壓劑是否改善病人預後。以脈壓 × 心率估算 Pmsf 的方法，繼承了 [Pcc 條目](/zh/concepts/critical-closing-pressure/)討論過的同一個比例假設，也還沒和循環停止法對照過。

---

*本站條目會隨證據更新而改寫。最後修訂：2026 年 9 月 12 日。*
