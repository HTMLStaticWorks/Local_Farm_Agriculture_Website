import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

# We'll locate the collapse navbar-collapse div and replace it entirely for each page.
nav_pattern = re.compile(
    r'<div class="collapse navbar-collapse" id="mainNav">.*?</div>\s*</div>\s*</nav>', 
    re.DOTALL
)

def get_nav_html(page_name):
    # Determine active states based on filename
    home1_active = 'active' if page_name in ['index.html'] else ''
    home2_active = 'active' if page_name in ['index-2.html'] else ''
    home_parent_active = 'active' if (home1_active or home2_active) else ''
    
    about_active = 'active' if page_name == 'about.html' else ''
    services_active = 'active' if page_name == 'services.html' else ''
    blog_active = 'active' if page_name == 'blog.html' else ''
    shop_active = 'active' if page_name == 'shop.html' else ''
    contact_active = 'active' if page_name == 'contact.html' else ''

    nav = f"""<div class="collapse navbar-collapse" id="mainNav">
                    <ul class="navbar-nav mx-auto mb-2 mb-lg-0 align-items-center">
                        <li class="nav-item dropdown mx-2">
                            <a class="nav-link {home_parent_active} dropdown-toggle" href="#" id="homeDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Home</a>
                            <ul class="dropdown-menu shadow-sm border-0 rounded-4 mt-2" aria-labelledby="homeDropdown">
                                <li><a class="dropdown-item {home1_active} rounded-3 px-3 py-2 m-1" href="index.html">Home 1</a></li>
                                <li><a class="dropdown-item {home2_active} rounded-3 px-3 py-2 m-1" href="index-2.html">Home 2</a></li>
                            </ul>
                        </li>
                        <li class="nav-item mx-2"><a class="nav-link {about_active}" href="about.html">About</a></li>
                        <li class="nav-item mx-2"><a class="nav-link {services_active}" href="services.html">Services</a></li>
                        <li class="nav-item mx-2"><a class="nav-link {blog_active}" href="blog.html">Blog</a></li>
                        <li class="nav-item mx-2"><a class="nav-link {shop_active}" href="shop.html">Shop</a></li>
                        <li class="nav-item mx-2"><a class="nav-link {contact_active}" href="contact.html">Contact</a></li>
                    </ul>
                    <div class="d-flex align-items-center">
                        <button id="theme-toggle-btn" class="theme-toggle-btn" aria-label="Toggle Theme">
                            <i class="bi bi-sun-fill"></i>
                            <i class="bi bi-moon-stars-fill"></i>
                        </button>
                        <a href="dashboard.html" class="btn btn-primary rounded-pill px-4 ms-3 d-none d-lg-inline-flex align-items-center gap-2">Dashboard <i class="bi bi-grid-fill"></i></a>
                    </div>
                </div>
            </div>
        </nav>"""
    return nav

for file_name in html_files:
    if file_name == 'temp-agron-index-2.html':
        continue
    
    with open(file_name, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We find where `<div class="collapse navbar-collapse" id="mainNav">` starts and where the `</nav>` closes.
    new_nav = get_nav_html(file_name)
    
    # Replace it!
    updated_content, count = nav_pattern.subn(new_nav, content)
    
    if count > 0:
        with open(file_name, 'w', encoding='utf-8') as f:
            f.write(updated_content)
        print(f"Updated {file_name}")
    else:
        print(f"Pattern not found in {file_name}")
