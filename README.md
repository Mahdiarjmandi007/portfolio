# مهدی ارجمندی — سایت شخصی

یک سایت تک‌صفحه‌ای، سریع و بدون بک‌اند؛ فقط HTML، CSS و کمی JavaScript.

- فارسی و RTL
- فونت وزیرمتن به‌صورت لوکال (بدون وابستگی به CDN)
- ریسپانسیو از موبایل تا دسکتاپ
- انیمیشن‌های سبک با `IntersectionObserver`
- دکمهٔ کپی ایمیل، منوی موبایل و ناوبری فعال
- سازگار با `prefers-reduced-motion`

## ساختار

```
.
├── index.html
├── favicon.svg
├── vercel.json
├── assets/
│   ├── css/style.css
│   ├── js/main.js
│   ├── fonts/Vazirmatn.woff2
│   ├── img/avatar.jpg
│   └── resume.pdf
└── README.md
```

## اجرای محلی

نیازی به بیلد نیست. کافی است پوشه را با یک وب‌سرور ساده باز کنید:

```bash
python -m http.server 8000
```

سپس: <http://localhost:8000>

> باز کردن مستقیم `index.html` هم کار می‌کند، ولی برای فونت و مسیرها بهتر است از وب‌سرور استفاده کنید.

## انتشار

### Cloudflare Pages (پیشنهادی)

1. پوشه را در یک ریپوی GitHub بگذارید.
2. در Cloudflare Pages → **Create a project** → ریپو را وصل کنید.
3. Build command را خالی و Output directory را `/` بگذارید.
4. دامنهٔ اختصاصی را از تنظیمات اضافه کنید.

### GitHub Pages

1. ریپو را push کنید.
2. Settings → Pages → Source: **Deploy from a branch** → `main` / `root`.
3. آدرس: `https://<username>.github.io/<repo>/`

### Netlify

پوشه یا ریپو را وصل کنید؛ بیلدی لازم نیست و فایل `vercel.json` هم مزاحمتی ایجاد نمی‌کند.

### Vercel

این پروژه استاتیک است و Build Command نمی‌خواهد.

#### روش ۱ — از طریق GitHub (پیشنهادی برای آپدیت‌های بعدی)

1. در GitHub یک ریپوی خالی بسازید (مثلاً `portfolio`).
2. داخل همین پوشه:

```bash
git init
git add .
git commit -m "Personal website"
git branch -M main
git remote add origin https://github.com/Mahdiarjmandi007/portfolio.git
git push -u origin main
```

3. برو به <https://vercel.com/new> و ریپو را Import کن.
4. تنظیمات پروژه:
   - **Framework Preset:** Other
   - **Root Directory:** `./`
   - **Build Command:** خالی
   - **Output Directory:** خالی (یا `.`)
   - **Install Command:** خالی
5. **Deploy** را بزن.

بعد از این، هر `git push` روی `main` خودکار دیپلوی می‌شود.

#### روش ۲ — با CLI (بدون GitHub)

```bash
npm i -g vercel
cd D:\project\readme
vercel login
vercel          # پیش‌نمایش
vercel --prod   # انتشار نهایی
```

پاسخ‌های پیشنهادی به سؤال‌ها:

- Set up and deploy? → `Y`
- Which scope? → حساب خودت
- Link to existing project? → `N`
- Project name → `mahdi-arjmandi`
- Directory → `./`
- Modify settings? → `N`

#### دامنهٔ اختصاصی

Project → **Settings** → **Domains** → Add. بعد در پنل DNS دامنه:

- رکورد `A` برای دامنهٔ اصلی (معمولاً `76.76.21.21`)
- رکورد `CNAME` برای `www` (معمولاً `cname.vercel-dns.com`)

مقدار دقیق را خود ورسل بعد از Add نشان می‌دهد؛ همان‌ها را وارد کن.

> پلن Hobby ورسل برای پروژهٔ شخصی و غیرتجاری رایگان است. اگر `*.vercel.app` در ایران برایت باز نشد، دامنهٔ اختصاصی معمولاً مشکل را حل می‌کند؛ در غیر این صورت Cloudflare Pages جایگزین مطمئنی است.

## شخصی‌سازی

- **رنگ‌ها:** متغیرهای ابتدای `assets/css/style.css` (`--accent`, `--bg`, ...)
- **متن‌ها:** مستقیم داخل `index.html`
- **تصویر پروفایل:** `assets/img/avatar.jpg` را جایگزین کنید
- **رزومه:** `assets/resume.pdf` را جایگزین کنید
- **ایمیل:** در دو جا — لینک `mailto:` و `data-email` روی دکمهٔ کپی
- **لینک‌ها:** GitHub و Telegram در بخش تماس

## نکته

شمارهٔ تلفن در سایت قرار داده نشده تا در معرض اسپم نباشد. در صورت نیاز، در بخش تماس اضافه کنید.
