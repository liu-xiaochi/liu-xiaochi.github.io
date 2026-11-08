# AmphBaro v1.0

**AmphBaro — 角闪石压力计 / Amphibole Barometry Calculator**

一个单文件、离线运行的角闪石压力计程序。输入角闪石电子探针氧化物成分，程序自动重算结构式，并同时给出 8 种 Al-in-hornblende 压力标定的结果、图解与可导出的表格。

> **English summary:** AmphBaro is a single-file, offline HTML calculator for amphibole barometry. It recalculates structural formulae on 23 O / Leake (1997) / 13–15 CNK bases and reports eight Al-in-hornblende pressure calibrations, with batch input, T–P plots, and CSV export. No data leaves the browser.

- 主程序：[`AmphBaro.html`](AmphBaro.html)
- 运行方式：双击 `AmphBaro.html`，用现代浏览器打开即可
- 依赖：无。无需安装 Python、Excel 插件或联网
- 数据：所有计算在本地浏览器内完成，不上传任何数据

![AmphBaro 计算结果页](AmphBaro_preview.png)

---

## 目录

1. [快速开始](#快速开始)
2. [界面与功能](#界面与功能)
3. [输入数据格式](#输入数据格式)
4. [结构式重算](#结构式重算)
5. [压力计方法](#压力计方法)
6. [结果、图表与导出](#结果图表与导出)
7. [内置示例](#内置示例)
8. [数值验证](#数值验证)
9. [适用范围与限制](#适用范围与限制)
10. [文件结构](#文件结构)
11. [常见问题](#常见问题)
12. [参考文献](#参考文献)
13. [版本记录](#版本记录)

---

## 快速开始

1. 双击打开 `AmphBaro.html`。
2. 在“数据输入”页直接编辑表格，或点击“粘贴数据”从 Excel 粘贴整块区域。
3. 选择 Fe³⁺ 估算方案、温度来源和压力单位。
4. 切换到“计算结果”查看当前样品的结构式、适用性检查和 8 种压力结果。
5. 在“图解”页查看 Al<sub>tot</sub>–P 与 T–P 关系。
6. 用“导出 CSV”“复制结果”或“打印 / PDF”保存结果。

程序默认载入 3 个 Mutch (2016) 示例样品，可直接替换成自己的数据。也可以点击“载入示例”载入完整的 Mutch、Xu 或 Ridolfi 示例数据集。

---

## 界面与功能

程序分为四个页面：

| 页面 | 内容 |
|---|---|
| 数据输入 | 批量编辑/粘贴氧化物成分；设置 Fe³⁺、温度来源、压力单位；结果预览 |
| 计算结果 | 当前样品的结构式、适用性警告、8 种压力结果、方法对比图、全部样品汇总表 |
| 图解 | Al<sub>tot</sub>–P 散点与标定线；T–P 散点与误差棒 |
| 方法说明 | 各压力计公式、重算说明、参考文献与免责声明 |

主要交互：

- **粘贴数据**：支持 Tab、逗号、分号或空白分隔；第一行可含表头。
- **添加样品 / 删除样品**：表格底部可继续添加；每行右侧有删除按钮。
- **载入示例**：Mutch (2016) 8 个样品、Xu (2021) 3 个样品、Ridolfi (2010) 3 个样品。
- **单位切换**：kbar 与 MPa 一键切换，表格、图表和导出同步更新。
- **结果复制**：把当前样品的主要结果复制为纯文本。
- **打印 / PDF**：自动切换到结果页并调用浏览器打印。
- **CSV 导出**：导出全部有效样品的结构式参数与各方法压力。

### URL 参数

可以用 URL 参数直接打开指定页面或单位：

```text
AmphBaro.html#results          打开“计算结果”
AmphBaro.html#plots            打开“图解”
AmphBaro.html?unit=MPa#results 以 MPa 显示结果
```

---

## 输入数据格式

### 表格列

| 列 | 含义 | 单位 | 是否必需 |
|---|---|---|---|
| 样品 | 样品号/名称 | — | 建议填写 |
| SiO₂ | 二氧化硅 | wt.% | 必需 |
| TiO₂ | 二氧化钛 | wt.% | 建议 |
| Al₂O₃ | 三氧化二铝 | wt.% | 必需 |
| Cr₂O₃ | 三氧化二铬 | wt.% | 可选 |
| FeO(T) | 全铁（以 FeO 计） | wt.% | 必需 |
| Fe₂O₃ | 三氧化二铁 | wt.% | 可选 |
| MnO | 氧化锰 | wt.% | 建议 |
| MgO | 氧化镁 | wt.% | 必需 |
| CaO | 氧化钙 | wt.% | 必需 |
| Na₂O | 氧化钠 | wt.% | 必需 |
| K₂O | 氧化钾 | wt.% | 必需 |
| T (°C) | 温度（用于 Anderson & Smith 1995） | °C | 可选 |

### FeO 与 Fe₂O₃ 的填写规则

这是最容易出错的地方：

- **只测了全铁**：把全铁按 FeO 计填入 **FeO(T)**，Fe₂O₃ 留空。
- **分别测了 FeO 和 Fe₂O₃**：FeO 列填亚铁 FeO，Fe₂O₃ 列填 Fe₂O₃；程序会按 `全铁 = FeO + 0.8998 × Fe₂O₃` 合并计算。
- 不要把“全铁”同时填进 FeO(T) 又填 Fe₂O₃，否则会重复计算铁。

### 从 Excel 粘贴

复制 Excel 中的整块数据（含或不含表头），粘贴到弹窗中即可。程序可识别常见中英文表头，例如：

```text
样品  SiO2  TiO2  Al2O3  Cr2O3  FeO   MnO  MgO   CaO   Na2O  K2O
MUT-01 48.05 1.16 6.16  0.06  15.97 0.34 12.02 10.77 0.97 0.44
MUT-02 48.19 1.11 6.59  0.11  13.70 0.36 12.09 10.53 0.89 0.53
```

若没有表头，默认列顺序为：

```text
样品, SiO2, TiO2, Al2O3, Cr2O3, FeO, MnO, MgO, CaO, Na2O, K2O, [Fe2O3], [T]
```

其中第 12 列若数值在 200–1500 之间会被识别为温度 T，否则识别为 Fe₂O₃；第 13 列为 T。

---

## 结构式重算

程序内部同时使用多种重算方案，以匹配各压力计的原始标定方式。

### 23 O 重算

按氧化物摩尔数计算氧原子数，将阳离子归一化到 **23 O**。用于：

- Mutch (2016)
- Schmidt (1992)
- Johnson & Rutherford (1989)
- Hammarstrom & Zen (1986)
- Hollister et al. (1987)
- Anderson & Smith (1995)

### Leake (1997)

根据 T 位是否被 Si + Al + Ti 填满，选择 **13-CNK** 或 **15-CNK** 归一化：

- 13-CNK：`Si + Ti + Al + Cr + Fe + Mn + Mg = 13`
- 15-CNK：`Si + Ti + Al + Cr + Fe + Mn + Mg + Ca = 15`

然后以电荷平衡（目标总电荷 46）求 Fe³⁺，并分配 T / C / B / A 位。这是“计算结果”页显示的结构式。

### Ridolfi (2010) 专用重算

固定使用 **13-CNK**：

```text
Si + Ti + Al + Cr + Fe + Mn + Mg = 13
```

Fe³⁺ 由电荷平衡求得：

```text
Fe³⁺ = clamp(46 − Q_allFe2+, 0, Fe_total)
```

其中 `Q_allFe2+` 为全部铁按 Fe²⁺ 时的阳离子总电荷。验证表明该实现与原始 Ridolfi Excel 表逐样品一致。

### Xu (2021) 专用重算

固定使用 **15-CNK**：

```text
Si + Ti + Al + Cr + Fe + Mn + Mg + Ca = 15
```

再以电荷平衡求 Fe³⁺，取 C 位 Al 作为 `Al_VI`。

### Fe³⁺ 估算方案

“数据输入”页提供四种选择：

| 方案 | 说明 |
|---|---|
| Leake (1997) 电荷平衡 | 推荐默认；13/15-CNK + 电荷平衡 |
| 全部铁按 Fe²⁺ | Fe³⁺ = 0；用于敏感性检查 |
| 固定 Fe³⁺/ΣFe | 按摩尔比拆分全铁，默认 0.20 |
| 使用输入的 Fe₂O₃ | 用 Fe₂O₃ 列直接拆分铁 |

注意：Al-in-hornblende 压力主要取决于 `Al_tot`，对 Fe³⁺ 拆分不敏感。Fe³⁺ 选择主要影响结构式显示与 Putirka 辅助温度；Ridolfi 与 Xu 方法内部始终按各自原始方案独立重算，不受该选择影响。

---

## 压力计方法

程序同时计算以下 8 种标定。压力单位在内部以 **kbar** 保存，显示时可在 kbar / MPa 间切换。

### 1. Ridolfi et al. (2010)

```text
P(MPa) = 19.209 × exp(1.438 × Al_tot)
```

- 重算：13-CNK
- 输出时换算为 kbar：`P(kbar) = P(MPa) / 100`
- 温度公式：

```text
T(°C) = 2041 − 151.487 × Si*
```

其中：

```text
Si* = Si + Al_IV/15 − 2·Ti_T − Al_VI/2 − Ti_C/1.8
      + Fe³⁺/9 + Fe²⁺/3.3 + Mg/26 + Ca_B/5 + Na_B/1.3
      − Na_A/15 + (1 − A)/2.3
```

`A = Na_A + K_A`；`Ti_T` 与 `Ti_C` 分别为 T 位与 C 位的 Ti。温度标定误差约 **±22 °C**。

### 2. Mutch et al. (2016)

```text
P(kbar) = 0.5 + 0.331 × Al_tot + 0.995 × Al_tot²
```

- 重算：23 O
- 对高铝角闪石更敏感

### 3. Xu et al. (2021)

```text
P(kbar) = 16.75 × Al_VI − 0.48
```

- 重算：15-CNK
- `Al_VI` 为 C 位 Al
- 适合堆晶/镁铁质角闪石

### 4. Schmidt (1992)

```text
P(kbar) = 4.76 × Al_tot − 3.01
```

- 重算：23 O
- 经典钙碱性深成岩标定
- 建议范围：约 2–13 kbar，700–1000 °C

### 5. Johnson & Rutherford (1989)

```text
P(kbar) = 4.23 × Al_tot − 3.46
```

- 重算：23 O
- 基于 Long Valley 火山岩实验标定

### 6. Hammarstrom & Zen (1986)

```text
P(kbar) = 5.03 × Al_tot − 3.92
```

- 重算：23 O
- 最早的 Al-in-hornblende 经验标定之一

### 7. Hollister et al. (1987)

```text
P(kbar) = 5.03 × Al_tot − 3.53
```

- 重算：23 O
- 与 H&Z 同斜率、不同截距

### 8. Anderson & Smith (1995)

```text
P(kbar) = −3.01 + 4.76 × Al_tot
         − [(T − 675) / 85] × [0.53 × Al_tot + 0.005294 × (T − 675)]
```

- 重算：23 O
- T 可取 Ridolfi (2010) 计算值，也可使用样品表中的 T 列
- 建议 T 范围：675–1000 °C
- 标定误差约 ±0.6 kbar；当 T 较高、Al_tot 较低时可能给出负压力，程序会标为“不适用”

### 温度辅助

程序还会在结果页的“方法内部重算”提示中给出 **Putirka (2016) Eq. 6** 的 P 依赖温度：

```text
T(°C) = 1687 − 118.7 Si + 131.56 Ti − 71.41 Fe_total
        + 86.13 Na_B + 22.44 × P(GPa)
```

该温度不参与压力计算，仅作为对比参考。

---

## 结果、图表与导出

### 计算结果页

- 样品切换 chips
- 4 个摘要卡片：Ridolfi 压力、经典方法均值、8 方法离散度（1σ）、Ridolfi 温度
- 结构式卡片：Si、Al_tot、Al_IV、Al_VI、Ti、Fe³⁺、Fe²⁺、Mg#、Ca_B、Na_B、Na_A、K_A、T+C+B、A、Σ阳离子、Fe³⁺/ΣFe、氧化物总量
- 适用性警告：Ca_B、Al_tot、Si、Fe³⁺、温度范围、方法离散度等
- 8 种方法的压力与适用状态
- 方法对比横向条形图
- 全部样品汇总表：Al_tot、Al_VI、T_Rid、各方法压力、均值、1σ

### 图解页

- **Al<sub>tot</sub>–P**：样品点与 H&Z、J&R、Schmidt、Mutch、Ridolfi 标定线
- **T–P**：Ridolfi 温度-压力散点，带 T ±22 °C、P ±11% 误差棒

### CSV 导出

文件名：

```text
AmphBaro_results_YYYY-MM-DD.csv
```

包含：

- 样品与全部氧化物输入
- `Al_tot_23O`
- `Al_VI_Xu`
- `T_Ridolfi_C`
- `T_used_C`
- 8 种方法的压力（当前显示单位）
- 均值与 1σ

CSV 带 UTF-8 BOM，可直接用 Excel 打开中文表头。

---

## 内置示例

| 示例 | 来源 | 样品数 | 用途 |
|---|---|---|---|
| Mutch 2016 | 本文件夹 `Al-in--hornblende barometer Mutch 2016.xlsx` | 8 | 演示低铝角闪石与经典方法差异 |
| Xu 2021 | 本文件夹 `角闪石压力计-Xu 2021 JP.xlsx` | 3 | 演示 Al_VI 标定 |
| Ridolfi 2010 | 本文件夹 `角闪石的温压计-湿度计-氧逸度计 Ridolfi-2010.xls` | 3 | 演示 13-CNK 重算与 T–P 结果 |

默认启动只载入前 3 个 Mutch 样品，便于快速查看；通过“载入示例”可载入完整数据集。

---

## 数值验证

开发时用原始 Excel 表做了逐样品回算：

### Ridolfi (2010)

| 样品 | 本程序 P (MPa) | 原始表 P (MPa) | 本程序 T (°C) | 原始表 T (°C) |
|---|---:|---:|---:|---:|
| RID-01 | 176.59 | 176.593 | 876.45 | 876.45 |
| RID-02 | 176.34 | 176.345 | 873.91 | 873.913 |
| RID-03 | 228.44 | 228.439 | 898.14 | 898.143 |

P 与 T 均在显示精度内完全一致。

### Xu (2021)

| 样品 | 本程序 P (kbar) | 原始表 P (kbar) |
|---|---:|---:|
| XU-01 | 6.14 | 6.05 |
| XU-02 | 5.90 | 5.90 |
| XU-03 | 6.61 | 6.61 |

XU-01 的差异约 0.09 kbar，来自 Al_VI 的舍入/位分配差异；其余两个样品一致。

### Mutch (2016)

MUT-01：本程序 `Al_tot = 1.0905`、`P = 2.044 kbar`；原始表 `Al_tot = 1.08`、`P = 2.018 kbar`。差异约 0.01 apfu / 0.03 kbar，来自 23 O 归一化的舍入。

---

## 适用范围与限制

### 适用前提

经典 Al-in-hornblende 压力计通常要求角闪石与以下矿物组合共生：

```text
石英 + 斜长石 + 钾长石 + 黑云母 + 钛铁氧化物 + 熔体
```

并且角闪石为**钙质角闪石**（Ca_B ≥ 1.5）。程序会检查 Ca_B、Si、Al_tot、Fe³⁺ 等成分范围，但**不能替代**岩相学观察与矿物平衡判断。

### 主要限制

1. **不是所有角闪石都适用**：低钙角闪石（透闪石、阳起石等）不适用经典 Al-in-hornblende 压力计。
2. **压力范围**：经典标定通常适用于约 1–13 kbar；超出范围时结果仅供参考。
3. **温度范围**：Anderson & Smith (1995) 建议 675–1000 °C；高温低铝时可能出现负压力。
4. **Fe³⁺ 估算**：电荷平衡法在低氧逸度、成分偏离理想配比或含 F/Cl 时可能不稳定；建议用“全部 Fe²⁺”做敏感性对比。
5. **方法间差异**：不同标定的实验体系、缓冲组合和重算方案不同，8 种方法给出不同压力是正常的；程序会显示 1σ 离散度。
6. **平衡判断**：程序只做成分计算，不判断矿物是否平衡、是否捕获、是否遭受后期改造。
7. **正式发表**：请回到原始文献核对公式、适用条件、不确定度与引用格式。

---

## 文件结构

```text
P-T计算/
├── AmphBaro.html     主程序（单文件，离线运行）
├── README.md         本说明
└── ...               原始 Excel 标定表与参考资料
```

主程序内嵌全部 HTML、CSS、JavaScript，不依赖 CDN、字体文件或外部脚本。

---

## 常见问题

**Q：为什么选择不同的 Fe³⁺ 方案，压力结果几乎不变？**  
A：Al-in-hornblende 压力主要取决于 `Al_tot`，而 `Al_tot` 对 Fe³⁺ 拆分不敏感。Fe³⁺ 选择主要影响结构式显示；Ridolfi 与 Xu 方法内部还各自使用原始重算方案。

**Q：为什么 Ridolfi 和 Schmidt 的结果差很多？**  
A：Ridolfi 使用 13-CNK 重算与非线性 Al–P 关系，Schmidt 使用 23 O 重算与线性关系；两者的实验体系和适用条件不同。方法间差异本身是有用的信息。

**Q：为什么 Anderson & Smith 给出负压力？**  
A：该标定在高温、低 Al_tot 时会外推到负值。程序会标为“不适用”；此时不应把负值当作真实压力。

**Q：FeO(T) 和 Fe₂O₃ 应该怎么填？**  
A：只测全铁时，填 FeO(T)，Fe₂O₃ 留空；分别测了 FeO 与 Fe₂O₃ 时，FeO 填亚铁、Fe₂O₃ 填铁，程序会合并全铁。

**Q：数据会上传到服务器吗？**  
A：不会。所有计算都在浏览器本地完成，程序可断网运行。

**Q：可以批量计算多少个样品？**  
A：前端表格没有硬性限制；几十到几百个样品均可。样品很多时表格区域会出现纵向滚动，CSV 导出仍包含全部有效样品。

**Q：如何引用这个程序？**  
A：建议引用为：

```text
AmphBaro v1.0 — Amphibole Barometry Calculator (2026).
基于 Ridolfi et al. (2010), Mutch et al. (2016), Xu et al. (2021)
及经典 Al-in-hornblende 标定的开源计算工具。
```

同时请引用你所使用压力计的原始文献。

---

## 参考文献

- Anderson, J.L. & Smith, D.R. (1995) The effects of temperature and fO₂ on the Al-in-hornblende barometer. *American Mineralogist* 80, 549–559.
- Hammarstrom, J.M. & Zen, E. (1986) Aluminum in hornblende: an empirical igneous geobarometer. *American Mineralogist* 71, 1297–1313.
- Hollister, L.S. et al. (1987) Confirmation of the empirical correlation of Al in hornblende with pressure of solidification of calc-alkaline plutons. *American Mineralogist* 72, 231–239.
- Johnson, M.C. & Rutherford, M.J. (1989) Experimental calibration of the aluminum-in-hornblende geobarometer with application to Long Valley caldera (California) volcanic rocks. *Geology* 17, 837–841.
- Leake, B.E. et al. (1997) Nomenclature of amphiboles: report of the Subcommittee on Amphiboles of the International Mineralogical Association. *Canadian Mineralogist* 35, 219–246.
- Mutch, E.J.F. et al. (2016) An experimental study of amphibole stability in low-pressure granitic magmas and a revised Al-in-hornblende geobarometer. *Contributions to Mineralogy and Petrology* 171, 85.
- Putirka, K.D. (2016) Amphibole thermometers and barometers for igneous systems and some implications for eruption mechanisms of felsic magmas. *American Mineralogist* 101, 819–840.
- Ridolfi, F., Renzulli, A. & Puerini, M. (2010) Stability and chemical equilibrium of amphibole in calc-alkaline magmas: an overview, new thermobarometric formulations and application to subduction-related volcanoes. *Contributions to Mineralogy and Petrology* 160, 45–66.
- Schmidt, M.W. (1992) Amphibole composition in tonalite as a function of pressure: an experimental calibration of the Al-in-hornblende barometer. *Contributions to Mineralogy and Petrology* 110, 304–310.
- Xu, J. et al. (2021) 角闪石压力计标定（本文件夹 `角闪石压力计-Xu 2021 JP.xlsx`）. *Journal of Petrology*.

---

## 版本记录

### v1.0 (2026)

- 首次发布
- 8 种压力标定：Ridolfi 2010、Mutch 2016、Xu 2021、Schmidt 1992、Johnson & Rutherford 1989、Hammarstrom & Zen 1986、Hollister 1987、Anderson & Smith 1995
- Leake (1997) 13/15-CNK 与 23 O 重算
- 批量表格、Excel 粘贴、示例数据
- Al_tot–P、T–P 图解
- CSV 导出、复制结果、打印/PDF
- 单文件离线运行

---

**AmphBaro v1.0** · 角闪石压力计 · Amphibole Barometry Calculator
