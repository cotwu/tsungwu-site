# 個人網站快速開始

## 1) 本機預覽
在 `personal-site` 目錄執行：

```bash
python3 -m http.server 8080
```

瀏覽器開啟：`http://localhost:8080`

### Mac 一鍵開啟（推薦）
直接雙擊：`start.command`

注意：請不要直接雙擊 `index.html`（那會是 `file://`，Markdown 內容無法載入）。

## 2) 先上線（最簡單：Cloudflare Pages）
1. 建立 GitHub repository，將此專案 push 上去（只要包含 `personal-site/` 即可）。
2. 到 Cloudflare Pages 建立專案並連接該 repository。
3. Build 設定：
   - Framework preset: `None`
   - Root directory: `personal-site`
   - Build command: 留空
   - Output directory: `.`
4. 第一次部署成功後，你會拿到 `xxx.pages.dev` 網址。

## 3) 綁定你自己的網域
在 Cloudflare Pages 專案中：
1. 進入 `Custom domains`，新增：`tsungwu.tw`。
2. 依畫面提示在你的網域 DNS 管理商新增 `CNAME` 記錄。
3. 等待 DNS 生效（通常幾分鐘到 24 小時）。

## 4) 內容修改位置
- 內容（最常改）：`content/hero.md`、`content/about.md`、`content/focus.md`、`content/contact.md`
- 網頁結構：`index.html`
- 樣式：`styles.css`
- Markdown 載入與小互動：`script.js`

## 5) 你現在最先要改的 5 個地方
1. `content/hero.md` 的姓名與職稱
2. `content/hero.md` 的兩段主敘述
3. `content/about.md` 的個人簡介與地點
4. `content/focus.md` 的 3 個專業主軸（格式：`- 標題 | 說明`）
5. `content/contact.md` 的聯絡資訊
