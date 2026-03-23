import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

# Pattern to match the complete theme toggle button including its inner content
btn_pattern = re.compile(r'(<button[^>]*theme-toggle-btn[^>]*>.*?</button>)', re.DOTALL)
rtl_check = re.compile(r'class="[^"]*rtl-toggle-btn[^"]*"')

for f_name in html_files:
    with open(f_name, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if rtl button is already there
    if rtl_check.search(content):
        print(f"RTL button already in {f_name}")
        continue
    
    def replacer(match):
        original_btn = match.group(1)
        
        # Determine classes based on original button
        classes = "rtl-toggle-btn"
        style = ""
        if 'd-lg-none' in original_btn:
            classes += " d-lg-none"
            if 'margin: 0' in original_btn:
                style = ' style="margin: 0;"'
        elif 'd-none' in original_btn and 'd-lg-block' in original_btn:
            classes += " d-none d-lg-block"
            
        new_btn = f'\n                            <button class="{classes}" aria-label="Toggle RTL"{style}>RTL</button>'
        
        return original_btn + new_btn

    updated_content, count = btn_pattern.subn(replacer, content)
    
    if count > 0:
        with open(f_name, 'w', encoding='utf-8') as f:
            f.write(updated_content)
        print(f"Updated {f_name} (added {count} RTL buttons)")
    else:
        print(f"No theme toggle button found in {f_name}")
