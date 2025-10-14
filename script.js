// Simple tab switching function
function switchTab(tabButton) {
    // Get the parent tabs container
    const tabsContainer = tabButton.closest('.section');
    
    // Remove active class from all buttons in this section
    tabsContainer.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Remove active class from all tab contents in this section
    tabsContainer.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Add active class to clicked button
    tabButton.classList.add('active');
    
    // Find and activate the corresponding tab content
    const tabIndex = Array.from(tabButton.parentElement.children).indexOf(tabButton);
    const tabContents = tabsContainer.querySelectorAll('.tab-content');
    if (tabContents[tabIndex]) {
        tabContents[tabIndex].classList.add('active');
    }
}

// Add click event to all tab buttons
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => switchTab(button));
});