/**
 * DASHBOARD JS - CSA WEBSITE
 * Simulations for Admin and User dashboard states.
 */

document.addEventListener('DOMContentLoaded', () => {
    const dashboardType = document.body.dataset.dashboard || 'user';
    
    if (dashboardType === 'admin') {
        renderAdminDashboard();
    } else {
        renderUserDashboard();
    }
});

function renderUserDashboard() {
    const statsContainer = document.querySelector('#dashboard-stats');
    if (!statsContainer) return;

    const userStats = [
        { label: 'Active Subscriptions', value: '2', icon: 'bi-box-seam' },
        { label: 'Next Delivery', value: 'Oct 24, 2023', icon: 'bi-calendar-check' },
        { label: 'Total Saved', value: '$345', icon: 'bi-wallet2' }
    ];

    statsContainer.innerHTML = userStats.map(stat => `
        <div class="col-md-4 mb-4">
            <div class="card-premium d-flex align-items-center">
                <div class="icon-box me-3 bg-light p-3 rounded-circle">
                    <i class="bi ${stat.icon} fs-4 text-primary"></i>
                </div>
                <div>
                    <h6 class="mb-1 text-muted">${stat.label}</h6>
                    <h4 class="mb-0 fw-bold">${stat.value}</h4>
                </div>
            </div>
        </div>
    `).join('');
}

function renderAdminDashboard() {
    const statsContainer = document.querySelector('#dashboard-stats');
    if (!statsContainer) return;

    const adminStats = [
        { label: 'Total Members', value: '1,240', icon: 'bi-people' },
        { label: 'Monthly Revenue', value: '$45,200', icon: 'bi-currency-dollar' },
        { label: 'Pending Deliveries', value: '89', icon: 'bi-truck' }
    ];

    statsContainer.innerHTML = adminStats.map(stat => `
        <div class="col-md-4 mb-4">
            <div class="card-premium d-flex align-items-center">
                <div class="icon-box me-3 bg-light p-3 rounded-circle">
                    <i class="bi ${stat.icon} fs-4 text-secondary"></i>
                </div>
                <div>
                    <h6 class="mb-1 text-muted">${stat.label}</h6>
                    <h4 class="mb-0 fw-bold">${stat.value}</h4>
                </div>
            </div>
        </div>
    `).join('');

    // Auto-close sidebar on mobile/tablet when a link is clicked
    const sidebarLinks = document.querySelectorAll('.offcanvas .nav-link');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            const offcanvasElement = link.closest('.offcanvas');
            if (offcanvasElement) {
                const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);
                if (offcanvasInstance) {
                    offcanvasInstance.hide();
                }
            }
        });
    });
}
