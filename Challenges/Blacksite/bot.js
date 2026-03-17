const puppeteer = require("puppeteer");

const BASE_URL = process.env.BASE_URL || "http://lab";
const LOGIN_URL = `${BASE_URL}/create.php`;
const USERNAME = process.env.ADMIN_USER || "admin";
const PASSWORD = process.env.ADMIN_PASS || "eclipse";
const COOKIE_NAME = "flag";
const COOKIE_VALUE = process.env.FLAG || "ECLIPSE{y0u_f0und_1t}";

async function visit(targetPath) {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
        ],
    });

    const page = await browser.newPage();

    try {
        // First open base domain so cookie domain matches
        await page.goto(BASE_URL, { waitUntil: "networkidle2", timeout: 10000 });

        // Set JS-accessible cookie (HttpOnly: false)
        await page.setCookie({
            name: COOKIE_NAME,
            value: COOKIE_VALUE,
            url: BASE_URL,
            httpOnly: false,
            sameSite: "Lax",
        });

        // Login
        await page.goto(LOGIN_URL, { waitUntil: "networkidle2", timeout: 10000 });

        await page.type('input[name="user"]', USERNAME);
        await page.type('input[name="pass"]', PASSWORD);

        await Promise.all([
            page.click('button[type="submit"], input[type="submit"]'),
            page.waitForNavigation({ waitUntil: "networkidle2", timeout: 10000 }).catch(() => { }),
        ]);

        // Visit attacker-controlled page inside the challenge
        const fullUrl = new URL(targetPath, BASE_URL).toString();

        // Restrict bot to your own site only
        if (!fullUrl.startsWith(BASE_URL)) {
            throw new Error("Target URL outside allowed origin");
        }

        await page.goto(fullUrl, { waitUntil: "networkidle2", timeout: 10000 });

        // Let any payload execute
        await new Promise(resolve => setTimeout(resolve, 5000));    } catch (err) {
        console.error("Bot error:", err.message);
    } finally {
        await browser.close();
    }
}

const target = process.argv[2] || "/";
visit(target);