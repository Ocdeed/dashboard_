document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.sidebar .nav-link'); // Be more specific
    const pageTitleElement = document.querySelector('.page-title');
    const pageSubtitleElement = document.querySelector('.page-subtitle'); // New

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (!this.classList.contains('logout-link')) { // Don't prevent default for logout
                 e.preventDefault();
            }
           
            // Remove active class from all links in sidebar-nav
            document.querySelectorAll('.sidebar-nav .nav-link').forEach(l => l.classList.remove('active'));
             // Also handle settings and logout if they are styled similarly as active
            document.querySelectorAll('.sidebar-footer .nav-link').forEach(l => l.classList.remove('active'));


            this.classList.add('active');

            const pageTitle = this.dataset.pageTitle;
            if (pageTitleElement && pageTitle) {
                pageTitleElement.textContent = pageTitle;
            }
            // Example: Update subtitle dynamically or clear it
            if (pageSubtitleElement) {
                if (pageTitle === "Overview Dashboard") {
                     pageSubtitleElement.textContent = "Welcome back, Alex! Here's what's happening.";
                } else if (pageTitle) {
                    pageSubtitleElement.textContent = `Detailed view of ${pageTitle.toLowerCase()}.`;
                } else {
                    pageSubtitleElement.textContent = ""; // Clear if no specific subtitle
                }
            }

            // Close sidebar on mobile
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
            e.stopPropagation();
            const isExpanded = userDropdown.classList.toggle('show');
            this.setAttribute('aria-expanded', isExpanded);
            // Close other dropdowns
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
            if (userDropdown && userDropdown.classList.contains('show')) {
                userDropdown.classList.remove('show');
                if(userProfileButton) userProfileButton.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Close dropdowns if clicked outside
    document.addEventListener('click', function(e) {
        if (userDropdown && userDropdown.classList.contains('show') && !userDropdown.contains(e.target) && !userProfileButton.contains(e.target)) {
            userDropdown.classList.remove('show');
            if(userProfileButton) userProfileButton.setAttribute('aria-expanded', 'false');
        }
        if (notificationDropdown && notificationDropdown.classList.contains('show') && !notificationDropdown.contains(e.target) && !notificationBell.contains(e.target)) {
            notificationDropdown.classList.remove('show');
            notificationBell.setAttribute('aria-expanded', 'false');
        }
    });

    // --- Mobile Sidebar Toggle ---
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');

    if (mobileMenuToggle && sidebar) {
        mobileMenuToggle.addEventListener('click', function() {
            const isOpen = sidebar.classList.toggle('open');
            document.body.classList.toggle('sidebar-open', isOpen); // Use body class for overlay
            this.setAttribute('aria-expanded', isOpen);
        });
    }
    
    // Set current year in footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Chart.js Mockup Charts ---
    // Enhanced Chart.js settings for a more polished look
    const defaultChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: '#FFF',
                titleColor: '#2C323F',
                bodyColor: '#6C757D',
                borderColor: '#E2E8F0',
                borderWidth: 1,
                padding: 10,
                cornerRadius: 6,
                boxPadding: 3, // ChartJS 3.x uses boxPadding
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    borderColor: '#E2E8F0', // Lighter grid lines
                    color: 'rgba(226, 232, 240, 0.5)', // Even lighter for fill
                },
                ticks: {
                    color: '#6C757D', // Softer tick color
                    font: { size: 11 }
                }
            },
            x: {
                grid: {
                    display: false, // Often cleaner to remove x-axis grid
                },
                ticks: {
                    color: '#6C757D',
                    font: { size: 11 }
                }
            }
        }
    };

    // Sales Over Time (Line Chart)
    const salesChartCtx = document.getElementById('salesChart')?.getContext('2d');
    if (salesChartCtx) {
        const gradient = salesChartCtx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, 'rgba(108, 99, 255, 0.35)'); // --primary-accent
        gradient.addColorStop(1, 'rgba(108, 99, 255, 0.01)');

        new Chart(salesChartCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                datasets: [{
                    label: 'Sales',
                    data: [120, 190, 150, 210, 180, 220, 250, 230, 270, 200, 240, 280].map(v => v*100), // For example
                    borderColor: '#6C63FF', // --primary-accent
                    backgroundColor: gradient,
                    tension: 0.4, // Smoother curve
                    fill: true,
                    pointBackgroundColor: '#FFF',
                    pointBorderColor: '#6C63FF',
                    pointHoverBackgroundColor: '#6C63FF',
                    pointHoverBorderColor: '#FFF',
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    borderWidth: 2.5,
                }]
            },
            options: {
                ...defaultChartOptions,
                 scales: {
                    ...defaultChartOptions.scales,
                    y: {
                        ...defaultChartOptions.scales.y,
                        ticks: {
                            ...defaultChartOptions.scales.y.ticks,
                            callback: function(value) { return '$' + (value / 1000) + 'k'; }
                        }
                    }
                },
                plugins: {
                    ...defaultChartOptions.plugins,
                    tooltip: {
                        ...defaultChartOptions.plugins.tooltip,
                        callbacks: {
                            label: function(context) {
                                return ' Revenue: $' + context.parsed.y.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    } else {
        const salesChartContainer = document.getElementById('sales-chart-container');
        if(salesChartContainer) salesChartContainer.innerHTML = '<p style="text-align:center; color:var(--text-secondary); padding: 20px;">Sales chart will appear here.</p>';
    }

    // Traffic Sources (Doughnut Chart) - More visual for this type of data
    const trafficChartCtx = document.getElementById('trafficChart')?.getContext('2d');
    if (trafficChartCtx) {
        new Chart(trafficChartCtx, {
            type: 'doughnut',
            data: {
                labels: ['Organic Search', 'Referral', 'Direct', 'Social Media'],
                datasets: [{
                    label: 'Traffic Share',
                    data: [45, 25, 20, 10],
                    backgroundColor: [
                        '#6C63FF', // --primary-accent
                        '#4BD4B4', // --secondary-accent
                        '#FFC107', // --warning-color
                        '#17A2B8'  // --info-color
                    ],
                    borderColor: '#FFFFFF', // White borders for segments
                    borderWidth: 3,
                    hoverOffset: 8
                }]
            },
            options: {
                ...defaultChartOptions,
                cutout: '70%', // Makes it a doughnut
                plugins: {
                    ...defaultChartOptions.plugins,
                    legend: { // Custom legend handling if desired, or use card's header legend
                        display: true, // Or use the custom legend divs if you prefer
                        position: 'bottom',
                        labels: {
                            color: '#6C757D',
                            font: { size: 11 },
                            padding: 15,
                            boxWidth: 12,
                            usePointStyle: true,
                        }
                    }
                }
            }
        });
    } else {
        const trafficChartContainer = document.getElementById('traffic-chart-container');
        if(trafficChartContainer) trafficChartContainer.innerHTML = '<p style="text-align:center; color:var(--text-secondary); padding: 20px;">Traffic sources chart will appear here.</p>';
    }
});