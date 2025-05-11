document.addEventListener('DOMContentLoaded', () => {
    // --- Sidebar Navigation ---
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
    const pageTitleElement = document.querySelector('.page-title');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
            // Update page title
            const pageTitle = this.dataset.pageTitle;
            if (pageTitleElement && pageTitle) {
                pageTitleElement.textContent = pageTitle;
            }
            // Close sidebar on mobile if open after link click
            if (window.innerWidth < 992 && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
                document.body.classList.remove('sidebar-open');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // --- User Profile Dropdown ---
    const userProfileButton = document.querySelector('.user-profile-button');
    const userDropdown = document.getElementById('user-dropdown');

    if (userProfileButton && userDropdown) {
        userProfileButton.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent click from bubbling to document
            const isExpanded = userDropdown.classList.toggle('show');
            this.setAttribute('aria-expanded', isExpanded);
            // Close notification dropdown if open
            if (notificationDropdown && notificationDropdown.classList.contains('show')) {
                notificationDropdown.classList.remove('show');
                notificationBell.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // --- Notification Dropdown ---
    const notificationBell = document.querySelector('.notification-bell');
    const notificationDropdown = document.getElementById('notification-dropdown');

    if (notificationBell && notificationDropdown) {
        notificationBell.addEventListener('click', function(e) {
            e.stopPropagation();
            const isExpanded = notificationDropdown.classList.toggle('show');
            this.setAttribute('aria-expanded', isExpanded);
            // Close user dropdown if open
            if (userDropdown && userDropdown.classList.contains('show')) {
                userDropdown.classList.remove('show');
                userProfileButton.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Close dropdowns if clicked outside
    document.addEventListener('click', function(e) {
        if (userDropdown && userDropdown.classList.contains('show') && !userDropdown.contains(e.target) && !userProfileButton.contains(e.target)) {
            userDropdown.classList.remove('show');
            userProfileButton.setAttribute('aria-expanded', 'false');
        }
        if (notificationDropdown && notificationDropdown.classList.contains('show') && !notificationDropdown.contains(e.target) && !notificationBell.contains(e.target)) {
            notificationDropdown.classList.remove('show');
            notificationBell.setAttribute('aria-expanded', 'false');
        }
    });

    // --- Mobile Sidebar Toggle ---
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    if (mobileMenuToggle && sidebar) {
        mobileMenuToggle.addEventListener('click', function() {
            const isOpen = sidebar.classList.toggle('open');
            document.body.classList.toggle('sidebar-open', isOpen);
            this.setAttribute('aria-expanded', isOpen);
        });
    }
    
    // Set current year in footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Chart.js Mockup Charts ---
    // Sales Over Time (Line Chart)
    const salesChartCtx = document.getElementById('salesChart')?.getContext('2d');
    if (salesChartCtx) {
        new Chart(salesChartCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Sales ($)',
                    data: [12000, 19000, 15000, 21000, 18000, 22000, 25000, 23000, 27000, 20000, 24000, 28000],
                    borderColor: 'rgb(74, 144, 226)', // var(--primary-color)
                    backgroundColor: 'rgba(74, 144, 226, 0.1)',
                    tension: 0.3,
                    fill: true,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) { return '$' + value / 1000 + 'k'; }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false // Or true if you want to show it
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': $' + context.parsed.y.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    } else {
        const salesChartContainer = document.getElementById('sales-chart-container');
        if (salesChartContainer) salesChartContainer.innerHTML = '<p style="text-align:center; color:var(--text-secondary);">Sales chart could not be loaded.</p>';
    }

    // Traffic Sources (Bar Chart)
    const trafficChartCtx = document.getElementById('trafficChart')?.getContext('2d');
    if (trafficChartCtx) {
        new Chart(trafficChartCtx, {
            type: 'bar', // Could also be 'pie' or 'doughnut'
            data: {
                labels: ['Organic', 'Referral', 'Direct', 'Social'],
                datasets: [{
                    label: 'Visitors',
                    data: [1850, 980, 1450, 620],
                    backgroundColor: [
                        'rgba(74, 144, 226, 0.7)',  // Primary
                        'rgba(46, 204, 113, 0.7)',  // Success
                        'rgba(243, 156, 18, 0.7)', // Warning
                        'rgba(80, 227, 194, 0.7)'   // Accent
                    ],
                    borderColor: [
                        'rgb(74, 144, 226)',
                        'rgb(46, 204, 113)',
                        'rgb(243, 156, 18)',
                        'rgb(80, 227, 194)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y', // For horizontal bar chart; remove for vertical
                scales: {
                    x: { // Note: if indexAxis is 'y', this becomes the value axis
                        beginAtZero: true
                    }
                },
                plugins: {
                   legend: {
                        display: false 
                    },
                     title: {
                        display: false, // Title is already in card header
                        text: 'Traffic Sources'
                    }
                }
            }
        });
    } else {
        const trafficChartContainer = document.getElementById('traffic-chart-container');
        if (trafficChartContainer) trafficChartContainer.innerHTML = '<p style="text-align:center; color:var(--text-secondary);">Traffic chart could not be loaded.</p>';
    }
});