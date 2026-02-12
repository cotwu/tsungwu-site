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
- 英文內容：`content/en/hero.md`、`content/en/about.md`、`content/en/focus.md`、`content/en/publications.md`、`content/en/contact.md`
- 繁中內容：`content/zh/hero.md`、`content/zh/about.md`、`content/zh/focus.md`、`content/zh/publications.md`、`content/zh/contact.md`
- 網頁結構：`index.html`
- 樣式：`styles.css`
- 雙語切換與 Markdown 載入：`script.js`

## 5) 你現在最先要改的 5 個地方
1. 英文版主視覺：`content/en/hero.md`
2. 繁中版主視覺：`content/zh/hero.md`
3. 英文版專業重點：`content/en/focus.md`
4. 繁中版專業重點：`content/zh/focus.md`
5. 聯絡資訊（雙語各自一份）：`content/en/contact.md`、`content/zh/contact.md`
