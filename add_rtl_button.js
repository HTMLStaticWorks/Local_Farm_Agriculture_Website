const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const btnRegex = /(<button[^>]*theme-toggle-btn[^>]*>.*?<\/button>)/gs;
const rtlCheck = /class="[^"]*rtl-toggle-btn[^"]*"/;

for (const file of files) {
    if (file === 'temp-agron-index-2.html') continue;
    let content = fs.readFileSync(file, 'utf8');
    
    if (rtlCheck.test(content)) {
        console.log(`RTL button already in ${file}`);
        continue;
    }
    
    let cnt = 0;
    const newContent = content.replace(btnRegex, (match, p1) => {
        cnt++;
        let classes = "rtl-toggle-btn";
        let styleStr = "";
        
        if (p1.includes('d-lg-none')) {
            classes += " d-lg-none";
            if (p1.includes('margin: 0')) {
                styleStr = ' style="margin: 0;"';
            }
        } else if (p1.includes('d-none') && p1.includes('d-lg-block')) {
            classes += " d-none d-lg-block";
        }
        
        // Match indentation of original button approximately
        const indentMatch = match.match(/^(\s*)/);
        const ws = indentMatch ? indentMatch[1] : '';
        const newBtn = `\n${ws}<button class="${classes}" aria-label="Toggle RTL"${styleStr}>RTL</button>`;
        return p1 + newBtn;
    });
    
    if (cnt > 0) {
        fs.writeFileSync(file, newContent, 'utf8');
        console.log(`Updated ${file} (added ${cnt} RTL buttons)`);
    } else {
        console.log(`No theme toggle button found in ${file}`);
    }
}
